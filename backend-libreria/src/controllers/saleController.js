'use strict'

var Sale = require('../models/saleModel');

var SaleController = {
    
    save: (req, res) =>{
        var params = req.body;
        var sale = new Sale();

        sale.book = params.book;
        sale.quantity = params.quantity;
        sale.note = params.note;
        sale.price = params.price;

        sale.save((err, saleStored)=>{
            if(err || !saleStored){
                return res.status(404).send({
                    status: 'error',
                    message: 'Sale not found'
                })
            }

            return res.status(200).send({
                status:'success',
                saleStored
            });
        });
    },

    getSales: (req, res) => {
        var query = Sale.find({});
        
        query.sort('-date').exec((err, sales) => {
            if(err){
                return res.status(500).send({
                    status: 'error',
                    message: 'Error cargando las ventas'
                });
            }

            if(!sales){
                return res.status(404).send({
                    status: 'error',
                    message: 'No hay ventas disponibles'
                });
            }

            return res.status(200).send({
                status: 'success',
                sales
            })
        });
    },

}

module.exports= SaleController;