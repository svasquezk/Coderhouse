import { newProductoI, ProductoBaseClass, ProductoI } from "../producto.interface";
import { DBService } from "../../../services/DB";


let productos:ProductoI[] = [];
const tablaProducto = 'productos';

export class ProductoSQL implements ProductoBaseClass {

    constructor() {}

    async get(id?: string): Promise<ProductoI[]> {
        productos = await DBService.get(tablaProducto, Number(id));
        return productos;
    }

    async add(data: newProductoI): Promise<ProductoI> {
         // Guarda el registro nuevo
        const result = await DBService.create(tablaProducto, data);
        return <ProductoI>data;
       
    }

    async update(id: string, newProducData: newProductoI): Promise<ProductoI> {
        productos = DBService.update(tablaProducto,  Number(id), newProducData);  
        
        const newProd: ProductoI = {
            _id: id,
            codigo: newProducData.codigo,
            descripcion: newProducData.descripcion,
            foto: newProducData.foto, 
            nombre: newProducData.nombre,
            precio: newProducData.precio,
            stock: newProducData.stock,
            timestamp: newProducData.timestamp
        }
        return newProd;
    }

    async delete(id: string): Promise<void> {
       DBService.delete(tablaProducto,  Number(id));     
    }

    async query(option: ProductoI): Promise<ProductoI[]> {
        throw new Error("Method not implemented.");
    }

    async find(id: number) {
        productos = await DBService.get(tablaProducto,id);
        return productos
    }

}