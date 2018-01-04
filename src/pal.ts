
const VERSION_OFFSET = 7;

const PAL_OFFSET = 8;

const GAMMA_OFFSET = 776;

export class PALFile {

  version: number;

  private _bytes: Uint8Array;

  private _version: number;

  private _colors: Array<Uint8ClampedArray>;

  constructor(bytes: Uint8Array) {
    this._bytes = bytes;
    this._colors = new Array(256);
    this.version = this._bytes[VERSION_OFFSET];
  }

  color(index) {
    this._checkIndex(index);
    this._toRGBA(index);
    return this._colors[index];   
  }

  _checkIndex(index) {
    if (index < 0 || index > 255) {
      throw new Error('Color index must be in the [0, 255] range.');
    }
  }

  _toRGBA(index) {
    if (!this._colors[index]) {
      this._colors[index] = new Uint8ClampedArray(4);
      this._colors[index][0] = 4 * this._bytes[PAL_OFFSET + (index * 3)];
      this._colors[index][1] = 4 * this._bytes[PAL_OFFSET + (index * 3) + 1];
      this._colors[index][2] = 4 * this._bytes[PAL_OFFSET + (index * 3) + 2];
      this._colors[index][3] = 255;
    }    
  }

  get length() {
    return 256;
  }

};

export function read(buffer: ArrayBuffer): Promise<PALFile> {
  return _assertPal(buffer)
  .then(bytes => new PALFile(bytes));
};

function _assertPal(buffer: ArrayBuffer): Promise<Uint8Array> {
  const bytes = new Uint8Array(buffer);
  return new Promise((resolve, reject) => {
    ['p', 'a', 'l', 0x1A, 0x0D, 0x0A, 0x00].forEach((code, index) => {
      const char = typeof code === 'string' ? code.charCodeAt(0) : code;
      if (bytes[index] !== char) {
        reject('The file is not a PAL file');
      }
    });
    resolve(bytes);
  });
}
