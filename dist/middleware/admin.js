"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAdmin = void 0;
const admin = true;
const checkAdmin = (req, res, next) => {
    if (admin)
        next();
    else {
        const rutaRouter = `${req.headers.host}${req.baseUrl}`;
        const metodo = req.route.path;
        res.status(401).json({
            error: '-1',
            descripcion: `ruta ${rutaRouter} método ${metodo} no autorizada`
        });
    }
};
exports.checkAdmin = checkAdmin;
