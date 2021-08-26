import {Request, Response, NextFunction} from 'express';
import {producPersistencia} from '../persistencia/productos'
import moment from 'moment';

class Producto {

    async getProducts(req: Request, res: Response) {
        const {id} = req.params;

        if(id){
            const producto = await producPersistencia.get(Number(id));
              if(!producto)
                  return res.status(404).json({
                      msg: 'Producto no encontrado'
                  })
           
              res.json({
                  data: producto
                  })
          } else {
              const producto = await producPersistencia.get();
              res.json({
                  data: producto
               })
         }
    }

    // Valida ingreso de datos al agregar un producto
    checkAddProduct = (req: Request, res: Response, next: NextFunction) => {
            const {timestamp, 
                    nombre, 
                    descripcion,
                    codigo,
                    foto,
                    precio,
                    stock
             } = req.body.product || req.body;

       //Valida el campo fecha
       let valFecha = moment(timestamp, 'DD/MM/YYYY',true).isValid();
       if(!valFecha) {
            return res.status(400).json({
                msg: 'Campo timestamp es invalidos, el formato aceptado es DD/MM/YYY'
            });
       }

        if(!timestamp || !nombre || !descripcion || !codigo || !foto || !precio || !stock ||
            typeof nombre !== 'string' ||  typeof descripcion !== 'string' ||
            isNaN(codigo) || typeof foto !== 'string' ||
            isNaN(precio) || isNaN(stock)){
            return res.status(400).json({
                msg: 'Campos del body invalidos'
            });
        }
    
        next();
    }

    // Valida el ingreso de datos a actualizar
    checkUpdateProduct = (req: Request, res: Response, next: NextFunction) => {
        const id = Number(req.params.id)
        const {timestamp, 
                nombre, 
                descripcion,
                codigo,
                foto,
                precio,
                stock
            } = req.body;

            if(isNaN(id)) {
            return res.status(400).json({
                msg: 'ID es invalidos'
            });
        }

       //Valida el campo fecha
       let valFecha = moment(timestamp, 'DD/MM/YYYY',true).isValid();
       if(!valFecha) {
            return res.status(400).json({
                msg: 'Campo timestamp es invalidos, el formato aceptado es DD/MM/YYY'
            });
       }

        if(!timestamp || !nombre || !descripcion || !codigo || !foto || !precio || !stock ||
            typeof nombre !== 'string' || typeof timestamp !== 'string' || typeof descripcion !== 'string' ||
            isNaN(codigo) || typeof foto !== 'string' ||
            isNaN(precio) || isNaN(stock)){
            return res.status(400).json({
                msg: 'Campos del body invalidos'
            });
        }

        next();
    }

    async addProducts(req: Request, res: Response) {
        const newProd = await producPersistencia.add(req.body);
        res.json({
            msg: 'Producto agregado con exito',
            data: newProd
        })
    }

    async updateProducts(req: Request, res: Response) {
        const {id} = req.params;
        const newUpProduc = req.body;       
        const upProduc = await producPersistencia.update(Number(id), newUpProduc);
        res.json({
            msg: 'Producto actualizado',
            data: upProduc
        })
    }

    async deleteProducts(req: Request, res: Response) {
        const id = Number(req.params.id);
        if(!id){
            return res.status(400).json({
                msg: "ID Invalido"
            })
        }

        const producto = await producPersistencia.find(id);
        if(!producto) {
            return res.status(404).json({
                msg: "Producto no existe"
            })
        }

        producPersistencia.delete(id);
        res.json({
            msg: 'producto borrado', 
        })
    }
}

export const prodController = new Producto();