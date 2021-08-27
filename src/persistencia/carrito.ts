import { leer, guardar, elimina } from './filesystem/filesystemCarrito';
import { Productos } from './productos';
import moment from 'moment';


let carrito:Carrito[] = [];
const fecha =  moment().format(); 

interface addCarrito  {
    id: number,
    product: Productos,
}

interface Carrito {
    id: number,
    timestamp: Date,
    product: Productos,
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
        data.product.timestamp = new Date(fecha);
        const newCarrito = await guardar(new Date(fecha), data.product);
        return newCarrito;
    }

    async delete(id: number){
       carrito = await obtieneDataCarrito();     
       const lCart = carrito.filter(p => p.id !== id);
       await elimina(lCart);
    }
}


export const carritoPersistencia = new Carrito();