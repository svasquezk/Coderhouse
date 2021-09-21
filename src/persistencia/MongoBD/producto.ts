import * as model from '../../model/producto';


interface addProduct {
    timestamp: Date;
    nombre: string,
    descripcion: string;
    codigo: number;
    foto: string;
    precio: number;
    stock: number;
}

export class ProductosMongo {
    id!: string;
    timestamp!: Date;
    nombre!: string;
    descripcion!: string;
    codigo!: number;
    foto!: string;
    precio!: number;
    stock!: number;

    async find(id: string) {
        console.log('--->', id);
        const respuesta = await model.producto.find({_id: id});
        return respuesta;
    }

    async get(id: string | 0 = 0 ){
        if(id !== '') {
            const respuesta = await model.producto.find({_id: id});
            return respuesta;
        }
        const respuesta = model.producto.find({})
        return respuesta;
    }

    async add(data: addProduct){
        // Guarda el registro nuevo
        const result = await model.producto.insertMany(data);
        if(result) {
            return result;
        }
        return 'Error al ingresar producto';
    }

    async update(id:string, data: addProduct){
        const productos = await model.producto.updateOne(
            {id: {$eq: id}}, 
            {$set: { nombre: data.nombre,
                     descripcion: data.descripcion,
                     codigo: data.codigo,
                     foto: data.foto,
                     precio: data.precio,
                     stock: data.stock}
        })  
        return data;
    }

    async delete(id: string){
         const result = await model.producto.deleteOne({_id: id}) 
         return result;
    }
}

export const producPersistencia = new ProductosMongo();