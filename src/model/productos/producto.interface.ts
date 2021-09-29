export interface newProductoI {
    timestamp: Date;
    nombre: string;
    descripcion: string;
    codigo: number;
    foto: string;
    precio: number;
    stock: number;
}

export interface ProductoI {
    _id: string;
    timestamp: Date;
    nombre: string;
    descripcion: string;
    codigo: number;
    foto: string;
    precio: number;
    stock: number;
}

export interface ProductoQuery {
    nombre?: string;
    codigo?: number;
    precio?: number;
    stock?: number;
}

export interface ProductoBaseClass {
    get(id?: string | undefined): Promise<ProductoI[]>;
    add(data: newProductoI): Promise<ProductoI>;
    update(id: string, newProducData: newProductoI): Promise<ProductoI>;
    delete(id: string): Promise<void>;
    query(option: ProductoI): Promise<ProductoI[]>;
}