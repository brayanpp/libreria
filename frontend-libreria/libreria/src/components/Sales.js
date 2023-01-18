import React from 'react';

const Sale = ({id, saleData, delSale}) =>{
    const {book, date_sale, note, price, quantity} = saleData;

    const formatDate = (date) => {
        return date.substring(8,10) + date.substring(4,8) + date.substring(0,4); 
    }

    const del = () => {
        delSale(id);
    }

    return (
        <tr>
            <td>{id}</td>
            <td>{book}</td>
            <td>{quantity}</td>
            <td>{price}</td>
            <td>{note}</td>
            <td>{formatDate(date_sale)}</td>
        </tr>
    );
}

export default Sale;
 