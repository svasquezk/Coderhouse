"use strict";

var express = require('express');

var http = require('http'); // const io = require('socket.io');


var handlebars = require('express-handlebars');

var _require = require('./service/socket'),
    initWsServer = _require.initWsServer;

var routerProductos = require('./routers/producto-api');

var path = require('path');

var app = express();
var myServer = http.Server(app); //Init SocketIo Server

initWsServer(myServer);
var puerto = 8080;
myServer.listen(puerto, function () {
  return console.log('Server up en el puerto', puerto);
});
var publicPath = path.resolve(__dirname, '../public');
app.use(express["static"](publicPath)); // decalara carpeta layaut Handlerbars

var layoutFolderPath = path.resolve(__dirname, '../views/layouts');
var defaultLayerPath = path.resolve(__dirname, '../views/layouts/index.hbs');
var partialFolderPath = path.resolve(__dirname, '../views/partials');
app.set('view engine', 'hbs'); // config handlebars: utiliza la plantilla base

app.engine('hbs', handlebars({
  layoutsDir: layoutFolderPath,
  defaultLayout: defaultLayerPath,
  partialsDir: partialFolderPath,
  extname: 'hbs'
}));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use('/api/productos', routerProductos);