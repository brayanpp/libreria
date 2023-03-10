'use strict'

var express = require('express');
var Book = require('../controllers/bookController');
var Sale = require('../controllers/saleController');
//Objeto router de express

var router = express.Router();

//Rutas de libros

router.post('/save', Book.save);
router.get('/getBooks', Book.getBooks);
router.delete('/delete/:id', Book.delete);
router.post('/updateStock', Book.update);

router.post('/sale/save', Sale.save);
router.get('/getSales', Sale.getSales);
router.get('/getStock/:id', Book.getStock);

module.exports = router;