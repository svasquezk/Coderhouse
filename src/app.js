const express = require('express');
const routerProductos = require('./routers/producto-api');
const path = require('path');
const handlebars = require('express-handlebars');

const app = express();
const puerto = 8080;

const server = app.listen(puerto, () => 
    console.log('Server Up en puerto', puerto)
);

server.on('error', (err) => {
    console.log('Error => ', err);
})

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


// // config página principal de handlerbar
// app.get('/', (req, res) => {
//     res.render('main')
// })

// config página ingreso de productos handlerbar
app.get('/creaprod', (req, res) => {
    res.render('creaprod', {layout: 'index'})
})


app.use('/api/productos', routerProductos);


