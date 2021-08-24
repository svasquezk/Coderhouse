import express from 'express';
import http from 'http';
import handlebars from 'express-handlebars';
import {initWsServer} from './service/socketTS';
import routerProductos from './routers/producto-apiTS';
import path from 'path';

console.log('Hola Sandra TS wii');


const app = express();
// const myServer = http.Server(app);
const myServer = http.createServer(app);

//Init SocketIo Server
initWsServer(myServer)


const puerto = 8080;
myServer.listen(puerto, () => console.log('Server up en el puerto', puerto));

const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath));

// decalara carpeta layaut Handlerbars
const layoutFolderPath = path.resolve(__dirname, '../views/layouts');
const defaultLayerPath = path.resolve(__dirname, '../views/layouts/index.hbs');
const partialFolderPath = path.resolve(__dirname, '../views/partials');

app.set('view engine', 'hbs');

// config handlebars: utiliza la plantilla base
app.engine('hbs', handlebars({
    layoutsDir: layoutFolderPath, 
    defaultLayout: defaultLayerPath,
    partialsDir: partialFolderPath,
    extname: 'hbs'
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/productos', routerProductos);
