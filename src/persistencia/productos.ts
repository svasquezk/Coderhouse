import { leer, guardar, elimina, update } from './filesystem/filesystemProduct';

let productos:Producto[] = [];

interface addProduct {
    timestamp: Date;
    nombre: string,
    descripcion: string;
    codigo: number;
    foto: string;
    precio: number;
    stock: number;
}

interface addProductCart {
    id: number;
    timestamp: Date;
    nombre: string,
    descripcion: string;
    codigo: number;
    foto: string;
    precio: number;
    stock: number;
}

export interface Producto {
    id: number;
    timestamp: Date;
    nombre: string;
    descripcion: string;
    codigo: number;
    foto: string;
    precio: number;
    stock: number;

}


const obtieneDataProd = async () => {
    let lProductos = [];
    lProductos = await leer();

    if(!lProductos) return [];

    return lProductos;
}

export class Productos {

    async find(id: number) {
        productos = await obtieneDataProd();          
        return productos.find(p => p.id === id);
    }

    async get(id: number | null = null){
        productos = await obtieneDataProd();          
        if(id) {
            const result = productos.filter(p => p.id === id);
            return result;
        }
        return productos;
    }

    async add(data: addProduct){
        // Guarda el registro nuevo
        const newProdAdd = await guardar( data.timestamp, data.nombre, data.descripcion, data.codigo, data.foto,  data.precio, data.stock);
        console.log('fina ->', newProdAdd);
        return newProdAdd;
    }

    async update(id:number, data: addProduct){

        const lProductosUp:Producto[] = await obtieneDataProd();          

        const indexProd = lProductosUp.findIndex(p => p.id === id);
        lProductosUp[indexProd].timestamp = data.timestamp;
        lProductosUp[indexProd].nombre = data.nombre;
        lProductosUp[indexProd].descripcion = data.descripcion;
        lProductosUp[indexProd].codigo = data.codigo;
        lProductosUp[indexProd].foto = data.foto;
        lProductosUp[indexProd].precio = data.precio;
        lProductosUp[indexProd].stock = data.stock;

        // Actualiza registros
        await update(lProductosUp);

        // Retorna reg. actualizado
        const updateProd= lProductosUp[indexProd];
        return updateProd;
    }

    async delete(id: number){
       productos = await obtieneDataProd();  
       const lProd = productos.filter(p => p.id !== id);
       await elimina(lProd);
    }

    addCartProduc(data: addProductCart) {
            const addProdCart = {
                id       : data.id,
                timestamp: data.timestamp,
                nombre  :  data.nombre, 
                descripcion: data.descripcion,
                codigo  : data.codigo,
                foto    : data.nombre,
                precio  : data.precio,
                stock   : data.stock
            }
            return addProdCart;   
    }
}


export const producPersistencia = new Productos();