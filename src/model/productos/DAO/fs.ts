import moment from 'moment';
import { newProductoI, ProductoBaseClass, ProductoI, ProductoQuery } from '../producto.interface';
import fs from 'fs';

let productos:ProductoI[] = [];
const fecha =  moment().format(); 

export class ProductoFSystemDAO implements ProductoBaseClass {
    private pathArchivo: string;

    constructor(pathArchivo: string) {
        this.pathArchivo = pathArchivo;
    }

    async get(id?: string): Promise<ProductoI[]> {
        productos = await this.obtieneDataProd();       
        if(id) {
            const result = productos.filter(p => p._id == id);
            return result;
        } else {
            return productos;
        }
        
    }

    async add(data: newProductoI): Promise<ProductoI> {
        let newProdAdd: ProductoI;
        // Guarda el registro nuevo
        newProdAdd = await this.guardar(data.nombre, data.descripcion, data.codigo, data.foto,  data.precio, data.stock);
        return newProdAdd;
    }

    async update(id: string, newProducData: newProductoI): Promise<ProductoI> {
        const lProductosUp:ProductoI[] = await this.obtieneDataProd();          

        const indexProd = lProductosUp.findIndex(p => p._id.toString() === id);
        lProductosUp[indexProd].timestamp = new Date(fecha);
        lProductosUp[indexProd].nombre = newProducData.nombre;
        lProductosUp[indexProd].descripcion = newProducData.descripcion;
        lProductosUp[indexProd].codigo = newProducData.codigo;
        lProductosUp[indexProd].foto = newProducData.foto;
        lProductosUp[indexProd].precio = newProducData.precio;
        lProductosUp[indexProd].stock = newProducData.stock;

        // Actualiza registros
        await this.updateFS(lProductosUp);

        // Retorna reg. actualizado
        const updateProd= lProductosUp[indexProd];
        return updateProd;
    }
    
    async delete(id: string): Promise<void> {
       productos = await this.obtieneDataProd();       
       const lProd = productos.filter(p => p._id != id);
       await this.eliminaFS(lProd);
    }

    async query(option: ProductoQuery): Promise<ProductoI[]> {
        productos = await this.obtieneDataProd();
        type Conditions = (aProduct: ProductoI) => boolean;
        const query: Conditions[] = [];

        if (option.nombre)
        query.push((aProduct: ProductoI) => aProduct.nombre == option.nombre);

        if (option.precio)
        query.push((aProduct: ProductoI) => aProduct.precio == option.precio);

        if (option.codigo)
        query.push((aProduct: ProductoI) => aProduct.codigo == option.codigo);

        if (option.stock)
        query.push((aProduct: ProductoI) => aProduct.stock == option.stock);

        return productos.filter((aProduct) => query.every((x) => x(aProduct)));
    }


    /// Lógica FS
    obtieneDataProd = async () => {
        try {
            // Valida que exista la carpeta
            await this.validaCarpetaYArchivo();
    
            // lee el archivo (lee los registros guardados)
            const reg = fs.readFileSync(this.pathArchivo, 'utf-8');
            const JsonProd = JSON.parse(reg);
            return JsonProd;
        } catch (error) {
            console.log('Error al leer Archivo, ', error);
        }
    }

    validaCarpetaYArchivo = async () => {
        const path = './';
        const carpeta = './carpetaArchivo';
    
        const data = fs.readdirSync(path);
    
        //Valida si existe la carpeta y archivo producto
        if(!data.includes('fsData')) {
            // Crear la carpeta y el archivo producto.txt
             fs.mkdirSync(carpeta);
             fs.writeFileSync(this.pathArchivo, JSON.stringify([], null, '\t'));
        } else {   
            const archivo = fs.readdirSync(carpeta);
            if(!archivo.includes('producto.txt')){
                // crear producto.txt
                fs.writeFileSync(this.pathArchivo, JSON.stringify([], null, '\t'));
            } else {
                return;
            }
        }
    }
    
    // Ingresa registros a archivo txt
    guardar = async( nombre: string, descripcion: string,
                     codigo: number, foto: string, precio: number, stock:number) => {
        let reg: ProductoI[] =  [];
        try {
            // Lee los registros ingresados
            const data = await this.obtieneDataProd();;
            // Si los reg. existen suma 
            if(data) {
                reg.push(...data);
            }

            const nuevoProd: ProductoI = {
                _id:  (reg.length + 1).toString(),
                timestamp: new Date(fecha), 
                nombre, 
                descripcion,
                codigo, 
                foto, 
                precio, 
                stock
            }
    
            reg.push(nuevoProd);
    
            // Escribe la data
            fs.writeFileSync(this.pathArchivo, JSON.stringify(reg, null, '\t'));
    
            // Retrorna el registro ingresado
            return nuevoProd; 
        } catch (error) {
            console.log('Error en archivo guardar', error);
            const nuevoProd: ProductoI = {
                _id:  '0',
                timestamp: new Date(fecha), 
                nombre: '-', 
                descripcion: '-',
                codigo: 0, 
                foto: '-', 
                precio: 0, 
                stock: 0
            }
            return nuevoProd;
        }
    }
    
    eliminaFS = async(data: any[]) => {
        try {
            fs.writeFileSync(this.pathArchivo, JSON.stringify(data, null, '\t'));
        } catch (error) {
            
        }
    }
    
    updateFS = async(data: any[]) => {
        try {
            fs.writeFileSync(this.pathArchivo, JSON.stringify(data, null, '\t'));
        } catch (error) {
         console.log('Error al actualizar registro');   
        }
    }

}