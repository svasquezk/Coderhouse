"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prodController = void 0;
const productos_1 = require("../persistencia/productos");
const moment_1 = __importDefault(require("moment"));
class Producto {
    constructor() {
        // Valida ingreso de datos al agregar un producto
        this.checkAddProduct = (req, res, next) => {
            const { timestamp, nombre, descripcion, codigo, foto, precio, stock } = req.body.product || req.body;
            //Valida el campo fecha
            let valFecha = moment_1.default(timestamp, 'DD/MM/YYYY', true).isValid();
            if (!valFecha) {
                return res.status(400).json({
                    msg: 'Campo timestamp es invalidos, el formato aceptado es DD/MM/YYY'
                });
            }
            if (!timestamp || !nombre || !descripcion || !codigo || !foto || !precio || !stock ||
                typeof nombre !== 'string' || typeof descripcion !== 'string' ||
                isNaN(codigo) || typeof foto !== 'string' ||
                isNaN(precio) || isNaN(stock)) {
                return res.status(400).json({
                    msg: 'Campos del body invalidos'
                });
            }
            next();
        };
        // Valida el ingreso de datos a actualizar
        this.checkUpdateProduct = (req, res, next) => {
            const id = Number(req.params.id);
            const { timestamp, nombre, descripcion, codigo, foto, precio, stock } = req.body;
            if (isNaN(id)) {
                return res.status(400).json({
                    msg: 'ID es invalidos'
                });
            }
            //Valida el campo fecha
            let valFecha = moment_1.default(timestamp, 'DD/MM/YYYY', true).isValid();
            if (!valFecha) {
                return res.status(400).json({
                    msg: 'Campo timestamp es invalidos, el formato aceptado es DD/MM/YYY'
                });
            }
            if (!timestamp || !nombre || !descripcion || !codigo || !foto || !precio || !stock ||
                typeof nombre !== 'string' || typeof timestamp !== 'string' || typeof descripcion !== 'string' ||
                isNaN(codigo) || typeof foto !== 'string' ||
                isNaN(precio) || isNaN(stock)) {
                return res.status(400).json({
                    msg: 'Campos del body invalidos'
                });
            }
            next();
        };
    }
    async getProducts(req, res) {
        const { id } = req.params;
        if (id) {
            const producto = await productos_1.producPersistencia.get(Number(id));
            if (!producto)
                return res.status(404).json({
                    msg: 'Producto no encontrado'
                });
            res.json({
                data: producto
            });
        }
        else {
            const producto = await productos_1.producPersistencia.get();
            res.json({
                data: producto
            });
        }
    }
    async addProducts(req, res) {
        const newProd = await productos_1.producPersistencia.add(req.body);
        res.json({
            msg: 'Producto agregado con exito',
            data: newProd
        });
    }
    async updateProducts(req, res) {
        const { id } = req.params;
        const newUpProduc = req.body;
        const upProduc = await productos_1.producPersistencia.update(Number(id), newUpProduc);
        res.json({
            msg: 'Producto actualizado',
            data: upProduc
        });
    }
    async deleteProducts(req, res) {
        const id = Number(req.params.id);
        if (!id) {
            return res.status(400).json({
                msg: "ID Invalido"
            });
        }
        const producto = await productos_1.producPersistencia.find(id);
        if (!producto) {
            return res.status(404).json({
                msg: "Producto no existe"
            });
        }
        productos_1.producPersistencia.delete(id);
        res.json({
            msg: 'producto borrado',
        });
    }
}
exports.prodController = new Producto();
