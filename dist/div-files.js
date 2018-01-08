/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "dist";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("Object.defineProperty(__webpack_exports__, \"__esModule\", { value: true });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"PALFile\", function() { return PALFile; });\n/* harmony export (immutable) */ __webpack_exports__[\"read\"] = read;\nvar VERSION_OFFSET = 7;\nvar PAL_OFFSET = 8;\nvar GAMMA_OFFSET = 776;\nvar PALFile = /** @class */ (function () {\n    function PALFile(bytes) {\n        this._bytes = bytes;\n        this._colors = new Array(256);\n        this.version = this._bytes[VERSION_OFFSET];\n    }\n    PALFile.prototype.color = function (index) {\n        this._checkIndex(index);\n        this._toRGBA(index);\n        return this._colors[index];\n    };\n    PALFile.prototype._checkIndex = function (index) {\n        if (index < 0 || index > 255) {\n            throw new Error('Color index must be in the [0, 255] range.');\n        }\n    };\n    PALFile.prototype._toRGBA = function (index) {\n        if (!this._colors[index]) {\n            this._colors[index] = new Uint8ClampedArray(4);\n            this._colors[index][0] = 4 * this._bytes[PAL_OFFSET + (index * 3)];\n            this._colors[index][1] = 4 * this._bytes[PAL_OFFSET + (index * 3) + 1];\n            this._colors[index][2] = 4 * this._bytes[PAL_OFFSET + (index * 3) + 2];\n            this._colors[index][3] = 255;\n        }\n    };\n    Object.defineProperty(PALFile.prototype, \"length\", {\n        get: function () {\n            return 256;\n        },\n        enumerable: true,\n        configurable: true\n    });\n    return PALFile;\n}());\n\n;\nfunction read(buffer) {\n    return _assertPal(buffer)\n        .then(function (bytes) { return new PALFile(bytes); });\n}\n;\nfunction _assertPal(buffer) {\n    var bytes = new Uint8Array(buffer);\n    return new Promise(function (resolve, reject) {\n        ['p', 'a', 'l', 0x1A, 0x0D, 0x0A, 0x00].forEach(function (code, index) {\n            var char = typeof code === 'string' ? code.charCodeAt(0) : code;\n            if (bytes[index] !== char) {\n                reject('The file is not a PAL file');\n            }\n        });\n        resolve(bytes);\n    });\n}\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvcGFsLnRzP2I2MmQiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQTtBQUFBLElBQU0sY0FBYyxHQUFHLENBQUMsQ0FBQztBQUV6QixJQUFNLFVBQVUsR0FBRyxDQUFDLENBQUM7QUFFckIsSUFBTSxZQUFZLEdBQUcsR0FBRyxDQUFDO0FBRXpCO0lBVUUsaUJBQVksS0FBaUI7UUFDM0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDcEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM5QixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVELHVCQUFLLEdBQUwsVUFBTSxLQUFLO1FBQ1QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN4QixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3BCLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFFRCw2QkFBVyxHQUFYLFVBQVksS0FBSztRQUNmLEVBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLElBQUksS0FBSyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDN0IsTUFBTSxJQUFJLEtBQUssQ0FBQyw0Q0FBNEMsQ0FBQyxDQUFDO1FBQ2hFLENBQUM7SUFDSCxDQUFDO0lBRUQseUJBQU8sR0FBUCxVQUFRLEtBQUs7UUFDWCxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pCLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMvQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsR0FBRyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25FLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxHQUFHLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ3ZFLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxHQUFHLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ3ZFLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQy9CLENBQUM7SUFDSCxDQUFDO0lBRUQsc0JBQUksMkJBQU07YUFBVjtZQUNFLE1BQU0sQ0FBQyxHQUFHLENBQUM7UUFDYixDQUFDOzs7T0FBQTtJQUVILGNBQUM7QUFBRCxDQUFDOztBQUFBLENBQUM7QUFFSSxjQUFlLE1BQW1CO0lBQ3RDLE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDO1NBQ3hCLElBQUksQ0FBQyxlQUFLLElBQUksV0FBSSxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQWxCLENBQWtCLENBQUMsQ0FBQztBQUNyQyxDQUFDO0FBQUEsQ0FBQztBQUVGLG9CQUFvQixNQUFtQjtJQUNyQyxJQUFNLEtBQUssR0FBRyxJQUFJLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNyQyxNQUFNLENBQUMsSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUUsTUFBTTtRQUNqQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFDLElBQUksRUFBRSxLQUFLO1lBQzFELElBQU0sSUFBSSxHQUFHLE9BQU8sSUFBSSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ2xFLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUMxQixNQUFNLENBQUMsNEJBQTRCLENBQUMsQ0FBQztZQUN2QyxDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDSCxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDakIsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDIiwiZmlsZSI6IjAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmNvbnN0IFZFUlNJT05fT0ZGU0VUID0gNztcblxuY29uc3QgUEFMX09GRlNFVCA9IDg7XG5cbmNvbnN0IEdBTU1BX09GRlNFVCA9IDc3NjtcblxuZXhwb3J0IGNsYXNzIFBBTEZpbGUge1xuXG4gIHZlcnNpb246IG51bWJlcjtcblxuICBwcml2YXRlIF9ieXRlczogVWludDhBcnJheTtcblxuICBwcml2YXRlIF92ZXJzaW9uOiBudW1iZXI7XG5cbiAgcHJpdmF0ZSBfY29sb3JzOiBBcnJheTxVaW50OENsYW1wZWRBcnJheT47XG5cbiAgY29uc3RydWN0b3IoYnl0ZXM6IFVpbnQ4QXJyYXkpIHtcbiAgICB0aGlzLl9ieXRlcyA9IGJ5dGVzO1xuICAgIHRoaXMuX2NvbG9ycyA9IG5ldyBBcnJheSgyNTYpO1xuICAgIHRoaXMudmVyc2lvbiA9IHRoaXMuX2J5dGVzW1ZFUlNJT05fT0ZGU0VUXTtcbiAgfVxuXG4gIGNvbG9yKGluZGV4KSB7XG4gICAgdGhpcy5fY2hlY2tJbmRleChpbmRleCk7XG4gICAgdGhpcy5fdG9SR0JBKGluZGV4KTtcbiAgICByZXR1cm4gdGhpcy5fY29sb3JzW2luZGV4XTsgICBcbiAgfVxuXG4gIF9jaGVja0luZGV4KGluZGV4KSB7XG4gICAgaWYgKGluZGV4IDwgMCB8fCBpbmRleCA+IDI1NSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdDb2xvciBpbmRleCBtdXN0IGJlIGluIHRoZSBbMCwgMjU1XSByYW5nZS4nKTtcbiAgICB9XG4gIH1cblxuICBfdG9SR0JBKGluZGV4KSB7XG4gICAgaWYgKCF0aGlzLl9jb2xvcnNbaW5kZXhdKSB7XG4gICAgICB0aGlzLl9jb2xvcnNbaW5kZXhdID0gbmV3IFVpbnQ4Q2xhbXBlZEFycmF5KDQpO1xuICAgICAgdGhpcy5fY29sb3JzW2luZGV4XVswXSA9IDQgKiB0aGlzLl9ieXRlc1tQQUxfT0ZGU0VUICsgKGluZGV4ICogMyldO1xuICAgICAgdGhpcy5fY29sb3JzW2luZGV4XVsxXSA9IDQgKiB0aGlzLl9ieXRlc1tQQUxfT0ZGU0VUICsgKGluZGV4ICogMykgKyAxXTtcbiAgICAgIHRoaXMuX2NvbG9yc1tpbmRleF1bMl0gPSA0ICogdGhpcy5fYnl0ZXNbUEFMX09GRlNFVCArIChpbmRleCAqIDMpICsgMl07XG4gICAgICB0aGlzLl9jb2xvcnNbaW5kZXhdWzNdID0gMjU1O1xuICAgIH0gICAgXG4gIH1cblxuICBnZXQgbGVuZ3RoKCkge1xuICAgIHJldHVybiAyNTY7XG4gIH1cblxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHJlYWQoYnVmZmVyOiBBcnJheUJ1ZmZlcik6IFByb21pc2U8UEFMRmlsZT4ge1xuICByZXR1cm4gX2Fzc2VydFBhbChidWZmZXIpXG4gIC50aGVuKGJ5dGVzID0+IG5ldyBQQUxGaWxlKGJ5dGVzKSk7XG59O1xuXG5mdW5jdGlvbiBfYXNzZXJ0UGFsKGJ1ZmZlcjogQXJyYXlCdWZmZXIpOiBQcm9taXNlPFVpbnQ4QXJyYXk+IHtcbiAgY29uc3QgYnl0ZXMgPSBuZXcgVWludDhBcnJheShidWZmZXIpO1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIFsncCcsICdhJywgJ2wnLCAweDFBLCAweDBELCAweDBBLCAweDAwXS5mb3JFYWNoKChjb2RlLCBpbmRleCkgPT4ge1xuICAgICAgY29uc3QgY2hhciA9IHR5cGVvZiBjb2RlID09PSAnc3RyaW5nJyA/IGNvZGUuY2hhckNvZGVBdCgwKSA6IGNvZGU7XG4gICAgICBpZiAoYnl0ZXNbaW5kZXhdICE9PSBjaGFyKSB7XG4gICAgICAgIHJlamVjdCgnVGhlIGZpbGUgaXMgbm90IGEgUEFMIGZpbGUnKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXNvbHZlKGJ5dGVzKTtcbiAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcGFsLnRzIl0sInNvdXJjZVJvb3QiOiIifQ==");

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("Object.defineProperty(__webpack_exports__, \"__esModule\", { value: true });\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__fpg__ = __webpack_require__(2);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pal__ = __webpack_require__(0);\n/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, \"fpg\", function() { return __WEBPACK_IMPORTED_MODULE_0__fpg__; });\n/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, \"pal\", function() { return __WEBPACK_IMPORTED_MODULE_1__pal__; });\n\n\n\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHM/ZWFjMyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUM2QjtBQUNBO0FBRVQiLCJmaWxlIjoiMS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0ICogYXMgZnBnIGZyb20gJy4vZnBnJztcbmltcG9ydCAqIGFzIHBhbCBmcm9tICcuL3BhbCc7XG5cbmV4cG9ydCB7IGZwZywgcGFsIH07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2luZGV4LnRzIl0sInNvdXJjZVJvb3QiOiIifQ==");

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("Object.defineProperty(__webpack_exports__, \"__esModule\", { value: true });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"FPGFile\", function() { return FPGFile; });\n/* harmony export (immutable) */ __webpack_exports__[\"read\"] = read;\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pal__ = __webpack_require__(0);\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (this && this.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (_) try {\n            if (f = 1, y && (t = y[op[0] & 2 ? \"return\" : op[0] ? \"throw\" : \"next\"]) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [0, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\n\nvar VERSION_OFFSET = 7;\nvar PAL_OFFSET = 8;\nvar MAPS_OFFSET = 1352;\nvar FPGFile = /** @class */ (function () {\n    function FPGFile(bytes) {\n        this._bytes = bytes;\n        this._length = 0;\n        this._maps = [];\n        this._mapRequests = [];\n        this.pal = new __WEBPACK_IMPORTED_MODULE_0__pal__[\"PALFile\"](new Uint8Array(this._bytes, PAL_OFFSET));\n        this.version = this._bytes[VERSION_OFFSET];\n        this.ready = this._readMeta();\n    }\n    FPGFile.prototype.map = function (index) {\n        var _this = this;\n        if (index < 0) {\n            return Promise.reject('Map indices start in 0');\n        }\n        if (this._isReady && index >= this._length) {\n            return Promise.reject(\"There is no map with index \" + index);\n        }\n        if (this._length > index) {\n            return Promise.resolve(this._maps[index]);\n        }\n        return new Promise(function (resolve, reject) {\n            _this._mapRequests[index] = _this._mapRequests[index] || [];\n            _this._mapRequests[index].push([resolve, reject]);\n        });\n    };\n    Object.defineProperty(FPGFile.prototype, \"length\", {\n        get: function () {\n            var _this = this;\n            return this.ready.then(function () { return _this._length; });\n        },\n        enumerable: true,\n        configurable: true\n    });\n    FPGFile.prototype._readMeta = function () {\n        var file = this;\n        return new Promise(function (resolve, reject) {\n            setTimeout(function () { return readMap(MAPS_OFFSET); });\n            function readMap(offset) {\n                if (offset >= file._bytes.byteLength) {\n                    file._confirmAllMaps();\n                    file._isReady = true;\n                    resolve();\n                    return;\n                }\n                var entry = {\n                    code: file._getDouble(offset),\n                    length: file._getDouble(offset + 4),\n                    desc: file._getAsciiText(offset + 8, 32),\n                    name: file._getAsciiText(offset + 40, 12),\n                    width: file._getDouble(offset + 52),\n                    height: file._getDouble(offset + 56),\n                    pointCount: file._getDouble(offset + 60),\n                    pointsOffset: offset + 64\n                };\n                Object.defineProperty(entry, 'asImageData', {\n                    value: function () {\n                        var size = this.width * this.height;\n                        var endOfData = this.dataOffset + size;\n                        var bitmap = new Uint8ClampedArray(4 * size);\n                        for (var i = this.dataOffset, j = 0; i < endOfData; i++, j += 4) {\n                            var colorIndex = file._bytes[i];\n                            var pixelIndex = j;\n                            bitmap.set(file.pal.color(colorIndex), pixelIndex);\n                        }\n                        return Promise.resolve(new ImageData(bitmap, this.width, this.height));\n                    }\n                });\n                Object.defineProperty(entry, 'asDataUrl', {\n                    value: function () {\n                        return __awaiter(this, void 0, void 0, function () {\n                            var canvas;\n                            return __generator(this, function (_a) {\n                                switch (_a.label) {\n                                    case 0: return [4 /*yield*/, this.asCanvas()];\n                                    case 1:\n                                        canvas = _a.sent();\n                                        return [2 /*return*/, Promise.resolve(canvas.toDataURL())];\n                                }\n                            });\n                        });\n                    }\n                });\n                Object.defineProperty(entry, 'asCanvas', {\n                    value: function () {\n                        return __awaiter(this, void 0, void 0, function () {\n                            var data, canvas, ctx;\n                            return __generator(this, function (_a) {\n                                switch (_a.label) {\n                                    case 0: return [4 /*yield*/, this.asImageData()];\n                                    case 1:\n                                        data = _a.sent();\n                                        canvas = document.createElement('canvas');\n                                        ctx = canvas.getContext('2d');\n                                        canvas.width = data.width;\n                                        canvas.height = data.height;\n                                        ctx.putImageData(data, 0, 0);\n                                        return [2 /*return*/, Promise.resolve(canvas)];\n                                }\n                            });\n                        });\n                    }\n                });\n                entry.dataOffset = offset + 64 + (4 * entry.pointCount);\n                entry.size = entry.dataOffset + (entry.width * entry.height) - offset;\n                file._maps.push(entry);\n                file._confirmMap(file._length);\n                file._length++;\n                setTimeout(function () { return readMap(offset + entry.size); });\n            }\n        });\n    };\n    FPGFile.prototype._getDouble = function (offset) {\n        return this._bytes[offset] |\n            this._bytes[offset + 1] << 8 |\n            this._bytes[offset + 2] << 16 |\n            this._bytes[offset + 3] << 24;\n    };\n    FPGFile.prototype._getAsciiText = function (offset, max) {\n        var chars = [];\n        for (var i = offset; max > 0 && this._bytes[i] !== 0; i++, max--) {\n            chars.push(String.fromCharCode(this._bytes[i]));\n        }\n        return chars.join('');\n    };\n    FPGFile.prototype._confirmMap = function (index) {\n        var _this = this;\n        if (Array.isArray(this._mapRequests[index])) {\n            this._mapRequests[index].forEach(function (_a) {\n                var resolve = _a[0];\n                return resolve(_this._maps[index]);\n            });\n        }\n    };\n    FPGFile.prototype._confirmAllMaps = function () {\n        var _loop_1 = function (index) {\n            this_1._mapRequests[index]\n                .forEach(function (_a) {\n                var _ = _a[0], reject = _a[1];\n                return reject(\"There is no map with index \" + index);\n            });\n        };\n        var this_1 = this;\n        for (var index = this._length; index < this._mapRequests.length; index++) {\n            _loop_1(index);\n        }\n    };\n    return FPGFile;\n}());\n\n;\nfunction read(buffer) {\n    return _assertFpg(buffer)\n        .then(function (bytes) { return new FPGFile(bytes); });\n}\n;\nfunction _assertFpg(buffer) {\n    var bytes = new Uint8Array(buffer);\n    return new Promise(function (resolve, reject) {\n        ['f', 'p', 'g', 0x1A, 0x0D, 0x0A, 0x00].forEach(function (code, index) {\n            var char = typeof code === 'string' ? code.charCodeAt(0) : code;\n            if (bytes[index] !== char) {\n                reject('The file is not a FPG file');\n            }\n        });\n        resolve(bytes);\n    });\n}\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvZnBnLnRzPzdhYzkiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ2dDO0FBRWhDLElBQU0sY0FBYyxHQUFHLENBQUMsQ0FBQztBQUV6QixJQUFNLFVBQVUsR0FBRyxDQUFDLENBQUM7QUFFckIsSUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDO0FBTXpCO0lBb0JFLGlCQUFZLEtBQWlCO1FBQzNCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO1FBQ2pCLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSw2Q0FBTyxDQUFDLElBQUksVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQztRQUNoRSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDaEMsQ0FBQztJQUVELHFCQUFHLEdBQUgsVUFBSSxLQUFLO1FBQVQsaUJBY0M7UUFiQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNkLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLHdCQUF3QixDQUFDLENBQUM7UUFDbEQsQ0FBQztRQUNELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksS0FBSyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQzNDLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLGdDQUE4QixLQUFPLENBQUMsQ0FBQztRQUMvRCxD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LFVBQVUsQ0FBQyxNQUFNLENBQUM7U0FDeEIsSUFBSSxDQUFDLGVBQUssSUFBSSxXQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBbEIsQ0FBa0IsQ0FBQyxDQUFDO0FBQ3JDLENBQUM7QUFBQSxDQUFDO0FBRUYsb0JBQW9CLE1BQW1CO0lBQ3JDLElBQU0sS0FBSyxHQUFHLElBQUksVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3JDLE1BQU0sQ0FBQyxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU8sRUFBRSxNQUFNO1FBQ2pDLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUMsSUFBSSxFQUFFLEtBQUs7WUFDMUQsSUFBTSxJQUFJLEdBQUcsT0FBTyxJQUFJLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDbEUsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQzFCLE1BQU0sQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO1lBQ3ZDLENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUNILE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNqQixDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMiLCJmaWxlIjoiMi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIHBhbCBmcm9tICcuL3BhbCc7XG5pbXBvcnQgeyBQQUxGaWxlIH0gZnJvbSAnLi9wYWwnO1xuXG5jb25zdCBWRVJTSU9OX09GRlNFVCA9IDc7XG5cbmNvbnN0IFBBTF9PRkZTRVQgPSA4O1xuXG5jb25zdCBNQVBTX09GRlNFVCA9IDEzNTI7XG5cbnR5cGUgUHJvbWlzZVJlc29sdmUgPSAodmFsdWU/OiB7fSB8IFRoZW5hYmxlPHt9PikgPT4gdm9pZDtcblxudHlwZSBQcm9taXNlUmVqZWN0ID0gKGVycm9yPzogYW55KSA9PiB2b2lkO1xuXG5leHBvcnQgY2xhc3MgRlBHRmlsZSB7XG5cbiAgcmVhZHk6IFByb21pc2U8dm9pZD47XG5cbiAgdmVyc2lvbjogbnVtYmVyO1xuXG4gIHByaXZhdGUgX2lzUmVhZHk6IGJvb2xlYW47XG5cbiAgcHJpdmF0ZSBfYnl0ZXM6IFVpbnQ4QXJyYXk7XG5cbiAgcHJpdmF0ZSBfbGVuZ3RoOiBudW1iZXI7XG5cbiAgcHJpdmF0ZSBfdmVyc2lvbjogbnVtYmVyO1xuXG4gIHBhbDogUEFMRmlsZTsgXG5cbiAgcHJpdmF0ZSBfbWFwczogQXJyYXk8YW55PjtcblxuICBwcml2YXRlIF9tYXBSZXF1ZXN0czogQXJyYXk8QXJyYXk8W1Byb21pc2VSZXNvbHZlLCBQcm9taXNlUmVqZWN0XT4+O1xuXG4gIGNvbnN0cnVjdG9yKGJ5dGVzOiBVaW50OEFycmF5KSB7XG4gICAgdGhpcy5fYnl0ZXMgPSBieXRlcztcbiAgICB0aGlzLl9sZW5ndGggPSAwO1xuICAgIHRoaXMuX21hcHMgPSBbXTtcbiAgICB0aGlzLl9tYXBSZXF1ZXN0cyA9IFtdO1xuICAgIHRoaXMucGFsID0gbmV3IFBBTEZpbGUobmV3IFVpbnQ4QXJyYXkodGhpcy5fYnl0ZXMsIFBBTF9PRkZTRVQpKTtcbiAgICB0aGlzLnZlcnNpb24gPSB0aGlzLl9ieXRlc1tWRVJTSU9OX09GRlNFVF07XG4gICAgdGhpcy5yZWFkeSA9IHRoaXMuX3JlYWRNZXRhKCk7XG4gIH1cblxuICBtYXAoaW5kZXgpIHtcbiAgICBpZiAoaW5kZXggPCAwKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoJ01hcCBpbmRpY2VzIHN0YXJ0IGluIDAnKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuX2lzUmVhZHkgJiYgaW5kZXggPj0gdGhpcy5fbGVuZ3RoKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoYFRoZXJlIGlzIG5vIG1hcCB3aXRoIGluZGV4ICR7aW5kZXh9YCk7XG4gICAgfVxuICAgIGlmICh0aGlzLl9sZW5ndGggPiBpbmRleCkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLl9tYXBzW2luZGV4XSk7XG4gICAgfVxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLl9tYXBSZXF1ZXN0c1tpbmRleF0gPSB0aGlzLl9tYXBSZXF1ZXN0c1tpbmRleF0gfHwgW107XG4gICAgICB0aGlzLl9tYXBSZXF1ZXN0c1tpbmRleF0ucHVzaChbcmVzb2x2ZSwgcmVqZWN0XSk7XG4gICAgfSk7XG4gIH1cblxuICBnZXQgbGVuZ3RoKCkge1xuICAgIHJldHVybiB0aGlzLnJlYWR5LnRoZW4oKCkgPT4gdGhpcy5fbGVuZ3RoKTtcbiAgfVxuXG4gIF9yZWFkTWV0YSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBmaWxlID0gdGhpczsgXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4gcmVhZE1hcChNQVBTX09GRlNFVCkpO1xuXG4gICAgICBmdW5jdGlvbiByZWFkTWFwKG9mZnNldCkge1xuICAgICAgICBpZiAob2Zmc2V0ID49IGZpbGUuX2J5dGVzLmJ5dGVMZW5ndGgpIHtcbiAgICAgICAgICBmaWxlLl9jb25maXJtQWxsTWFwcygpO1xuICAgICAgICAgIGZpbGUuX2lzUmVhZHkgPSB0cnVlO1xuICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBlbnRyeTogYW55ID0ge1xuICAgICAgICAgIGNvZGU6IGZpbGUuX2dldERvdWJsZShvZmZzZXQpLFxuICAgICAgICAgIGxlbmd0aDogZmlsZS5fZ2V0RG91YmxlKG9mZnNldCArIDQpLFxuICAgICAgICAgIGRlc2M6IGZpbGUuX2dldEFzY2lpVGV4dChvZmZzZXQgKyA4LCAzMiksXG4gICAgICAgICAgbmFtZTogZmlsZS5fZ2V0QXNjaWlUZXh0KG9mZnNldCArIDQwLCAxMiksXG4gICAgICAgICAgd2lkdGg6IGZpbGUuX2dldERvdWJsZShvZmZzZXQgKyA1MiksXG4gICAgICAgICAgaGVpZ2h0OiBmaWxlLl9nZXREb3VibGUob2Zmc2V0ICsgNTYpLFxuICAgICAgICAgIHBvaW50Q291bnQ6IGZpbGUuX2dldERvdWJsZShvZmZzZXQgKyA2MCksXG4gICAgICAgICAgcG9pbnRzT2Zmc2V0OiBvZmZzZXQgKyA2NFxuICAgICAgICB9O1xuXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlbnRyeSwgJ2FzSW1hZ2VEYXRhJywge1xuICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjb25zdCBzaXplID0gdGhpcy53aWR0aCAqIHRoaXMuaGVpZ2h0O1xuICAgICAgICAgICAgY29uc3QgZW5kT2ZEYXRhID0gdGhpcy5kYXRhT2Zmc2V0ICsgc2l6ZTtcbiAgICAgICAgICAgIGNvbnN0IGJpdG1hcCA9IG5ldyBVaW50OENsYW1wZWRBcnJheSg0ICogc2l6ZSk7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gdGhpcy5kYXRhT2Zmc2V0LCBqID0gMDsgaSA8IGVuZE9mRGF0YTsgaSsrLCBqKz00KSB7XG4gICAgICAgICAgICAgIGNvbnN0IGNvbG9ySW5kZXggPSBmaWxlLl9ieXRlc1tpXTtcbiAgICAgICAgICAgICAgY29uc3QgcGl4ZWxJbmRleCA9IGo7XG4gICAgICAgICAgICAgIGJpdG1hcC5zZXQoZmlsZS5wYWwuY29sb3IoY29sb3JJbmRleCksIHBpeGVsSW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShcbiAgICAgICAgICAgICAgbmV3IEltYWdlRGF0YShiaXRtYXAsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZW50cnksICdhc0RhdGFVcmwnLCB7XG4gICAgICAgICAgdmFsdWU6IGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNvbnN0IGNhbnZhcyA9IGF3YWl0IHRoaXMuYXNDYW52YXMoKTtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoY2FudmFzLnRvRGF0YVVSTCgpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZW50cnksICdhc0NhbnZhcycsIHtcbiAgICAgICAgICB2YWx1ZTogYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHRoaXMuYXNJbWFnZURhdGEoKTtcbiAgICAgICAgICAgIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgICAgICAgICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgICAgICAgICBjYW52YXMud2lkdGggPSBkYXRhLndpZHRoO1xuICAgICAgICAgICAgY2FudmFzLmhlaWdodCA9IGRhdGEuaGVpZ2h0O1xuICAgICAgICAgICAgY3R4LnB1dEltYWdlRGF0YShkYXRhLCAwLCAwKTtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoY2FudmFzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBlbnRyeS5kYXRhT2Zmc2V0ID0gb2Zmc2V0ICsgNjQgKyAoNCAqIGVudHJ5LnBvaW50Q291bnQpO1xuICAgICAgICBlbnRyeS5zaXplID0gZW50cnkuZGF0YU9mZnNldCArIChlbnRyeS53aWR0aCAqIGVudHJ5LmhlaWdodCkgLSBvZmZzZXQ7XG4gICAgICAgIGZpbGUuX21hcHMucHVzaChlbnRyeSk7XG4gICAgICAgIGZpbGUuX2NvbmZpcm1NYXAoZmlsZS5fbGVuZ3RoKTtcbiAgICAgICAgZmlsZS5fbGVuZ3RoKys7XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiByZWFkTWFwKG9mZnNldCArIGVudHJ5LnNpemUpKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIF9nZXREb3VibGUob2Zmc2V0KTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fYnl0ZXNbb2Zmc2V0XSB8XG4gICAgICAgICAgIHRoaXMuX2J5dGVzW29mZnNldCArIDFdIDw8IDggfFxuICAgICAgICAgICB0aGlzLl9ieXRlc1tvZmZzZXQgKyAyXSA8PCAxNiB8XG4gICAgICAgICAgIHRoaXMuX2J5dGVzW29mZnNldCArIDNdIDw8IDI0O1xuICB9XG5cbiAgX2dldEFzY2lpVGV4dChvZmZzZXQsIG1heCk6IHN0cmluZyB7XG4gICAgY29uc3QgY2hhcnMgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gb2Zmc2V0OyBtYXggPiAwICYmIHRoaXMuX2J5dGVzW2ldICE9PSAwOyBpKyssIG1heC0tKSB7XG4gICAgICBjaGFycy5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUodGhpcy5fYnl0ZXNbaV0pKTtcbiAgICB9XG4gICAgcmV0dXJuIGNoYXJzLmpvaW4oJycpO1xuICB9XG5cbiAgX2NvbmZpcm1NYXAoaW5kZXgpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh0aGlzLl9tYXBSZXF1ZXN0c1tpbmRleF0pKSB7XG4gICAgICB0aGlzLl9tYXBSZXF1ZXN0c1tpbmRleF0uZm9yRWFjaCgoW3Jlc29sdmVdKSA9PiByZXNvbHZlKHRoaXMuX21hcHNbaW5kZXhdKSk7XG4gICAgfVxuICB9XG5cbiAgX2NvbmZpcm1BbGxNYXBzKCkge1xuICAgIGZvciAobGV0IGluZGV4ID0gdGhpcy5fbGVuZ3RoOyBpbmRleCA8IHRoaXMuX21hcFJlcXVlc3RzLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgdGhpcy5fbWFwUmVxdWVzdHNbaW5kZXhdXG4gICAgICAuZm9yRWFjaCgoW18sIHJlamVjdF0pID0+IHJlamVjdChgVGhlcmUgaXMgbm8gbWFwIHdpdGggaW5kZXggJHtpbmRleH1gKSk7IFxuICAgIH1cbiAgfVxuXG59O1xuXG5leHBvcnQgZnVuY3Rpb24gcmVhZChidWZmZXI6IEFycmF5QnVmZmVyKTpQcm9taXNlPEZQR0ZpbGU+IHtcbiAgcmV0dXJuIF9hc3NlcnRGcGcoYnVmZmVyKVxuICAudGhlbihieXRlcyA9PiBuZXcgRlBHRmlsZShieXRlcykpO1xufTtcblxuZnVuY3Rpb24gX2Fzc2VydEZwZyhidWZmZXI6IEFycmF5QnVmZmVyKTogUHJvbWlzZTxVaW50OEFycmF5PiB7XG4gIGNvbnN0IGJ5dGVzID0gbmV3IFVpbnQ4QXJyYXkoYnVmZmVyKTtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBbJ2YnLCAncCcsICdnJywgMHgxQSwgMHgwRCwgMHgwQSwgMHgwMF0uZm9yRWFjaCgoY29kZSwgaW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IGNoYXIgPSB0eXBlb2YgY29kZSA9PT0gJ3N0cmluZycgPyBjb2RlLmNoYXJDb2RlQXQoMCkgOiBjb2RlO1xuICAgICAgaWYgKGJ5dGVzW2luZGV4XSAhPT0gY2hhcikge1xuICAgICAgICByZWplY3QoJ1RoZSBmaWxlIGlzIG5vdCBhIEZQRyBmaWxlJyk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmVzb2x2ZShieXRlcyk7XG4gIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2ZwZy50cyJdLCJzb3VyY2VSb290IjoiIn0=");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ })
/******/ ]);