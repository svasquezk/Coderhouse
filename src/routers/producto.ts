import { Router } from "express";
import { prodController } from '../controllers/productos';
import { checkAdmin } from '../middleware/admin';

const router = Router();

router.get('/listar', prodController.getProducts)

router.get('/listar/:id', prodController.getProducts)

router.post('/agregar',checkAdmin, prodController.checkAddProduct,  prodController.addProducts)

router.put('/actualizar/:id',checkAdmin, prodController.checkUpdateProduct, prodController.updateProducts)

router.delete('/borrar/:id',checkAdmin, prodController.deleteProducts)

export default router;