import mongoose from "mongoose";

const productoController = 'producto';

const productoSchema  = new mongoose.Schema({
    timestamp: {type: Date, default: Date.now},
    nombre: {type: String, required: true},
    descripcion: {type: String, required: true},
    codigo: {type: Number, required: true},
    foto: {type: String, required: true},
    precio: {type: Number, required: true},
    stock: {type: Number, required: true}
});

export const producto = mongoose.model(productoController, productoSchema);