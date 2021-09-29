import { newProductoI, ProductoBaseClass, ProductoI, ProductoQuery } from "../producto.interface";
import moment from 'moment';

let productos:ProductoI[] = [];
const fecha =  moment().format(); 
export class ProductoMemoria implements ProductoBaseClass {

    constructor(){
        productos =  [
            { _id: '1', nombre: 'lapiz', precio: 200, descripcion: 'descripcion', timestamp: new Date(fecha), codigo: 123, foto: 'urlFoto1', stock: 15 },
            { _id: '2', nombre: 'cartuchera', precio: 250, descripcion: 'descripcion', timestamp: new Date(fecha), codigo: 123, foto: 'urlFoto1', stock: 15 },
            { _id: '3', nombre: 'boligoma', precio: 260, descripcion: 'descripcion', timestamp: new Date(fecha), codigo: 123, foto: 'urlFoto1', stock: 15 }
          ];
    }

    async get(id?: string): Promise<ProductoI[]> {  
        if(id) {
            const result = productos.filter(p => p._id == id);
            return result;
        } else {
            return productos;
        }
    }

    async add(data: newProductoI): Promise<ProductoI> {
        const newItem: ProductoI = {
        _id: (productos.length + 1).toString(),
        nombre: data.nombre,
        precio: data.precio,
        descripcion: data.descripcion, 
        codigo: data.codigo, 
        foto: data.foto, 
        stock: data.stock, 
        timestamp: new Date(fecha)
      };
  
      productos.push(newItem);
      return newItem;
    }

    async update(id: string, newProducData: newProductoI): Promise<ProductoI> {

        const indexProd = productos.findIndex(p => p._id.toString() === id);
        productos[indexProd].timestamp = new Date(fecha);
        productos[indexProd].nombre = newProducData.nombre;
        productos[indexProd].descripcion = newProducData.descripcion;
        productos[indexProd].codigo = newProducData.codigo;
        productos[indexProd].foto = newProducData.foto;
        productos[indexProd].precio = newProducData.precio;
        productos[indexProd].stock = newProducData.stock;

        return productos[indexProd];
    }

    async delete(id: string): Promise<void> {
        const index = productos.findIndex((p) => p._id == id);
        productos.splice(index, 1);
    }

    async query(option: ProductoQuery): Promise<ProductoI[]> {
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

}