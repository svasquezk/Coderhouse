import { Router } from "express";
import productsRouter from './producto';
import cartRouter from './carrito';
import user from './user';


const router = Router();

router.use('/productos', productsRouter);
router.use('/carrito', cartRouter);
router.use('/user', user);

export default router;