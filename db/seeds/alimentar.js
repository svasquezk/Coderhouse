exports.seed = 
function (knex) {
  const initCategories = 
  [
    { nombre: 'computadoras' },
    { nombre: 'articulos libreria' },
    { nombre: 'camisetas' },
  ];

const initProducts = [{
    // id: 1,
    nombre: 'cartuchera',
    descripcion: 'Linda Cartuchera',
    stock: 20,precio: '10.5',
    category_id: 2,
  },
  {// id: 3,
    nombre: 'pendrive',
    descripcion: 'pendrive 32gb',
    stock: 20,precio: '99.4',
    category_id: 1,
  },
];

return knex('productos')
  .del()
  .then(() => knex('categorias').del())
  .then(() => knex('categorias').insert(initCategories))
  .then(() => knex('productos').insert(initProducts));
};