import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import Global from '../Global';
import Sale from '../components/Sales';
import swal from 'sweetalert2';

const NewSale = ()=>{

    const url = Global.url;

    const [books, setBooks] = useState([]);
    const [sales, setSales] = useState([]);     
   
    const [selectedBook, setSelectedBook] = useState(null);
    const [idBook, setIdBook] = useState(null);
    const [quantityV, setQuantity] = useState(null);
    const [priceV, setPrice] = useState(null);
    const [noteV, setNote] = useState(null);
    const [stock, setStock] = useState(0);
    
    useEffect(()=>{
        getBooks();  
        getSales(); 
    },[]);

    const [redirect, setRedirect] = useState(false);
    const deleteSale=(id)=>{

    }
    const alert = (icon, message)=>{
        console.log(icon, message);
        swal.fire({
            position: 'top-end',
            icon: icon,
            title: message,
            showConfirmButton: false,
            timer: 1500
        });
    }

    
    const sendSale = async(e)=>{
        e.preventDefault();

        if(idBook !=null && idBook !=""){
            const stock = await getStock();
            if(stock >= quantityV){
                const sale = ({
                    book: selectedBook,
                    quantity: quantityV,
                    price: priceV,
                    note: noteV,
                    data_sale: null
                });

                await axios.post(`${url}sale/save`, sale).then((res) =>{});
                updateStock(stock-quantityV);
                alert("success","Venta registrada");
                resetInputs();
                getSales();
            }else{
                alert("info", "Stock insuficiente");
            }
        }else{
            alert("error","Selecciona un libro");
        }
    }

    const getSales = async() =>{
        await axios.get(url + 'getSales').then(res =>{
            setSales(res.data.sales);
        })
    }

    const getBooks = () =>{
        axios.get(url + 'getBooks').then(res =>{
            setBooks(res.data.books);
        })
    }

    const updateStock=(stock)=>{
        axios.post(`${url}updateStock`, {'id': idBook, 'stock': stock}).then((res)=>{ });
    }

    const getStock = async() => {
        try{
           const res = await axios.get(url + 'getStock/'+ idBook);
           return res.data.stock.stock;
           /*await axios.get(url + 'getStock/'+ idBook).then(res=>{
                console.log(res.data.stock.stock);
                return res.data.stock.stock;
            });*/
        }catch(error){
            console.log("Error: " + error);
            return 0;
        }
    }

    const resetInputs=()=>{
        setSelectedBook("Seleccione un libro");
        setQuantity('');
        setPrice('');
        setNote('Seleccione un metodo de pago');
    }

    const asignarValoresLibro =(e)=>{
        setSelectedBook(e.target.options[e.target.selectedIndex].text);
        setIdBook(e.target.value);
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
                            <select className='form-control' onChange={asignarValoresLibro}>
                                <option value="">Seleccione un libro</option>
                                {
                                    books.map((book, i)=>{
                                        return (
                                            <option  key={i} value={book._id}>{book.title}</option>
                                        )
                                    })
                                }
                            </select>
                            </div>
                            <div className='mb-3'>
                                <label>Cantidad</label>
                                <input className='form-control' id="quantity" value={quantityV} name="quantity" placeholder="Cantidad" onChange={(e) => setQuantity(e.target.value)} type="number" required/>
                            </div>
                            
                            <div className='mb-3'>
                                <label>Precio</label>
                                <input className='form-control' placeholder='Valor total' value={priceV} onChange={(e) => setPrice(e.target.value)} type="text"/>
                            </div>

                            <div className='mb-3'>
                                <label>Metodo de pago</label>
                                <select className='form-control' on onChange={(e) => setNote(e.target.value)}>
                                    <option value="">Seleccione un metodo de pago</option>
                                    <option value="Efectivo">Efectivo</option>
                                    <option value="TD">Tarjeta debido</option>
                                    <option value="TC">Tarjeta Credito</option>
                                </select>
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
                                    <th>Metodo de pago</th>
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