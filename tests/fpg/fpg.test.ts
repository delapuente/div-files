import fpg from '../../src/fpg';
import { assert } from 'chai';

suite("FPG file reader", function () {
  let fileBuffer : ArrayBuffer;
  
  const nonFPG = new Uint8Array(1024).buffer;

  suiteSetup(() => {
    return fetch('/base/assets/TUTOR0.FPG')
    .then(response => response.arrayBuffer())
    .then(buffer => fileBuffer = buffer);
  });

  test('Reads a FPG file', () => {
    return fpg.read(fileBuffer);
  });

  test('Rejects non FPG files', () => {
    return fpg.read(nonFPG)
    .then(
      () => Promise.reject('Should throw'),
      () => Promise.resolve()
     );
  });

  test('Gets version', () => {
    return fpg.read(fileBuffer)
    .then(file => assert.equal(file.version, 0));
  });

  test('Reads the length asynchronously', () => {
    return fpg.read(fileBuffer)
    .then(file => file.length)
    .then(length => assert.equal(length, 10));
  });

  test('Fails if reading a negative map', () => {
    return fpg.read(fileBuffer)
    .then(file => file.map(-10))
    .then(
      () => Promise.reject('Should throw'),
      () => Promise.resolve()
    );
  });

  test('Fails if trying to read an unavailable map', () => {
    return fpg.read(fileBuffer)
    .then(file => file.map(10))
    .then(
      () => Promise.reject('Should throw'),
      () => Promise.resolve()
    );
  });

  test('Reads the meta data of a map asynchronously', () => {
    return fpg.read(fileBuffer)
    .then(file => file.map(1))
    .then(map => {
      assert.equal(map.code, 2);
      assert.equal(map.name, 'Mapa 4');
      assert.equal(map.desc, 'Fondo');
      assert.equal(map.width, 320);
      assert.equal(map.height, 200);
    });
  });
});