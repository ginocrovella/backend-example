const express = require('express');
const { Router } = express;
const router = Router();

const ProductosApi = require('../api/productos.js');
const newProduct = new ProductosApi('../productos.txt');

////////////////////////////////////////////////////////////////////////////

router.get('/', (req, res) => {
    res.send('hola')
});

router.get('/api/productos', (req, res) => {
    res.send('productos')
});

router.post('/api/productos', (req, res) => {
    newProduct.save();
})

////////////////////////////////////////////////////////////////////////////

module.exports = router;