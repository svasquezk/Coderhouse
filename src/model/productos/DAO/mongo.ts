import { newProductoI, ProductoBaseClass, ProductoI, ProductoQuery } from "../producto.interface";
import mongoose from "mongoose";


const Config = {
    PORT: process.env.PORT || 8080,
    MONGO_ATLAS_USER: process.env.MONGO_ATLAS_USER || 'user',
    MONGO_ATLAS_PASSWORD: process.env.MONGO_ATLAS_PASSWORD || 'pasw',
    MONGO_ATLAS_CLUSTER: process.env.MONGO_ATLAS_CLUSTER || 'clusterUrl',
    MONGO_ATLAS_DBNAME: process.env.MONGO_ATLAS_DBNAME || 'dbName',
    MONGO_LOCAL_DBNAME: process.env.MONGO_LOCAL_DBNAME || 'dbNameLocal',
  };
  
  const productoSchema  = new mongoose.Schema<ProductoI>({
    timestamp: {type: Date},
    nombre: {type: String, required: true},
    descripcion: {type: String, required: true},
    codigo: {type: Number, required: true},
    foto: {type: String, required: true},
    precio: {type: Number, required: true},
    stock: {type: Number, required: true}
   });


export class ProductoMongo implements ProductoBaseClass {

    private srv: string;
    private producto;

    constructor(local: boolean = false){
        if (local){
            this.srv = `mongodb://localhost:27017/${Config.MONGO_LOCAL_DBNAME}`;
        } else{
            this.srv = `mongodb+srv://${Config.MONGO_ATLAS_USER}:${Config.MONGO_ATLAS_PASSWORD}@${Config.MONGO_ATLAS_CLUSTER}/${Config.MONGO_ATLAS_DBNAME}?retryWrites=true&w=majority`;
        }
        mongoose.connect(this.srv);
        this.producto = mongoose.model<ProductoI>('producto', productoSchema);
     }

    async get(id?: string): Promise<ProductoI[]> {
        if(id !== '') {
            const respuesta = await this.producto.find({_id: id});
            return respuesta;
        }
        const respuesta = this.producto.find({})
        return respuesta;
    }

    async add(data: newProductoI): Promise<ProductoI> {
        // Guarda el registro nuevo
        const newProduct = new this.producto(data);
        await newProduct.save();
        return newProduct;
    }

    async update(id: string, newProducData: newProductoI): Promise<ProductoI> {
        return this.producto.findByIdAndUpdate(id, newProducData);
    }

    async delete(id: string): Promise<void> {
        const result = await this.producto.deleteOne({_id: id});
    }

    async query(option: ProductoQuery): Promise<ProductoI[]> {
        let query: ProductoQuery = {};

        if (option.nombre) query.nombre = option.nombre;
        if (option.precio) query.precio = option.precio;
        if (option.codigo) query.codigo = option.codigo;
        if (option.stock) query.stock   = option.stock;
    
        return this.producto.find(query);
    }
}