import knex from 'knex';
import dbConfig from '../../knexfile';
import { Productos } from '../persistencia/SQL/productos';

class DB {
  constructor() {
  }

  sqLiteDB: any;
  mySqlDB: any;


  init() {
    // Conexion
    this.sqLiteDB = knex({
      client: 'sqlite3',
      connection: { filename: './mydb.sqlite' }
    });

    this.mySqlDB = knex({
      client: 'mysql',
      connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'prueba'
      },
      pool: { min: 0, max: 7 }
    });

    // Se crea la tabla Mensaje
    this.sqLiteDB.schema.hasTable('mensajes').then((exists: any) => {
      if(!exists) {
        this.sqLiteDB.schema.createTable(
            'mensajes',
            (mensaje: { increments: () => void; string: (arg0: string) => { (): any; new(): any; notNullable: { (): void; new(): any; }; }; }) => {
              mensaje.increments();
              mensaje.string('mensaje').notNullable();
            }
          );         
      }
    }); 

    // Se crea la tabla producto
    this.mySqlDB.schema.hasTable('productos').then((exists: any) => {
      if(!exists) {
        this.mySqlDB.schema.createTable('productos',
          (productosTable: { increments: (arg0: string) => void; string: (arg0: string) => { (): any; new(): any; notNullable: { (): void; new(): any; }; }; integer: (arg0: string) => { (): any; new(): any; notNullable: { (): void; new(): any; }; unsigned: { (): { (): any; new(): any; references: { (arg0: string): { (): any; new(): any; inTable: { (arg0: string): void; new(): any; }; }; new(): any; }; }; new(): any; }; }; decimal: (arg0: string, arg1: number, arg2: number) => void; timestamp: (arg0: string) => { (): any; new(): any; defaultTo: { (arg0: any): void; new(): any; }; }; }) => {
            productosTable.increments('_id');
            productosTable.string('nombre').notNullable();
            productosTable.string('descripcion').notNullable();
            productosTable.integer('codigo').notNullable();
            productosTable.integer('stock').notNullable();
            productosTable.decimal('precio', 4, 2);
            productosTable.string('foto').notNullable();
            productosTable.timestamp('createdAt').defaultTo(this.mySqlDB.fn.now());

            productosTable
              .integer('category_id')
              .unsigned()
              .references('_id')
              .inTable('categorias');
          })
          .then(() => { console.log('Se creo');});
      }
    });
  }

  obtieneTabla(tableName: string) {
    return this.mySqlDB.from(tableName);
  }

  
  // Obtiene datos
  get(tableName: string, id: number) {
    const tabla = this.obtieneTabla(tableName)

    if(id > 0 ) {
      return tabla.where({id: id})
            .then((row:any) =>{ return row} )
    }

    return tabla.select()
    .then((row:any) =>{ return row} )
  }

  async create(tableName:string, data: any) {
    const table = this.obtieneTabla(tableName)

    table.insert(data).then(() => { console.log('Productos agregados');});
  
    return table.max('_id').then((row:any) =>{ return row } )
  }

  update(tableName:string, id: number, data:any) {
    const table = this.obtieneTabla(tableName)
    .where({ id: id })
    .update(data)

    return table;
  }

  delete(tableName:string, id: number) {
    try {
      const table = this.obtieneTabla(tableName)
      table.where({ id: id}).del()
                    .then(() => { console.log('Productos Eliminados');})
      return true;
    } catch (error) {
      return false;
    }
  }
}

export const DBService = new DB();
