"use strict";

var _express = _interopRequireDefault(require("express"));

var _http = _interopRequireDefault(require("http"));

var _expressHandlebars = _interopRequireDefault(require("express-handlebars"));

var _socket = require("./service/socket");

var _productoApi = _interopRequireDefault(require("./routers/producto-api"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

console.log('Hola Sandra');
var app = (0, _express["default"])();

var myServer = _http["default"].Server(app); //Init SocketIo Server


(0, _socket.initWsServer)(myServer);
var puerto = 8080;
myServer.listen(puerto, function () {
  return console.log('Server up en el puerto', puerto);
});

var publicPath = _path["default"].resolve(__dirname, '../public');

app.use(_express["default"]["static"](publicPath)); // decalara carpeta layaut Handlerbars

var layoutFolderPath = _path["default"].resolve(__dirname, '../views/layouts');

var defaultLayerPath = _path["default"].resolve(__dirname, '../views/layouts/index.hbs');

var partialFolderPath = _path["default"].resolve(__dirname, '../views/partials');

app.set('view engine', 'hbs'); // config handlebars: utiliza la plantilla base

app.engine('hbs', (0, _expressHandlebars["default"])({
  layoutsDir: layoutFolderPath,
  defaultLayout: defaultLayerPath,
  partialsDir: partialFolderPath,
  extname: 'hbs'
}));
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: true
})); // app.use('/api/productos', routerProductos);