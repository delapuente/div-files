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

  test('Reads the graphic data of an image as ImageData', async () => {
    const map = await fpgFile.map(1);
    const imgData = await map.asImageData();
    const expected = await imageDataFrom('/base/assets/bg.png');
    assertEqualImageData(imgData, expected);
  });
  
  test('Returns different copies of the image data', async () => {
    const map = await fpgFile.map(1);
    const imgDataA = await map.asImageData();
    const imgDataB = await map.asImageData();
    assert.notEqual(imgDataA, imgDataB);
  });

  test('Reads the graphic data of an image as a data URL', async () => {
    const map = await fpgFile.map(1);
    const dataUrl = await map.asDataUrl();
    const expected = await dataUrlFrom('/base/assets/bg.png');
    assert.equal(dataUrl, expected);
  });

  test('Reads the graphic data of an image as a canvas', async () => {
    const map = await fpgFile.map(1);
    const canvas = await map.asCanvas();
    const [expected] = await canvasFrom('/base/assets/bg.png');
    const { width, height } = canvas;
    assert.equal(width, expected.width);
    assert.equal(height, expected.height);
    assertEqualImageData(
      canvas.getContext('2d').getImageData(0, 0, width, height),
      expected.getContext('2d').getImageData(0, 0, width, height)
    );
  });

  function canvasFrom(url): Promise<[HTMLCanvasElement, CanvasRenderingContext2D]> {
    return new Promise(resolve => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = document.createElement('img');
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        resolve([canvas, ctx]);
      };
      img.src = url;
    });
  }

  function imageDataFrom(url): Promise<ImageData> {
    return canvasFrom(url)
    .then(
      ([canvas, ctx]) => ctx.getImageData(0, 0, canvas.width, canvas.height)
    );
  }

  function dataUrlFrom(url): Promise<string> {
    return canvasFrom(url)
    .then(([canvas]) => canvas.toDataURL());
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