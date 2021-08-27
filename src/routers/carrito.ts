import { Router } from "express";
import { cartController } from '../controllers/carrito';
import { prodController } from '../controllers/productos'


const router = Router();

router.get('/listar', cartController.getCart)

router.get('/listar/:id', cartController.getCart)

router.post('/agregar',prodController.checkAddProduct, cartController.addCart)

router.delete('/borrar/:id',  cartController.deleteCart)


export default router;