
class FPGFile {

  _buffer: ArrayBuffer

  _length: Number

  constructor(buffer: ArrayBuffer) {
    this._buffer = new Int8Array(buffer);
    this._assertFpg();
  }

  _assertFpg(): void {
    ['f', 'p', 'g', 0x1A, 0x0D, 0x0A, 0x00].forEach((code, index) => {
      const char = typeof code === 'string' ? code.charCodeAt(0) : code;
      if (this._buffer[index] !== char) {
        throw new Error('The file is not a FPG file');
      }
    });
  }

  get length() {
    return this._length;
  }

};

export default {
  read(buffer: ArrayBuffer): Promise<FPGFile> {
    return Promise.resolve(new FPGFile(buffer));
  }
};