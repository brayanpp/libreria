import React, {useState, useEffect} from "react";
import axios from "axios";
import Global from "../Global";
import Book from "../components/Book";

const Books = () => {
    
    const [books, setBooks] = useState([]);
    const url = Global.url;

    useEffect(() =>{
        getBooks();
        console.log(books);

    }, [books.length]);

    //Obtener todos los libros
    const getBooks = () =>{
        axios.get(url + 'getBooks').then(res =>{
            setBooks(res.data.books);
        })
    }

    //Eliminar libro por su ID
    const deleteBook = (id) => {
        const idBook = books[id]._id;
        axios.delete(url + 'delete/' + idBook).then(res =>{
            getBooks();
        })
    }

    return (

        <div className="publicaciones">
            <h1 className="mt-5">Librería Urabá</h1>
            <div className="container mt-3">

                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4">
                    {
                        books.length > 0 ? (
                            books.map((book, i) =>{
                                return (
                                    <Book
                                        key={i}
                                        id={i}
                                        bookData={book}
                                        delBook={deleteBook}
                                    />
                                )
                            })
                        ):(
                            <h3 className="mx-auto">No se han encontrado libros para mostrar.</h3>
                        )
                    }
                </div>

            </div>
        </div>

    );
}

export default Books