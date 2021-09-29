import { ProductoFSystemDAO } from "./DAO/fs";
import path from 'path';
import { ProductoMemoria } from "./DAO/memoria";
import { ProductoMongo } from "./DAO/mongo";

export enum TipoPersistencia {
    FileSystem = 'FS',
    Memoria = 'MEM', 
    MySQL = 'MYSQL',
    SQLLite3 = 'SQLLITE3',
    MongoLocal = 'MONGO-LOCAL',
    MongoAtlas = 'MONGO-ATLAS',
    FireBase = 'FIRE-BASE'
}


export class NoticiasFactoryDAO {
    static get(tipo: TipoPersistencia) {
        switch (tipo) {
            case TipoPersistencia.FileSystem:
                const filePath = './carpetaArchivo/producto.txt'; // path.resolve(__dirname, './carpetaArchivo/producto.txt');
                return new ProductoFSystemDAO(filePath);
            case TipoPersistencia.Memoria:
                return new ProductoMemoria();      
            // case TipoPersistencia.MySQL:
            //     const mySQL = ''; //
            //     break;
            // case TipoPersistencia.SQLLite3:
            //    const SQLLite3 = ''; 
            case TipoPersistencia.MongoLocal:
                return new ProductoMongo(false);         
            case TipoPersistencia.MongoAtlas:
                return new ProductoMongo(true);  
            // case TipoPersistencia.MongoLocal:
            //         const fireBase = '';
            default:
                const filePath2 = path.resolve(__dirname, './carpetaArchivo/producto.txt');
                return new ProductoFSystemDAO(filePath2);
        }
    }
}