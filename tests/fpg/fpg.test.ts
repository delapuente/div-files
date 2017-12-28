import fpg from '../../src/fpg';
import { assert } from 'chai';

suite("FPG file reader", function () {
  let fileBuffer : ArrayBuffer;

  setup(() => {
    return fetch('/base/assets/TUTOR0.FPG')
    .then(response => response.arrayBuffer())
    .then(buffer => fileBuffer = buffer);
  });

  test("Read a FPG file", () => {
    return fpg.read(fileBuffer);
  });
});