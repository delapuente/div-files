
const VERSION_OFFSET = 7;

const MAPS_OFFSET = 1352;

type PromiseResolve = (value?: {} | Thenable<{}>) => void;

type PromiseReject = (error?: any) => void;

class FPGFile {

  ready: Promise<void>;

  version: number;

  private _bytes: Uint8Array;

  private _length: number;

  private _version: number;

  private _maps: Array<any>;

  private _mapRequests: Array<Array<[PromiseResolve, PromiseReject]>>;

  constructor(bytes: Uint8Array) {
    this._bytes = bytes;
    this._length = 0;
    this._maps = [];
    this._mapRequests = [];
    this.version = this._bytes[VERSION_OFFSET];
    this.ready = this._readMeta();
  }

  map(index) {
    if (index < 0) {
      return Promise.reject('Map indices start in 0');
    }
    if (this._length > index) {
      return Promise.resolve(this._maps[index]);
    }
    return new Promise((resolve, reject) => {
      this._mapRequests[index] = this._mapRequests[index] || [];
      this._mapRequests[index].push([resolve, reject]);
    });
  }

  get length() {
    return this.ready.then(() => this._length);
  }

  _readMeta(): Promise<void> {
    const file = this; 
    return new Promise((resolve, reject) => {
      setTimeout(() => readMap(MAPS_OFFSET));

      function readMap(offset) {
        if (offset >= file._bytes.byteLength) {
          file._confirmAllMaps();
          resolve();
          return;
        }

        const entry: any = {
          code: file._getDouble(offset),
          length: file._getDouble(offset + 4),
          desc: file._getAsciiText(offset + 8, 32),
          name: file._getAsciiText(offset + 40, 12),
          width: file._getDouble(offset + 52),
          height: file._getDouble(offset + 56),
          pointCount: file._getDouble(offset + 60),
          pointsOffset: offset + 64
        };

        entry.dataOffset = offset + 64 + (4 * entry.pointCount);
        entry.size = entry.dataOffset + (entry.width * entry.height) - offset;
        file._maps.push(entry);
        file._confirmMap(file._length);
        file._length++;

        setTimeout(() => readMap(offset + entry.size));
      }
    });
  }

  _getDouble(offset): number {
    return this._bytes[offset] |
           this._bytes[offset + 1] << 8 |
           this._bytes[offset + 2] << 16 |
           this._bytes[offset + 3] << 24;
  }

  _getAsciiText(offset, max): string {
    const chars = [];
    for (let i = offset; max > 0 && this._bytes[i] !== 0; i++, max--) {
      chars.push(String.fromCharCode(this._bytes[i]));
    }
    return chars.join('');
  }

  _confirmMap(index) {
    if (Array.isArray(this._mapRequests[index])) {
      this._mapRequests[index].forEach(([resolve]) => resolve(this._maps[index]));
    }
  }

  _confirmAllMaps() {
    for (let index = this._length; index < this._mapRequests.length; index++) {
      this._mapRequests[index]
      .forEach(([_, reject]) => reject(`There is no map with index ${index}`)); 
    }
  }

};

export default {
  read(buffer: ArrayBuffer): Promise<FPGFile> {
    return this._assertFpg(buffer)
    .then(bytes => new FPGFile(bytes));
  },

  _assertFpg(buffer: Uint8Array): Promise<Uint8Array> {
    const bytes = new Uint8Array(buffer);
    return new Promise((resolve, reject) => {
      ['f', 'p', 'g', 0x1A, 0x0D, 0x0A, 0x00].forEach((code, index) => {
        const char = typeof code === 'string' ? code.charCodeAt(0) : code;
        if (bytes[index] !== char) {
          reject('The file is not a FPG file');
        }
      });
      resolve(bytes);
    });
  }
};