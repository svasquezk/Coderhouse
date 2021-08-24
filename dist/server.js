"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var http_1 = __importDefault(require("http"));
var express_handlebars_1 = __importDefault(require("express-handlebars"));
var socketTS_1 = require("./service/socketTS");
var producto_api_1 = __importDefault(require("./routers/producto-api"));
var path_1 = __importDefault(require("path"));
console.log('Hola Sandra TS wii');
var app = express_1.default();
// const myServer = http.Server(app);
var myServer = http_1.default.createServer(app);
//Init SocketIo Server
socketTS_1.initWsServer(myServer);
var puerto = 8080;
myServer.listen(puerto, function () { return console.log('Server up en el puerto', puerto); });
var publicPath = path_1.default.resolve(__dirname, '../public');
app.use(express_1.default.static(publicPath));
// decalara carpeta layaut Handlerbars
var layoutFolderPath = path_1.default.resolve(__dirname, '../views/layouts');
var defaultLayerPath = path_1.default.resolve(__dirname, '../views/layouts/index.hbs');
var partialFolderPath = path_1.default.resolve(__dirname, '../views/partials');
app.set('view engine', 'hbs');
// config handlebars: utiliza la plantilla base
app.engine('hbs', express_handlebars_1.default({
    layoutsDir: layoutFolderPath,
    defaultLayout: defaultLayerPath,
    partialsDir: partialFolderPath,
    extname: 'hbs'
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api/productos', producto_api_1.default);
