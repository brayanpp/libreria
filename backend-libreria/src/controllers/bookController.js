'use strict'

var Book = require('../models/bookModel');

//Objeto para disponer los metodos de ruta:

var bookController = {

    //Metodo guardar libro:

    save: (req, res) =>{
        var params = req.body;

        var book = new Book();

        //Asginación de valores:
        book.title = params.title;
        book.author = params.author;
        book.year_publication = params.year_publication;
        book.stock = params.stock;

        //Guardar valores

        book.save(err, bookStored =>{
            if(err || !bookStored){
                return res.status(404).send({
                    status: 'error',
                    message: 'El libro no se ha guardado'
                })
            }

            return res.status(200).send({
                status: 'success',
                bookStored
            });
        });
    },


    //Listar libros
    getBooks: (req, res) => {
        var query = Book.find({});

        query.sort('-title').exec((err, books) => {
            if(err){
                return res.status(500).send({
                    status: 'error',
                    message: 'Error cargando los libros'
                });
            }

            if(!books){
                return res.status(404).send({
                    status: 'error',
                    message: 'No hay libros disponibles'
                });
            }

            return res.status(200).send({
                status: 'success',
                books
            })
        });
    },

    //Eliminar libros

    delete: (req, res)=>{
        //Obtener ID del libro por URL
        var bookId = req.params.bookId;

        Book.findOneAndDelete({_id: bookId}, (err, bookRemoved)=>{

            if(err){
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al eliminar el libro'
                });
            }

            if(!bookRemoved){
                return res.status(404).send({
                    status: 'error',
                    message: 'No se ha encontrado el libro a eliminar'
                })
            }

            return res.status(200).send({
                status:'success',
                bookRemoved
            });
        });
    }
}

module.exports = bookController;