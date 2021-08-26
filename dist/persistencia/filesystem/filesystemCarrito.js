"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.elimina = exports.guardar = exports.leer = void 0;
const fs_1 = __importDefault(require("fs"));
const pathArchivo = './carpetaArchivo/carrito.txt';
const validaCarpetaYArchivo = async () => {
    const path = './';
    const carpeta = './carpetaArchivo';
    const data = fs_1.default.readdirSync(path);
    //Valida si existe la carpeta y archivo producto
    if (!data.includes('carpetaArchivo')) {
        // Crear la carpeta y el archivo producto.txt
        fs_1.default.mkdirSync(carpeta);
        fs_1.default.writeFileSync(pathArchivo, JSON.stringify([], null, '\t'));
    }
    else {
        const archivo = fs_1.default.readdirSync(carpeta);
        if (!archivo.includes('carrito.txt')) {
            // crear carrito.txt
            fs_1.default.writeFileSync(pathArchivo, JSON.stringify([], null, '\t'));
        }
        else {
            return;
        }
    }
};
// lee los registros guardados
const leer = async () => {
    try {
        // Valida que exista la carpeta
        await validaCarpetaYArchivo();
        // lee el archivo
        const reg = fs_1.default.readFileSync(pathArchivo, 'utf-8');
        const JsonProd = JSON.parse(reg);
        return JsonProd;
    }
    catch (error) {
        console.log('Error al leer Archivo, ', error);
    }
};
exports.leer = leer;
// Ingresa registros a archivo txt
const guardar = async (timestamp, producto) => {
    try {
        let reg = [];
        // Lee los registros ingresados
        const data = fs_1.default.readFileSync(pathArchivo, 'utf-8');
        // Si los reg. existen suma 
        if (data) {
            const jArchivo = JSON.parse(data);
            reg.push(...jArchivo);
        }
        const nuevoProd = {
            id: reg.length + 1,
            timestamp,
            product: producto
        };
        reg.push(nuevoProd);
        // Escribe la data
        fs_1.default.writeFileSync(pathArchivo, JSON.stringify(reg, null, '\t'));
        // Retrorna el registro ingresado
        return nuevoProd;
    }
    catch (error) {
        console.log('Error en archivo guardar', error);
    }
};
exports.guardar = guardar;
const elimina = async (data) => {
    try {
        fs_1.default.writeFileSync(pathArchivo, JSON.stringify(data, null, '\t'));
    }
    catch (error) {
    }
};
exports.elimina = elimina;
