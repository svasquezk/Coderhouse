import { NextFunction, Request, Response } from "express";

const admin = true;

export const checkAdmin = (req: Request, res: Response,next: NextFunction) => {
    if(admin)
    next();
    else {
    
       const rutaRouter = 'aqíVaLaRuta';
       const metodo = 'aqíVaElMetodo';

       res.status(401).json({
           error: '-1',
           descripcion: `ruta ${rutaRouter} método ${metodo} no autorizada`
       }) 
    }
}