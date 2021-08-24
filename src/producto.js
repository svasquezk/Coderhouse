const fs = require('fs');
const pathArchivo = './carpetaArchivo/producto.txt';

class Producto {
    id;
    title;
    price; 
    thumbnail;
    constructor(id, title, price, thumbnail){
        this.id = id;
        this.title = title;
        this.price = price;
        this.thumbnail = thumbnail;
    }


    
    // lee los registros guardados
    leer = async() => {
        try {
            const path = './';
            const carpeta = './carpetaArchivo';

            const data = await fs.promises.readdir(path);
            //Valida si existe la carpeta y archivo producto
            if(!data.includes('carpetaArchivo')) {
                // Crear la carpeta y el archivo producto.txt
                await fs.promises.mkdir(carpeta);
                await fs.promises.writeFile(pathArchivo, JSON.stringify([], null, '\t'));
            } else {   
                const archivo = await fs.promises.readdir(carpeta);
                if(!archivo.includes('producto.txt')){
                    // crear producto.txt
                    await fs.promises.writeFile(pathArchivo, JSON.stringify([], null, '\t'));
                }
            }
            const reg = await fs.promises.readFile(pathArchivo, 'utf-8');
            return reg;
        } catch (error) {
            console.log('Error al leer Archivo, ', error);
        }
    }

    // Ingresa registros a archivo txt
    guardar = async() => {
    try {
        let reg = [];
        this.id = 1;

        // Lee los registros ingresados
        const data = await fs.promises.readFile(pathArchivo, 'utf-8');
        if(data) {
            const jArchivo = JSON.parse(data);
            this.id = jArchivo.length + 1;
            reg.push(...jArchivo);
        }

        const archivo = new Producto(this.id, this.title, this.price, this.thumbnail);
        reg.push(archivo);

        // Escribe la data
        await fs.promises.writeFile(pathArchivo, JSON.stringify(reg, null, '\t'));

        // Retrorna el registro ingresado
        console.log('nuevo reg ->', archivo);
        return archivo;
        
    } catch (error) {
        console.log('Error en archivo guardar', error);
    }
    }


    obtieneProductosBase = async() => {    
        return new Promise(async(resolve, reject) => {
            try {
                const productos = await this.leer();
                const resp = JSON.parse(productos);
                let lProd = [];
                lProd.push(...resp);
                resolve(lProd);
            } catch (error) {
                console.log('La operación ingresada es invalida');
                resolve(null);
                reject(error.messsage);
            }
        });

    }


}


const prod = new Producto();

obtieneProductos = async() => {
    const lProd = prod.obtieneProductosBase();
    return lProd;
}

obtieneProductoxID = async(id) => {
    try {
       let data = [];
       data = prod.obtieneProductosBase();
       const result = data.find(x => Number(x.id) ==  Number(id));
       return result;
    } catch (error) {
        console.log('ERROR -> ', error);
    }

}

guardaProducto = async(producto) => {
    const sProd = new Producto(0,producto.title, producto.price, producto.thumbnail);
    const result = await sProd.guardar();
    return result
}

 actualizaProducto = async(id,title, price, thumbnail) => {
    try {
        let lProd = [];
        lProd = await prod.obtieneProductos(); 
        const rProd = lProd.find(x =>  x.id === id);
        rProd.title = title;
        rProd.price = price; 
        rProd.thumbnail = thumbnail;

        return rProd;
    } catch (error) {
        return null;
    }
    
}

eliminaProducto = async(id) => {
    let lProd = [];
    lProd = await prod.obtieneProductos();
    const index = lProd.findIndex((p) => {
        return p.id === id;
   })

   if (index !== -1) lProd.splice(index, 1);
   return lProd;

}


module.exports = {
    obtieneProductos,
    obtieneProductoxID,
    guardaProducto,
    actualizaProducto,
    eliminaProducto
}