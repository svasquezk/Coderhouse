"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartController = void 0;
const carrito_1 = require("../persistencia/carrito");
const moment_1 = __importDefault(require("moment"));
class Carrito {
    async getCart(req, res) {
        const { id } = req.params;
        if (id) {
            const carrito = await carrito_1.carritoPersistencia.find(Number(id));
            if (!carrito) {
                return res.status(404).json({
                    msg: 'Carrito no encontrado'
                });
            }
            res.status(200).json({
                data: carrito
            });
        }
        else {
            const lCarrito = await carrito_1.carritoPersistencia.get();
            res.status(200).json({
                data: lCarrito
            });
        }
    }
    checkAddCart(req, res, next) {
        const { timestamp } = req.body;
        if (!timestamp) {
            return res.status(400).json({
                msg: 'Campos del body invalidos'
            });
        }
        //Valida el campo fecha
        let valFecha = moment_1.default(timestamp, 'DD/MM/YYYY', true).isValid();
        if (!valFecha) {
            return res.status(400).json({
                msg: 'Campo timestamp es invalidos, el formato aceptado es DD/MM/YYY'
            });
        }
        next();
    }
    async addCart(req, res) {
        const newCartProd = await carrito_1.carritoPersistencia.add(req.body);
        res.json({
            msg: 'producto agregado al carrito con exito',
            data: newCartProd
        });
    }
    async deleteCart(req, res) {
        const id = Number(req.params.id);
        if (!id) {
            return res.status(400).json({
                msg: "ID Invalido"
            });
        }
        const carrito = carrito_1.carritoPersistencia.find(id);
        if (!carrito) {
            return res.status(404).json({
                msg: "Carrito no existe"
            });
        }
        const lCarrito = await carrito_1.carritoPersistencia.delete(id);
        res.json({
            msg: 'Carrito borrado',
            lCarrito
        });
    }
}
exports.cartController = new Carrito();
