const express = require('express');
const routerProductos = require('./routers/producto-api');
const path = require('path');

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


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/productos', routerProductos);


