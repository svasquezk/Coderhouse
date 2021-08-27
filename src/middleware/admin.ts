import { NextFunction, Request, Response } from "express";

const admin = true;

export const checkAdmin = (req: Request, res: Response,next: NextFunction) => {
    if(admin)
    next();
    else {
       const rutaRouter =  `${req.headers.host}${req.baseUrl}`;
       const metodo = req.route.path;

       res.status(401).json({
           error: '-1',
           descripcion: `ruta ${rutaRouter} método ${metodo} no autorizada`
       }) 
    }
}