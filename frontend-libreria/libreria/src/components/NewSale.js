import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import Global from '../Global';
import Sale from '../components/Sales';

const NewSale = ()=>{

    const url = Global.url;

    const [books, setBooks] = useState([]);
    const [sales, setSales] = useState([]);     
    const [sale, setSale] = useState({
        book: null,
        quantity: null,
        price: null,
        note: null
    });
    const [selectedBook, setSelectedBook] = useState(null);
    const [quantityV, setQuantity] = useState(null);
    const [priceV, setPrice] = useState(null);
    const [noteV, setNote] = useState(null);

    useEffect(()=>{
        getBooks();  
        getSales(); 
    },[]);

    const [redirect, setRedirect] = useState(false);
    const deleteSale=(id)=>{

    }

    const getBooks = () =>{
        axios.get(url + 'getBooks').then(res =>{
            setBooks(res.data.books);
        })
    }

    const getSales = () =>{
        axios.get(url + 'getSales').then(res =>{
            setSales(res.data.sales);
        })
    }

    const changeState = ()=> {
       
    }

    const sendSale = async(e)=>{
        setSale({
            book: selectedBook,
            quantity: quantityV,
            price: priceV,
            note: noteV
        });
        e.preventDefault();
        console.log(sale);
        await axios.post(`${url}sale/save`, sale).then((res) =>{
            console.log(res.data);
        })
        getBooks();
    }

    return (
        <div className='new-sale'>
            <div className='card mx-auto mb-3 mt-5' style={{width: '30em'}}>
                <div className='card-header text-dark'>
                    <h4>Registrar venta</h4>
                </div>
                <div className='card-body'>
                    <form onSubmit={sendSale}>
                        <div className='mb-3'>
                            <label className='mb-3'>Libro a vender</label>
                            <br/>
                            <div className='mb-3'>
                            <select className='form-control' onChange={(e) => setSelectedBook(e.target.value)}>
                                <option value="">Seleccione un libro</option>
                                {
                                    books.map((book, i)=>{
                                        return (
                                            <option  key={i} value={book.title}>{book.title}</option>
                                        )
                                    })
                                }
                            </select>
                            </div>
                            <div className='mb-3'>
                                <label>Cantidad</label>
                                <input className='form-control' id="quantity" name="quantity" placeholder="Cantidad" onChange={(e) => setQuantity(e.target.value)} type="number" required/>
                            </div>
                            
                            <div className='mb-3'>
                                <label>Precio</label>
                                <input className='form-control' placeholder='Valor total' onChange={(e) => setPrice(e.target.value)} type="text"/>
                            </div>

                            <div className='mb-3'>
                                <label>Nota</label>
                                <input className='form-control' placeholder='detalles de venta' onChange={(e) => setNote(e.target.value)} type="text"/>
                            </div>
                                    
                            <div>
                                <input type="submit" value="Registrar" id="save" className='form-control btn btn-success'/>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <br/>
            <div className='container mb-5'>
            <h4>Historico ventas</h4>
            {
                   sales.length > 0 ? (
                        <table className='table table-sm table-bordered'>
                            <thead className="thead-dark">
                                <tr>
                                    <th>Id</th>
                                    <th>Libro</th>
                                    <th>Cantidad</th>
                                    <th>Precio</th>
                                    <th>Nota</th>
                                    <th>Fecha venta</th>
                                </tr>
                                
                            </thead>
                        <tbody>
                           
                                {
                                    sales.map((book, i) =>{
                                        return (
                                            <Sale
                                                key={i}
                                                id={i+1}
                                                saleData={book}
                                                delSale={deleteSale}
                                            />
                                        )
                                    })
                                }
                        </tbody>
                    </table>
                    ): (
                        <h3 className="mx-auto">No se han encontrado ventas para mostrar.</h3>
                    )
                }
                </div>
        </div>
        
    );
}

export default NewSale