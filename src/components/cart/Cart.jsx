import React from 'react';
import './Cart.css'

const Cart = ({cart}) => {
    let quantity = 0;
    let toatlPrice =0;
    let toatlTax =0;
    
    for(const product of cart){
    //    if(product.quantity===0){
    //     product.quantity =1
    //    }
       quantity= quantity + product.quantity
       toatlPrice = toatlPrice + product.price * product.quantity
       toatlTax = toatlPrice/100 *7

    }
    return (
        <div className='cart'>
            <h4>Order Summary</h4>
            <p>Selected Items:{quantity} </p>
            <p>Price: $ {toatlPrice}</p>
            <p>Total Tax: {toatlTax.toFixed(2)}</p>
            <h4>Grand Total: {(toatlPrice+ toatlTax).toFixed(2)}</h4>

        </div>
    );
};

export default Cart;