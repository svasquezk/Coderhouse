import { Router } from "express";
import productsRouter from './producto';
import cartRouter from './carrito';

const router = Router();

router.use('/productos', productsRouter);
router.use('/carrito', cartRouter);

export default router;