import React, {useState, useEffect} from "react";
import axios from "axios";
import Global from "../Global";
import Book from "../components/Book";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Books = () => {
    
    const [books, setBooks] = useState([]);
    const [tableBooks, setTableBooks] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const url = Global.url;
    const [show, setShow] = useState(false);


    useEffect(() =>{
        getBooks();
        console.log(books);

    }, [show]);

    //Obtener todos los libros
    const getBooks = async() =>{
        await axios.get(url + 'getBooks').then(res =>{
            setBooks(res.data.books);
            setTableBooks(res.data.books);
            setShow(true);
        })
    }

    const filtrar =(terminoBusqueda)=>{
        var resultadosBusqueda = tableBooks.filter((elemento)=>{
            if(elemento.author.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
                elemento.year_publication.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
            ){
                console.log(elemento);
                return elemento;
            };
        });

        setBooks(resultadosBusqueda);
    }

    //Eliminar libro por su ID
    const deleteBook = (id) => {
        const idBook = books[id]._id;
        axios.delete(url + 'delete/' + idBook).then(res =>{
            getBooks();
        })
    }

    const handleChange=e=>{
        setBusqueda(e.target.value);
        filtrar(e.target.value);
    }

    return (    

        <div className="publicaciones">
            <h1 className="mt-5">Librería Urabá</h1>
            <div className="container mt-3">
                <div className="containerInput">
                    <input
                        className="form-control inputBuscar"
                        value={busqueda}
                        placeholder="Busqueda por autor o año de publicación"
                        onChange={handleChange}
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
                    show ? (
                        <table className='table table-sm table-bordered'>
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