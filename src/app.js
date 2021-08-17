const express = require('express');
const http = require('http');
const io = require('socket.io');
const handlebars = require('express-handlebars');

const routerProductos = require('./routers/producto-api');
const path = require('path');


const app = express();
const puerto = 8080;

// const server = app.listen(puerto, () => 
//     console.log('Server Up en puerto', puerto)
// );

// server.on('error', (err) => {
//     console.log('Error => ', err);
// })

const myServer = http.Server(app);
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


const myWSServer = io(myServer);
const lproductos = [];

myWSServer.on('connection', (socket) => {
    console.log('Un cliente se a conectado');

    // Escucha los mensajes
    socket.on('new-product', (data) => {
        console.log('lproiducto ->', lproductos);
        lproductos.push(data);

        // Envia el mesnaje a todos
        myWSServer.emit('addNewProduct', lproductos)
    });

    socket.on('askData', () =>  {
        socket.emit('addNewProduct', lproductos);
    })
})


// app.get('/', (req, res) => {
//     res.render('main')
// })



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/productos', routerProductos);