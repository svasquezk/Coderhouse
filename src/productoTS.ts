import fs from 'fs';

const pathArchivo = './carpetaArchivo/producto.txt';

const validaCarpetaYArchivo = async () => {
    const path = './';
    const carpeta = './carpetaArchivo';

    const data = fs.readdirSync(path);

 
    //Valida si existe la carpeta y archivo producto
    if(!data.includes('carpetaArchivo')) {
        // Crear la carpeta y el archivo producto.txt
         fs.mkdirSync(carpeta);
         fs.writeFileSync(pathArchivo, JSON.stringify([], null, '\t'));
    } else {   
        const archivo = fs.readdirSync(carpeta);
        if(!archivo.includes('producto.txt')){
            // crear producto.txt
            fs.writeFileSync(pathArchivo, JSON.stringify([], null, '\t'));
        } else {
            return;
        }

    }

}

// lee los registros guardados
export const leer = async() => {
    try {
        // Valida que exista la carpeta
        await validaCarpetaYArchivo();

        // lee el archivo
        const reg = fs.readFileSync(pathArchivo, 'utf-8');
        const JsonProd = JSON.parse(reg);
        return JsonProd;
    } catch (error) {
        console.log('Error al leer Archivo, ', error);
    }
}

// Ingresa registros a archivo txtroducto.title, producto.price, producto.thumbnail
export const guardar = async(title: string, price: number, thumbnail: string) => {
    try {
        let reg = [];

        // Lee los registros ingresados
        const data = fs.readFileSync(pathArchivo, 'utf-8');
        // Si los reg. existen suma 
        if(data) {
            const jArchivo = JSON.parse(data);
            reg.push(...jArchivo);
        }

        const nuevoProd = {
            id: reg.length + 1,
            title,
            price,
            thumbnail
        }

        reg.push(nuevoProd);

        // Escribe la data
        fs.writeFileSync(pathArchivo, JSON.stringify(reg, null, '\t'));

        // Retrorna el registro ingresado
        return nuevoProd; 
    } catch (error) {
        console.log('Error en archivo guardar', error);
    }
}

export const elimina = async(data: any[]) => {
    try {
        fs.writeFileSync(pathArchivo, JSON.stringify(data, null, '\t'));
    } catch (error) {
        
    }
}

export const update = async(data: any[]) => {
    try {
        fs.writeFileSync(pathArchivo, JSON.stringify(data, null, '\t'));
    } catch (error) {
     console.log('Error al actualizar registro');   
    }
}


const obtieneDataProd = async () => {
    let lProductos = [];
    lProductos = await leer();
    if(!lProductos) return [];
    return lProductos;
}

let productos:Producto[] = [];

class Producto {
    id: number;
    title:string;
    price: number; 
    thumbnail: string;


    async obtieneProductos(){
        productos = await obtieneDataProd();
        return productos;
    }

    async obtieneProductoxID(id:number){
        productos = await obtieneDataProd();
        return productos.find(p => p.id === id);
    }

    async guardaProducto(producto: Producto) {
        const result = await guardar(producto.title, producto.price, producto.thumbnail);
        return result
    }

    
    async actualizaProducto(id,title, price, thumbnail){
        try {
            let lProd = [];
            lProd.push(await obtieneDataProd()); 
            const rProd = lProd.find(x =>  x.id === id);
            rProd.title = title;
            rProd.price = price; 
            rProd.thumbnail = thumbnail;

            return rProd;
        } catch (error) {
            return null;
        }  
    }

    async eliminaProducto(id) {
        let lProd = [];
        lProd.push(await obtieneDataProd());
        const index = lProd.findIndex((p) => {
            return p.id === id;
       })

       if (index !== -1) lProd.splice(index, 1);
       return lProd;

    }
}


export const prodPersistencia = new Producto();