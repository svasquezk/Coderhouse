"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var fs = require('fs');

var pathArchivo = './carpetaArchivo/producto.txt';

var Producto = function Producto(id, title, price, thumbnail) {
  var _this = this;

  _classCallCheck(this, Producto);

  _defineProperty(this, "id", void 0);

  _defineProperty(this, "title", void 0);

  _defineProperty(this, "price", void 0);

  _defineProperty(this, "thumbnail", void 0);

  _defineProperty(this, "leer", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var path, carpeta, data, archivo, reg;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            path = './';
            carpeta = './carpetaArchivo';
            _context.next = 5;
            return fs.promises.readdir(path);

          case 5:
            data = _context.sent;

            if (data.includes('carpetaArchivo')) {
              _context.next = 13;
              break;
            }

            _context.next = 9;
            return fs.promises.mkdir(carpeta);

          case 9:
            _context.next = 11;
            return fs.promises.writeFile(pathArchivo, JSON.stringify([], null, '\t'));

          case 11:
            _context.next = 19;
            break;

          case 13:
            _context.next = 15;
            return fs.promises.readdir(carpeta);

          case 15:
            archivo = _context.sent;

            if (archivo.includes('producto.txt')) {
              _context.next = 19;
              break;
            }

            _context.next = 19;
            return fs.promises.writeFile(pathArchivo, JSON.stringify([], null, '\t'));

          case 19:
            _context.next = 21;
            return fs.promises.readFile(pathArchivo, 'utf-8');

          case 21:
            reg = _context.sent;
            return _context.abrupt("return", reg);

          case 25:
            _context.prev = 25;
            _context.t0 = _context["catch"](0);
            console.log('Error al leer Archivo, ', _context.t0);

          case 28:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 25]]);
  })));

  _defineProperty(this, "guardar", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var reg, data, jArchivo, archivo;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            reg = [];
            _this.id = 1; // Lee los registros ingresados

            _context2.next = 5;
            return fs.promises.readFile(pathArchivo, 'utf-8');

          case 5:
            data = _context2.sent;

            if (data) {
              jArchivo = JSON.parse(data);
              _this.id = jArchivo.length + 1;
              reg.push.apply(reg, _toConsumableArray(jArchivo));
            }

            archivo = new Producto(_this.id, _this.title, _this.price, _this.thumbnail);
            reg.push(archivo); // Escribe la data

            _context2.next = 11;
            return fs.promises.writeFile(pathArchivo, JSON.stringify(reg, null, '\t'));

          case 11:
            // Retrorna el registro ingresado
            console.log('nuevo reg ->', archivo);
            return _context2.abrupt("return", archivo);

          case 15:
            _context2.prev = 15;
            _context2.t0 = _context2["catch"](0);
            console.log('Error en archivo guardar', _context2.t0);

          case 18:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 15]]);
  })));

  _defineProperty(this, "obtieneProductosBase", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            return _context4.abrupt("return", new Promise( /*#__PURE__*/function () {
              var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(resolve, reject) {
                var productos, resp, lProd;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        _context3.prev = 0;
                        _context3.next = 3;
                        return _this.leer();

                      case 3:
                        productos = _context3.sent;
                        resp = JSON.parse(productos);
                        lProd = [];
                        lProd.push.apply(lProd, _toConsumableArray(resp));
                        resolve(lProd);
                        _context3.next = 15;
                        break;

                      case 10:
                        _context3.prev = 10;
                        _context3.t0 = _context3["catch"](0);
                        console.log('La operación ingresada es invalida');
                        resolve(null);
                        reject(_context3.t0.messsage);

                      case 15:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3, null, [[0, 10]]);
              }));

              return function (_x, _x2) {
                return _ref4.apply(this, arguments);
              };
            }()));

          case 1:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  })));

  this.id = id;
  this.title = title;
  this.price = price;
  this.thumbnail = thumbnail;
} // lee los registros guardados
;

var prod = new Producto();

obtieneProductos = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
    var lProd;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            lProd = prod.obtieneProductosBase();
            return _context5.abrupt("return", lProd);

          case 2:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function obtieneProductos() {
    return _ref5.apply(this, arguments);
  };
}();

obtieneProductoxID = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(id) {
    var data, result;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            data = [];
            data = prod.obtieneProductosBase();
            result = data.find(function (x) {
              return Number(x.id) == Number(id);
            });
            return _context6.abrupt("return", result);

          case 7:
            _context6.prev = 7;
            _context6.t0 = _context6["catch"](0);
            console.log('ERROR -> ', _context6.t0);

          case 10:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 7]]);
  }));

  return function obtieneProductoxID(_x3) {
    return _ref6.apply(this, arguments);
  };
}();

guardaProducto = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(producto) {
    var sProd, result;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            sProd = new Producto(0, producto.title, producto.price, producto.thumbnail);
            _context7.next = 3;
            return sProd.guardar();

          case 3:
            result = _context7.sent;
            return _context7.abrupt("return", result);

          case 5:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function guardaProducto(_x4) {
    return _ref7.apply(this, arguments);
  };
}();

actualizaProducto = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(id, title, price, thumbnail) {
    var lProd, rProd;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            lProd = [];
            _context8.next = 4;
            return prod.obtieneProductos();

          case 4:
            lProd = _context8.sent;
            rProd = lProd.find(function (x) {
              return x.id === id;
            });
            rProd.title = title;
            rProd.price = price;
            rProd.thumbnail = thumbnail;
            return _context8.abrupt("return", rProd);

          case 12:
            _context8.prev = 12;
            _context8.t0 = _context8["catch"](0);
            return _context8.abrupt("return", null);

          case 15:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[0, 12]]);
  }));

  return function actualizaProducto(_x5, _x6, _x7, _x8) {
    return _ref8.apply(this, arguments);
  };
}();

eliminaProducto = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(id) {
    var lProd, index;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            lProd = [];
            _context9.next = 3;
            return prod.obtieneProductos();

          case 3:
            lProd = _context9.sent;
            index = lProd.findIndex(function (p) {
              return p.id === id;
            });
            if (index !== -1) lProd.splice(index, 1);
            return _context9.abrupt("return", lProd);

          case 7:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));

  return function eliminaProducto(_x9) {
    return _ref9.apply(this, arguments);
  };
}();

module.exports = {
  obtieneProductos: obtieneProductos,
  obtieneProductoxID: obtieneProductoxID,
  guardaProducto: guardaProducto,
  actualizaProducto: actualizaProducto,
  eliminaProducto: eliminaProducto
};