'use strict'

const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SaleSchema = new Schema({
    date_sale: {type: Date, default: Date.now},
    book: String,
    quantity: Number,
    price: Number,
    note: String
});

module.exports = mongoose.model('Sale', SaleSchema)