// Agrega la lógica del server
import express, {ErrorRequestHandler, NextFunction, request, Request, Response}  from 'express';
import path from 'path';
import * as http from 'http';
import apiRouter from '../routers/index';
import session from 'express-session';

const app = express();

const publicFolderPath = path.resolve(__dirname, '../../public');
app.use(express.static(publicFolderPath));
app.use(express.json());

const timeSession = 60000; // 1 minuto
app.use(
    session({
        secret: 'mysecretcontent',
        cookie: { maxAge: timeSession },
        saveUninitialized: true,
        resave: false, 
    })
)

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
