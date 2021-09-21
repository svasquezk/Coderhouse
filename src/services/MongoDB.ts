import mongoose, { ConnectOptions } from 'mongoose';
import * as model from '../model/mensajes';


const msj = { mensaje : 'Mensaje de prueba'}


async function CRUD() {
    /*   Conexion a la BD  */
    const URL = 'mongodb://localhost:27017/ecommerce';
    let rta = await mongoose.connect(URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    } as ConnectOptions);


    console.log('-------------------Base de datos creada -');
}


export const DBMongo = CRUD;