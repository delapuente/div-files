# div-files

> Utilities to read and manipulate DIV files.

DIV Game Studio came with a variety of file formats for sources, graphics,
sound, palettes and collections of sprites. This software reads those files and
provide useful alternative representations for Web purposes.

This software is a supportng library for the
[DIV2js](https://github.com/delapuente/div2js) project. It is not finished and
new functionallity is expected to be added to help developing the DIV2js
roadmap.

## API

Import the script with:

```html
<script src="https://rawgit.com/delapuente/div-files/master/dist/div-files.js"></script>
```

You'll find a new `div` global with `fpg` and `pal` entries for reading
collections of graphics and palettes respectively.

[Try it now](https://delapuente.github.io/div-files)!

### fpg

`read(buffer)` reads an `ArrayBuffer` into a `FPGFile` object. How to obtain
this buffer is left to the developer.

```js
const response = await fetch('/test.fpg');
const buffer = await response.arrayBuffer();
const fpgFile = await fpg.read(buffer);
```

`FPGFile#length` returns a promise which resolves into the number of maps in the
collection.

`FPGFile#ready` is a promise which resolves when all the maps have been
identified inside the collection.

`FPGFile#version` is `0`, even in DIV2.

`FPGFile#pal` contains a [`PALFile`](#pal) instance with the palette common to
the whole collection.

`FPGFile#map(index)` resolves into the collection map at `index` or rejects if
the map is unavailable. The result object has the following properties and
methods:

- `code`: code number.
- `name`: name of the sprite.
- `desc`: description of the sprite.
- `width`: width of the sprite.
- `height`: height of the sprite.

- `asImageData()`: resolves into an `ImageData` instance with the RGBA pixel
information of the map.
- `asCanvas()`: resolves into a canvas element with a representation of the
sprite.
- `asDataUrl()`: resolves into a data URL of the PNG representation of the
sprite.

### pal

`read(buffer)` reads an `ArrayBuffer` into a `PALFile` object. How to obtain
this buffer is left to the developer.

`PALFile#length` is always `256`.

`PALFile#color(index)` returns a 4-length `Uint8ClampedArray` with the RGBA
information of the color at `index`. The alpha component is always 255. 