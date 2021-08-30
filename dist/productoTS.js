"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prodPersistencia = exports.update = exports.elimina = exports.guardar = exports.leer = void 0;
var fs_1 = __importDefault(require("fs"));
var pathArchivo = './carpetaArchivo/producto.txt';
var validaCarpetaYArchivo = function () { return __awaiter(void 0, void 0, void 0, function () {
    var path, carpeta, data, archivo;
    return __generator(this, function (_a) {
        path = './';
        carpeta = './carpetaArchivo';
        data = fs_1.default.readdirSync(path);
        //Valida si existe la carpeta y archivo producto
        if (!data.includes('carpetaArchivo')) {
            // Crear la carpeta y el archivo producto.txt
            fs_1.default.mkdirSync(carpeta);
            fs_1.default.writeFileSync(pathArchivo, JSON.stringify([], null, '\t'));
        }
        else {
            archivo = fs_1.default.readdirSync(carpeta);
            if (!archivo.includes('producto.txt')) {
                // crear producto.txt
                fs_1.default.writeFileSync(pathArchivo, JSON.stringify([], null, '\t'));
            }
            else {
                return [2 /*return*/];
            }
        }
        return [2 /*return*/];
    });
}); };
// lee los registros guardados
var leer = function () { return __awaiter(void 0, void 0, void 0, function () {
    var reg, JsonProd, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                // Valida que exista la carpeta
                return [4 /*yield*/, validaCarpetaYArchivo()];
            case 1:
                // Valida que exista la carpeta
                _a.sent();
                reg = fs_1.default.readFileSync(pathArchivo, 'utf-8');
                JsonProd = JSON.parse(reg);
                return [2 /*return*/, JsonProd];
            case 2:
                error_1 = _a.sent();
                console.log('Error al leer Archivo, ', error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.leer = leer;
// Ingresa registros a archivo txtroducto.title, producto.price, producto.thumbnail
var guardar = function (title, price, thumbnail) { return __awaiter(void 0, void 0, void 0, function () {
    var reg, data, jArchivo, nuevoProd;
    return __generator(this, function (_a) {
        try {
            reg = [];
            data = fs_1.default.readFileSync(pathArchivo, 'utf-8');
            // Si los reg. existen suma 
            if (data) {
                jArchivo = JSON.parse(data);
                reg.push.apply(reg, jArchivo);
            }
            nuevoProd = {
                id: reg.length + 1,
                title: title,
                price: price,
                thumbnail: thumbnail
            };
            reg.push(nuevoProd);
            // Escribe la data
            fs_1.default.writeFileSync(pathArchivo, JSON.stringify(reg, null, '\t'));
            // Retrorna el registro ingresado
            return [2 /*return*/, nuevoProd];
        }
        catch (error) {
            console.log('Error en archivo guardar', error);
        }
        return [2 /*return*/];
    });
}); };
exports.guardar = guardar;
var elimina = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            fs_1.default.writeFileSync(pathArchivo, JSON.stringify(data, null, '\t'));
        }
        catch (error) {
        }
        return [2 /*return*/];
    });
}); };
exports.elimina = elimina;
var update = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            fs_1.default.writeFileSync(pathArchivo, JSON.stringify(data, null, '\t'));
        }
        catch (error) {
            console.log('Error al actualizar registro');
        }
        return [2 /*return*/];
    });
}); };
exports.update = update;
var obtieneDataProd = function () { return __awaiter(void 0, void 0, void 0, function () {
    var lProductos;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                lProductos = [];
                return [4 /*yield*/, (0, exports.leer)()];
            case 1:
                lProductos = _a.sent();
                if (!lProductos)
                    return [2 /*return*/, []];
                return [2 /*return*/, lProductos];
        }
    });
}); };
var productos = [];
var Producto = /** @class */ (function () {
    function Producto() {
    }
    Producto.prototype.obtieneProductos = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, obtieneDataProd()];
                    case 1:
                        productos = _a.sent();
                        return [2 /*return*/, productos];
                }
            });
        });
    };
    Producto.prototype.obtieneProductoxID = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, obtieneDataProd()];
                    case 1:
                        productos = _a.sent();
                        return [2 /*return*/, productos.find(function (p) { return p.id === id; })];
                }
            });
        });
    };
    Producto.prototype.guardaProducto = function (producto) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, exports.guardar)(producto.title, producto.price, producto.thumbnail)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    Producto.prototype.actualizaProducto = function (id, title, price, thumbnail) {
        return __awaiter(this, void 0, void 0, function () {
            var lProd, _a, _b, rProd, error_2;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        lProd = [];
                        _b = (_a = lProd).push;
                        return [4 /*yield*/, obtieneDataProd()];
                    case 1:
                        _b.apply(_a, [_c.sent()]);
                        rProd = lProd.find(function (x) { return x.id === id; });
                        rProd.title = title;
                        rProd.price = price;
                        rProd.thumbnail = thumbnail;
                        return [2 /*return*/, rProd];
                    case 2:
                        error_2 = _c.sent();
                        return [2 /*return*/, null];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Producto.prototype.eliminaProducto = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var lProd, _a, _b, index;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        lProd = [];
                        _b = (_a = lProd).push;
                        return [4 /*yield*/, obtieneDataProd()];
                    case 1:
                        _b.apply(_a, [_c.sent()]);
                        index = lProd.findIndex(function (p) {
                            return p.id === id;
                        });
                        if (index !== -1)
                            lProd.splice(index, 1);
                        return [2 /*return*/, lProd];
                }
            });
        });
    };
    return Producto;
}());
exports.prodPersistencia = new Producto();
