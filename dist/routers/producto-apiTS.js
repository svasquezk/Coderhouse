"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var express = require('express');

var router = express.Router();

var producto = require('../producto'); // Lista los array de productos


router.get('/listar', function (req, res) {
  producto.obtieneProductos().then(function (resp) {
    if (!resp) {
      res.json({
        error: 'no hay productos cargados'
      });
    }

    res.json({
      data: resp
    });
  })["catch"](function () {
    res.json({
      msj: 'Error al obtener registros'
    });
  });
}); // Obtiene productos por id

router.get('/listar/:id', function (req, res) {
  var idProd = Number(req.params.id);
  producto.obtieneProductoxID(idProd).then(function (respProd) {
    if (!respProd) {
      res.json({
        error: 'producto no encontrado'
      });
    }

    res.json({
      resp: respProd
    });
  })["catch"](function (m) {
    res.json({
      msj: 'Error al obtener registros'
    });
  });
}); // Guarda un nuevo producto

router.post('/guardar', function (req, res) {
  var prod = req.body;
  producto.guardaProducto(prod).then(function (result) {
    console.log('AQUI'); // Se redirecciona a la API Vista

    res.redirect('/api/productos/vista'); // res.json({
    //     id: result.id,
    //     title: result.title,
    //     price: result.price,
    //     thumbnail: result.thumbnail
    // });
  })["catch"](function () {
    res.json({
      msj: 'Error al ingresar nuevo registro'
    });
  });
}); // Actualiza producto x id (retorna prod. actualizado)

router.put('/actualizar/:id', /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var id, title, price, thumbnail, result;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            id = Number(req.params.id);
            title = req.body.title;
            price = req.body.price;
            thumbnail = req.body.thumbnail;
            _context.next = 6;
            return producto.actualizaProducto(id, title, price, thumbnail);

          case 6:
            result = _context.sent;

            if (result) {
              res.status(200).json({
                data: result
              });
            } else {
              res.status(400).json({
                data: 'Error al actualizar regustro'
              });
            }

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}()); // Elimina producto x id (retorna prod. eliminado)

router["delete"]('/borrar/:id', /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var id, result;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            id = Number(req.params.id);
            _context2.next = 3;
            return producto.eliminaProducto(id);

          case 3:
            result = _context2.sent;

            if (result) {
              res.status(200).json({
                data: result
              });
            } else {
              res.status(400).json({
                data: 'Error al actualizar regustro'
              });
            }

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}()); // config página principal de handlerbar

router.get('/vista', /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var lprod, listaProd, _listaProd;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            console.log('*************************');
            _context3.next = 3;
            return producto.obtieneProductos();

          case 3:
            lprod = _context3.sent;

            if (!lprod) {
              listaProd = {
                tieneProd: false
              };
              res.render('main', listaProd);
            } else {
              _listaProd = {
                tieneProd: true,
                lprod: lprod
              };
              res.render('main', _listaProd);
            }

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
module.exports = router;