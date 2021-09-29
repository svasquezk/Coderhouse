import { Router } from "express";
import { prodController } from '../controllers/productos';
import { checkAdmin } from '../middleware/admin';
import asyncHandler from 'express-async-handler';

const router = Router();

router.get('/listar', asyncHandler(prodController.getProducts))

router.get('/listar/:id', asyncHandler(prodController.getProducts))

router.post('/agregar',checkAdmin, prodController.checkAddProduct,   asyncHandler(prodController.addProducts))

router.put('/actualizar/:id',checkAdmin, prodController.checkUpdateProduct, asyncHandler(prodController.updateProducts))

router.delete('/borrar/:id',checkAdmin, asyncHandler(prodController.deleteProducts))

export default router;