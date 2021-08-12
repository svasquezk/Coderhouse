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


app.set('view engine', 'pug');
const viewPath = path.resolve(__dirname, '../views');
app.set('views', viewPath);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// config página ingreso de productos handlerbar
app.get('/creaprod', (req, res) => {
    res.render('creaprod', {layout: 'index'})
})


app.use('/api/productos', routerProductos);

