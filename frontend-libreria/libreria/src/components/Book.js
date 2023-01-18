import React from 'react';

const Book = ({id, bookData, delBook}) => {
    
    const {title, date, year_publication, author, stock} = bookData;

    const formatDate = (date) => {
        return date.substring(8,10) + date.substring(4,8) + date.substring(0,4); 
    }

    const del = () => {
        delBook(id);
    }

    return (
       /* <div className='col'>
            <div className='card mx-auto mb-3'>
                <div className='card-header'>
                    <h3 className='card-title'>{title}</h3>    
                </div>
                <div className='card-body'>
                        <ul className='list-group list-group-flush'>
                            <li className='list-pub list-group-item'>Año de publicación: {year_publication}</li>
                            <li className='list-pub list-group-item'>Autor: {author} </li>
                            <li className='list-pub list-group-item'>Existencias: {stock} </li>
                            <li className='list-pub list-group-item'>Fecha sistema: { formatDate(date) } </li> 
                        </ul>
                </div>
                <div className='card-footer'>
                    <button className='btn btn-danger btn-sm' type="button" onClick={del}>Eliminar</button>
                </div>
            </div>

           
        </div> */
        <>
        <tr>
            <td>{title}</td>
            <td>{year_publication}</td>
            <td>{stock}</td>
            <td>{author}</td>
            <td>{formatDate(date)}</td>
        </tr>
            
            
        </>
        
    );
}

export default Book;