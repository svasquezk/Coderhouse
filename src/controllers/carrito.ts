import {NextFunction, Request, Response} from 'express';
import { carritoPersistencia } from '../persistencia/carrito';
import moment from 'moment';

class Carrito {

    async getCart(req: Request, res: Response) {
        const {id} = req.params;
        if(id) {
            const carrito = await carritoPersistencia.find(Number(id));
            if(!carrito){
                return res.status(404).json({
                    msg: 'Carrito no encontrado'
                })
            }

            res.status(200).json({
                data: carrito
            })
        } else {
            const lCarrito = await carritoPersistencia.get();
            res.status(200).json({
                data: lCarrito
            })
        }
    }

    async addCart(req: Request, res: Response) {
        const newCartProd = await carritoPersistencia.add(req.body);
        res.json({
            msg: 'producto agregado al carrito con exito',
            data: newCartProd
        })
    }

    async deleteCart(req: Request, res: Response) {
        const id = Number(req.params.id);

        if(!id){
            return res.status(400).json({
                msg: "ID Invalido"
            })
        }

        const carrito = await carritoPersistencia.find(id);
        if(!carrito) {
            return res.status(404).json({
                msg: "Carrito no existe"
            })
        }

        const lCarrito = await carritoPersistencia.delete(id)
        res.json({
            msg: 'Carrito borrado', 
            lCarrito
        })
    }
}


export const cartController = new Carrito();