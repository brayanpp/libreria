import React, { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import Global from '../Global';

const New = () => {

    const url = Global.url;
    const [book, setBook] = useState({
      title: null,
      year_publication: null,
      stock: null,
      author: null
    });

    const [redirect, setRedirect] = useState(false);

    //Referencias de los datos del formulario: 
    let titleRef = React.createRef();
    let yearRef = React.createRef();
    let stockRef = React.createRef();
    let authorRef = React.createRef();

    //Evento onChange para asignar valores
    const changeState = () => {
        setBook({
            title: titleRef.current.value,
            year_publication: yearRef.current.value,
            stock: stockRef.current.value,
            author: authorRef.current.value
        })
    }

    const sendBook = (e) =>{
        //Evitar que se recargue la pantalla
        e.preventDefault();

        changeState();

        //Petición HTTP por POST para guardar libro.
        axios.post(`${url}save`, book).then((res) =>{
            setRedirect(true);
            console.log(res.data);
        })
    }

    if(redirect){
        return <Navigate to="books" />;
    }

    return(
        <div className="new-book">
            <div id="form" className="card mx-auto mb-3 mt-5" style={{width: '30em'}}>
                <div className="card-header text-dark">
                    <h4>Publicar un nuevo libro</h4>
                </div>

                <div className="card-body">
                    <form onSubmit={sendBook}>
                        <div className="mb-3">
                            <label>Titulo</label>
                            <input type="text" className="form-control" id="title" name="title" placeholder="Titulo" ref={titleRef} onChange={changeState} required/>
                        </div>
                        <div className="mb-3">
                            <label>Año publicación</label>
                            <input type="number" maxLength={4} minLength={4} className="form-control" id="year_publication" name="year_publication" placeholder="2023" ref={yearRef} onChange={changeState} required/>
                        </div>
                        <div className="mb-3">
                            <label>Existencias</label>
                            <input type="number" className="form-control" id="stock" name="stock" placeholder="Stock" ref={stockRef} onChange={changeState} required/>
                        </div>
                        <div className="mb-3">
                            <label>Autor</label>
                            <input type="text" className="form-control" id="author" name="author" placeholder="Autor" ref={authorRef} onChange={changeState} required />
                        </div>
                        <div className="mb-3">
                            <input className="form-control btn btn-primary" type="submit" id="publish" value="Publicar"/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default New;