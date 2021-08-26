import { Router } from "express";
import productsRouter from './producto';
import cartRouter from './carrito';

const router = Router();

router.use('/products', productsRouter);
router.use('/cart', cartRouter);

export default router;