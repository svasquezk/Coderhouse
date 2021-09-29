import { Router } from "express";
import { userController } from "../controllers/user";


const router = Router();

router.post('/login', userController.login);
router.get('/logout', userController.logout);
router.get('/infosecreta', userController.secretEndpoint);


export default router;