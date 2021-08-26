import { leer, guardar, elimina } from './filesystem/filesystemCarrito';
import { Producto } from './productos';

let carrito:Carrito[] = [];

interface addCarrito  {
    id: number,
    timestamp: Date,
    product: Producto,
}

interface Carrito {
    id: number,
    timestamp: Date,
    product: Producto,
}

const obtieneDataCarrito = async () => {
    let lCarrito = [];
    lCarrito = await leer();
    if(!lCarrito) return [];

    return lCarrito;
}

class Carrito {
    async find(id: number) {
        carrito = await obtieneDataCarrito();        
        return carrito.find(c => c.id === id);
    }

    async get(id: number | null = null){
        carrito = await obtieneDataCarrito();     
        if(id) {
            const result = carrito.filter(c => c.id === id);
            return result;
        }
        return carrito;
    }

    async add(data: addCarrito){
        const newCarrito = await guardar(data.timestamp, data.product);
        return newCarrito;
    }

    async delete(id: number){
       carrito = await obtieneDataCarrito();     
       const lCart = carrito.filter(p => p.id !== id);
       await elimina(lCart);
    }
}


export const carritoPersistencia = new Carrito();