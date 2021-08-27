"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.carritoPersistencia = void 0;
const filesystemCarrito_1 = require("./filesystem/filesystemCarrito");
const moment_1 = __importDefault(require("moment"));
let carrito = [];
const fecha = moment_1.default().format();
const obtieneDataCarrito = async () => {
    let lCarrito = [];
    lCarrito = await filesystemCarrito_1.leer();
    if (!lCarrito)
        return [];
    return lCarrito;
};
class Carrito {
    async find(id) {
        carrito = await obtieneDataCarrito();
        return carrito.find(c => c.id === id);
    }
    async get(id = null) {
        carrito = await obtieneDataCarrito();
        if (id) {
            const result = carrito.filter(c => c.id === id);
            return result;
        }
        return carrito;
    }
    async add(data) {
        data.product.timestamp = new Date(fecha);
        const newCarrito = await filesystemCarrito_1.guardar(new Date(fecha), data.product);
        return newCarrito;
    }
    async delete(id) {
        carrito = await obtieneDataCarrito();
        const lCart = carrito.filter(p => p.id !== id);
        await filesystemCarrito_1.elimina(lCart);
    }
}
exports.carritoPersistencia = new Carrito();
