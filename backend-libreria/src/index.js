'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');

const cors = require('cors');

const port = 3900;

var url = 'mongodb://localhost:27017/api_rest_libreria';

mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

var book_routes = require('./routes/bookRoutes');

app.use('/api', book_routes);
mongoose.set('strictQuery', false);
mongoose.connect(url, {useNewUrlParser: true}).then(() =>{
    console.log('Connected to:  ' + url);

    app.listen(port, () => {
        console.log("Server ON port: " + port );
    });
});