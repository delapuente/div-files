import * as pal from '../../src/pal';
import { assert } from 'chai';
import { PALFile } from '../../src/pal';
import { AssertionError } from 'assert';

suite("PAL file reader", function () {
  let palFile : PALFile;
  const nonPAL = new Uint8Array(1024).buffer;

  setup(async () => {
    const response = await fetch('/base/assets/TUTOR0.PAL');
    const buffer = await response.arrayBuffer();
    palFile = await pal.read(buffer);
  });

  test('Rejects non PAL files', () => {
    return pal.read(nonPAL)
    .then(
      () => Promise.reject('Should throw'),
      () => Promise.resolve()
     );
  });

  test('Gets version', () => {
    assert.equal(palFile.version, 0);
  });

  test('Reads the length asynchronously', async () => {
    assert.equal(palFile.length, 256);
  });

  test('Fails if reading a negative index color', async () => {
    assert.throws(() => palFile.color(-10));
  });

  test('Fails if trying to read a color beyond 255', async () => {
    assert.throws(() => palFile.color(256));
  });

  test('Reads the color information as RGBA vectors', async () => {
    [
      [0, 0, 0], [4, 0, 0]
    ].forEach((expectedColor, index) => {
      const [r, g, b] = expectedColor;
      const color = palFile.color(index);
      assert.equal(color[0], r);
      assert.equal(color[1], g);
      assert.equal(color[2], b);
      assert.equal(color[3], 255);
    });
  });

});