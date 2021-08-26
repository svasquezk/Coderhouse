"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.producPersistencia = exports.Productos = void 0;
const filesystemProduct_1 = require("./filesystem/filesystemProduct");
let productos = [];
const obtieneDataProd = async () => {
    let lProductos = [];
    lProductos = await filesystemProduct_1.leer();
    if (!lProductos)
        return [];
    return lProductos;
};
class Productos {
    async find(id) {
        productos = await obtieneDataProd();
        return productos.find(p => p.id === id);
    }
    async get(id = null) {
        productos = await obtieneDataProd();
        if (id) {
            const result = productos.filter(p => p.id === id);
            return result;
        }
        return productos;
    }
    async add(data) {
        // Guarda el registro nuevo
        const newProdAdd = await filesystemProduct_1.guardar(data.timestamp, data.nombre, data.descripcion, data.codigo, data.foto, data.precio, data.stock);
        console.log('fina ->', newProdAdd);
        return newProdAdd;
    }
    async update(id, data) {
        const lProductosUp = await obtieneDataProd();
        const indexProd = lProductosUp.findIndex(p => p.id === id);
        lProductosUp[indexProd].timestamp = data.timestamp;
        lProductosUp[indexProd].nombre = data.nombre;
        lProductosUp[indexProd].descripcion = data.descripcion;
        lProductosUp[indexProd].codigo = data.codigo;
        lProductosUp[indexProd].foto = data.foto;
        lProductosUp[indexProd].precio = data.precio;
        lProductosUp[indexProd].stock = data.stock;
        // Actualiza registros
        await filesystemProduct_1.update(lProductosUp);
        // Retorna reg. actualizado
        const updateProd = lProductosUp[indexProd];
        return updateProd;
    }
    async delete(id) {
        productos = await obtieneDataProd();
        const lProd = productos.filter(p => p.id !== id);
        await filesystemProduct_1.elimina(lProd);
    }
    addCartProduc(data) {
        const addProdCart = {
            id: data.id,
            timestamp: data.timestamp,
            nombre: data.nombre,
            descripcion: data.descripcion,
            codigo: data.codigo,
            foto: data.nombre,
            precio: data.precio,
            stock: data.stock
        };
        return addProdCart;
    }
}
exports.Productos = Productos;
exports.producPersistencia = new Productos();
