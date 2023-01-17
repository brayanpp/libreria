'use strict'

const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookSchema = new Schema({
    title: String,
    year_publication: Number,
    stock: Number,
    date: {type: Date, default: Date.now},
    author: String
});

module.exports = mongoose.model('Book', BookSchema);