import mongoose from "mongoose";

const mensajeController = 'mensajes';

const mensajeSchema  = new mongoose.Schema({
    mensaje: {type: String, required: true}
});

export const mensaje = mongoose.model(mensajeController, mensajeSchema);