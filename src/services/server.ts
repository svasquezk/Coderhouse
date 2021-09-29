// Agrega la lógica del server
import express, {ErrorRequestHandler, NextFunction, Request, Response}  from 'express';
import path from 'path';
import * as http from 'http';
import apiRouter from '../routers/index';

const app = express();

const publicFolderPath = path.resolve(__dirname, '../../public');
app.use(express.static(publicFolderPath));

app.use(express.json());
app.use('/api', apiRouter);

const errorHandler: ErrorRequestHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    return res.status(500).json({
        msg: 'Ocurrió un error en la aplicación', 
        error: err.message
    });
};

app.use(errorHandler);

const myServer = new http.Server(app);
export default myServer;