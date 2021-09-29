import { NoticiasFactoryDAO, TipoPersistencia } from "../model/productos/producto.factory";
import { newProductoI, ProductoI, ProductoQuery } from "../model/productos/producto.interface";

const tipoPers = TipoPersistencia.FileSystem;

class ProductoAPI {
    private productos;

    constructor() {   
        this.productos = NoticiasFactoryDAO.get(tipoPers)
    }

    async getProductos(id: string | undefined = undefined) : Promise<ProductoI[]> {
        if(id){
            return this.productos.get(id);
        } else{
            return this.productos.get();
        }   
    }

    async addProducto(productoData: newProductoI): Promise<ProductoI> {
        const newProduct = await this.productos.add(productoData);
        return newProduct;
    }

    async updateProduct(id: string, productoData: newProductoI) {
        const updatedProduct = await this.productos.update(id, productoData);
        return updatedProduct;
    }

    async deleteProduct(id:string) {
        await this.productos.delete(id);
    }

    async query(option: ProductoQuery){ 
       return await this.productos.query(option);
    }
}

export const prodAPI = new ProductoAPI();