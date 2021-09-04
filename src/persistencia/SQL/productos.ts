import { DBService } from '../../services/DB';

let productos:Productos[] = [];
const tablaProducto = 'productos';

interface addProduct {
    timestamp: Date;
    nombre: string,
    descripcion: string;
    codigo: number;
    foto: string;
    precio: number;
    stock: number;
}

export class Productos {
    id!: number;
    timestamp!: Date;
    nombre!: string;
    descripcion!: string;
    codigo!: number;
    foto!: string;
    precio!: number;
    stock!: number;

    async find(id: number) {
        productos = await DBService.get(tablaProducto,id);
        return productos
    }

    async get(id: number | 0 = 0 ){
        productos = await DBService.get(tablaProducto, id);
        return productos;
    }

    async add(data: addProduct){
        // Guarda el registro nuevo
        const result = await DBService.create(tablaProducto, data);
        if(result > 0) {
            return data;
        }
        return 'Error al ingresar producto';
    }

    async update(id:number, data: addProduct){
        productos = DBService.update(tablaProducto, id, data);     
        return data;
    }

    async delete(id: number){
        const result = DBService.delete(tablaProducto, id);     
        return result;
    }
}


export const producPersistencia = new Productos();