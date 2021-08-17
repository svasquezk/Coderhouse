const express = require('express');
const router = express.Router();
const producto = require('../producto')


// Lista los array de productos
router.get('/listar', (req, res) => {
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
router.get('/listar/:id', (req, res) => {
    const idProd = Number(req.params.id);

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
    }).catch((m) => { 
        res.json({
            msj: 'Error al obtener registros'
        })
    }) 
})

// Guarda un nuevo producto
router.post('/guardar', (req, res) => {
    const prod =  req.body;
 
    producto.guardaProducto(prod).then((result) => 
    { 
        console.log('AQUI');
        // Se redirecciona a la API Vista
        res.redirect('/api/productos/vista');
        // res.json({
        //     id: result.id,
        //     title: result.title,
        //     price: result.price,
        //     thumbnail: result.thumbnail
        // });

    }).catch(() => {
        res.json({
            msj: 'Error al ingresar nuevo registro'
        })
    }) 

   
})

// Actualiza producto x id (retorna prod. actualizado)
router.put('/actualizar/:id', async(req, res) => {
    const id = Number(req.params.id);
    const title = req.body.title; 
    const price = req.body.price; 
    const thumbnail = req.body.thumbnail; 
 
    const result = await producto.actualizaProducto(id, title, price, thumbnail)
    if(result) {
        res.status(200).json({
            data: result
        })
    }else {
        res.status(400).json({
            data: 'Error al actualizar regustro'
        })
    }
})

// Elimina producto x id (retorna prod. eliminado)
router.delete('/borrar/:id', async(req, res) => {
    const id = Number(req.params.id);
    const result = await producto.eliminaProducto(id);
    if(result) {
        res.status(200).json({
            data: result
        })
    }else {
        res.status(400).json({
            data: 'Error al actualizar regustro'
        })
    }
})


// config página principal de handlerbar
router.get('/vista', async(req, res) => {
    console.log('*************************');
    const lprod = await  producto.obtieneProductos();
    if(!lprod) {
        const listaProd = {
            tieneProd : false,
        }
        res.render('main', listaProd); 
    } else {
        const listaProd = {
            tieneProd : true,
            lprod
        }
        res.render('main', listaProd); 
    }
    
})





module.exports = router;