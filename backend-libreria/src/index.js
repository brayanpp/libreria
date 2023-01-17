'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const cors = require('cors');

const port = 3900;

var url = 'mongodb://localhost:27017/api_rest_libreria';

mongoose.Promise = global.promise;
var book_routes = require('./routes/bookRoutes');

//Cargamos body-parser, middleware para analizar datos a través de la URL
app.use(bodyParser.urlencoded({ extended: false }));

//Convertir peticiones a JSON
app.use(bodyParser.json());

app.use(cors());

app.listen(port, () => {
    console.log("Server ON port: " + port );
});