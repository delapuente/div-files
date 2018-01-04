import * as fpg from '../../src/fpg';
import { assert } from 'chai';
import { FPGFile } from '../../src/fpg';
import { AssertionError } from 'assert';

suite("FPG file reader", function () {
  let fpgFile : FPGFile;
  const nonFPG = new Uint8Array(1024).buffer;

  setup(async () => {
    const response = await fetch('/base/assets/TUTOR0.FPG');
    const buffer = await response.arrayBuffer();
    fpgFile = await fpg.read(buffer);
  });

  test('Rejects non FPG files', () => {
    return fpg.read(nonFPG)
    .then(
      () => Promise.reject('Should throw'),
      () => Promise.resolve()
     );
  });

  test('Gets version', () => {
    assert.equal(fpgFile.version, 0);
  });

  test('Reads the length asynchronously', async () => {
    const length = await fpgFile.length;
    assert.equal(length, 10);
  });

  test('Fails if reading a negative map', async () => {
    try {
      await fpgFile.map(-10);
      throw new Error('Should throw...');
    }
    catch (error) {}
  });

  test('Fails if trying to read an unavailable map', async () => {
    try {
      await fpgFile.map(10);
      throw new Error('Should throw...');
    }
    catch (error) {} 
  });

  test('Fails if trying to read an unavailable map after ready', async () => {
    try {
      await fpgFile.ready;
      await fpgFile.map(10);
      throw new Error('Should throw...');
    }
    catch (error) {} 
  });

  test('Reads the meta data of a map asynchronously', async () => {
    const map = await fpgFile.map(1);
    assert.equal(map.code, 2);
    assert.equal(map.name, 'Mapa 4');
    assert.equal(map.desc, 'Fondo');
    assert.equal(map.width, 320);
    assert.equal(map.height, 200);
  });

  test('Reads the graphic data of an image asynchronously', async () => {
    const map = await fpgFile.map(1);
    const imgData = await map.data;
    const expected = await imageDataFrom('/base/assets/bg.png');
    assertEqualImageData(imgData, expected);
  });

  function imageDataFrom(url): Promise<ImageData> {
    return new Promise(resolve => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = document.createElement('img');
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0 );
        resolve(ctx.getImageData(0, 0, img.width, img.height));
      };
      img.src = url;
    });
  }

  function download(data) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    createImageBitmap(data)
    .then(bitmap => {
      canvas.width = bitmap.width;
      canvas.height = bitmap.height;
      ctx.drawImage(bitmap, 0, 0);
      const a = document.createElement('a');
      a.href = canvas.toDataURL();
      a.download = 'bg2.png';
      a.click();
    });
  }

  function assertEqualImageData(target, expected) {
    if (target.width !== expected.width || target.height !== expected.height) {
      throw new AssertionError({
        message: 'The images have different dimensions',
        actual: `${target.width}x${target.height}`,
        expected: `${expected.width}x${expected.height}`
      });
    }
    for (let i = 0, l = target.width * target.height; i < l; i++) {
      assert.equal(
        target.data[i],
        expected.data[i],
        `There is a difference at index ${i}`
      );
    }
  }
});