import { Request, Response, NextFunction } from 'express';
// import {producPersistencia} from '../persistencia/filesystemPersistencia/productos';
// import {producPersistencia} from '../persistencia/SQL/productos'
import { producPersistencia } from '../persistencia/MongoBD/producto'
import { ProductoQuery } from '../model/productos/producto.interface';

import { prodAPI } from '../apis/productos';

class Producto {

    async getProducts(req: Request, res: Response) {
        const {id} = req.params;
        const {nombre, precio,codigo,stock } = req.query;

        if(id){
            const producto = await prodAPI.getProductos(id);
              if(!producto)
                  return res.status(404).json({
                      msg: 'Producto no encontrado'
                  })
           
              res.json({
                  data: producto
                  })
        } else {
            // Obtiene valores de filtro
            const query: ProductoQuery = {};
            if(nombre) query.nombre = nombre.toString();
            if(precio) query.precio = Number(precio);
            if(codigo) query.codigo = Number(codigo);
            if(stock)  query.stock  = Number(stock);

            if(Object.keys(query).length) {
                return res.json({
                    data: await prodAPI.query(query)
                })
            }

            const producto = await prodAPI.getProductos();
            res.json({
                data: producto
            })
        } 


    }

    // Valida ingreso de datos al agregar un producto
    checkAddProduct = (req: Request, res: Response, next: NextFunction) => {
            const { nombre, 
                    descripcion,
                    codigo,
                    foto,
                    precio,
                    stock
             } = req.body.product || req.body;

        if(!nombre || !descripcion || !codigo || !foto || !precio || !stock ||
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

        console.log('checkUpdateProduct');
        const id = req.params.id
        const { nombre, 
                descripcion,
                codigo,
                foto,
                precio,
                stock
            } = req.body;

            if(!id) {
            return res.status(400).json({
                msg: 'ID es invalidos'
            });
        }

        if(!nombre || !descripcion || !codigo || !foto || !precio || !stock ||
            typeof nombre !== 'string' || typeof descripcion !== 'string' ||
            isNaN(codigo) || typeof foto !== 'string' ||
            isNaN(precio) || isNaN(stock)){
            return res.status(400).json({
                msg: 'Campos del body invalidos'
            });
        }

        next();
    }

    async addProducts(req: Request, res: Response) {
        const newProd = await prodAPI.addProducto(req.body);
        res.json({
            msg: 'Producto agregado con exito',
            data: newProd
        })
    }

    async updateProducts(req: Request, res: Response) {
        const {id} = req.params;
        const newUpProduc = req.body;  
       
        const upProduc = await prodAPI.updateProduct(id, newUpProduc);
        res.json({
            msg: 'Producto actualizado',
            data: upProduc
        })
    }

    async deleteProducts(req: Request, res: Response) {
        const id = req.params.id;
        if(!id){
            return res.status(400).json({
                msg: "ID Invalido"
            })
        }

        const producto = await prodAPI.getProductos(id); 
        if(!producto) {
            return res.status(404).json({
                msg: "Producto no existe"
            })
        }

        prodAPI.deleteProduct(id);
        res.json({
            msg: 'producto borrado', 
        })
    }
}

export const prodController = new Producto();