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

// Ingresa registros a archivo txt
export const guardar = async(timestamp: string, nombre: string, descripcion: string,
                             codigo: number, foto: string, precio: number, stock:number) => {
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
            timestamp, 
            nombre, 
            descripcion,
            codigo, 
            foto, 
            precio, 
            stock
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