"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.carritoPersistencia = void 0;
const filesystemCarrito_1 = require("./filesystem/filesystemCarrito");
let carrito = [];
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
        const newCarrito = await filesystemCarrito_1.guardar(data.timestamp, data.product);
        return newCarrito;
    }
    async delete(id) {
        carrito = await obtieneDataCarrito();
        const lCart = carrito.filter(p => p.id !== id);
        await filesystemCarrito_1.elimina(lCart);
    }
}
exports.carritoPersistencia = new Carrito();
