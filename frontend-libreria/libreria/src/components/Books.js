import React, {useState, useEffect} from "react";
import axios from "axios";
import Global from "../Global";
import Book from "../components/Book";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Books = () => {
    
    const [books, setBooks] = useState([]);
    const [tableBooks, setTableBooks] = useState([]);
    const [busqueda, setBusqueda] = useState([]);
    const url = Global.url;
    

    useEffect(() =>{
        getBooks();
        console.log(books);

    }, [books.length]);

    //Obtener todos los libros
    const getBooks = () =>{
        axios.get(url + 'getBooks').then(res =>{
            setBooks(res.data.books);
            setTableBooks(res.data.books);
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
                <div>
                    <input
                        className="form-control inputBuscar"
                        value={busqueda}
                        placeholder="Busqueda por autor o año de publicación"
                    />

                    <button className="btn btn-success">
                        <FontAwesomeIcon icon={faSearch}/>
                    </button>
                </div>
               {/* <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4">
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
                </div> */}
                {
                    books.length > 0 ? (
                        <table className='table'>
                            <thead className="thead-dark">
                                <tr>
                                    <th>Titulo</th>
                                    <th>Año de publicación</th>
                                    <th>Existencias</th>
                                    <th>Autor</th>
                                    <th>Fecha ingreso</th>
                                </tr>
                                
                            </thead>
                        <tbody>
                           
                                {
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
                                }
                        </tbody>
                    </table>
                    ): (
                        <h3 className="mx-auto">No se han encontrado libros para mostrar.</h3>
                    )
                }
                

            </div>
        </div>

    );
}

export default Books