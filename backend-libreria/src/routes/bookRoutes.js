'use strict'

var express = require('express');
var Book = require('../controllers/bookController');

//Objeto router de express

var router = express.Router();

//Rutas de libros

router.post('/save', Book.save);
router.get('/getBooks', Book.getBooks);
router.delete('/delete/:id', Book.delete);


module.exports = router;