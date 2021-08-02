const express = require('express');
const producto = require('./producto')

const puerto = 8080;
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = app.listen(puerto, () => 
    console.log('Server Up en puerto', puerto)
);

server.on('error', (err) => {
    console.log('Error => ', err);
})

// Lista los array de productos
app.get('/api/productos/listar', (req, res) => {
    producto.obtieneProductos()
            .then((resp) => {
                if(!resp) {
                    res.json({
                        error: 'no hay productos cargados'
                    });
                }
                res.json({
                    data: resp
                });
            }).catch(() => {
                res.json({
                    msj: 'Error al obtener registros'
                })
            }) 
        
});

// Obtiene productos por id
app.get('/api/productos/listar/:id', (req, res) => {
    const idProd = Number( req.params.id);

    producto.obtieneProductoxID(idProd)
    .then((respProd) => {
        if(!respProd) {
            res.json({
                error : 'producto no encontrado'
            })
        }
        res.json({
            resp : respProd
        });
    }).catch(() => {
        res.json({
            msj: 'Error al obtener registros'
        })
    }) 
})

// Guarda un nuevo producto
app.post('/api/productos/guardar', (req, res) => {
    const prod =  req.body;
    producto.guardaProducto(prod).then((result) => 
    { 
        res.json({
            id: result.id,
            title: result.title,
            price: result.price,
            thumbnail: result.thumbnail
        });
    }).catch(() => {
        res.json({
            msj: 'Error al ingresar nuevo registro'
        })
    }) 

   
})
