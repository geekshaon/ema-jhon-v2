import React, { useEffect, useState } from 'react';
import Product from '../Product/Product';
import './Shop.css';
import Cart from '../cart/Cart';
import { addToDb, getShoppingCart } from '../../utilities/fakedb';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([])

    useEffect(() => {
        fetch('products.json')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, []);

    useEffect(()=>{
        const storedCart = getShoppingCart();
        const savedCart =[]
        for(const id in storedCart){
            const addedProduct = products.find(product=> product.id===id)
           if(addedProduct){
            const quantity = storedCart[id]
            addedProduct.quantity = quantity
            savedCart.push(addedProduct)
           }
        }
        setCart(savedCart)
        console.log('local cart', savedCart)
    },[products])

    const handleAddToCart = (product) => {
        // cart.push(product); 
        //if the product does not exit in cart then set quantity 1
        //if the product is exist then update quantity by 1
        let newCart = [];
        const exist = cart.find(pd=>pd.id===product.id)
        if(!exist){
            product.quantity=1
            newCart =[...newCart, product]
        }
        else{
            product.quantity = product.quantity + 1
            const remain = cart.filter(pd=> pd.id!== product.id)
            newCart = [...remain , product]
        }
        addToDb(product.id);
        setCart(newCart);
    }

    return (
        <div className='shop-container'>
            <div className="products-container">
                {
                    products.map(product => <Product
                        key={product.id}
                        product={product}
                        handleAddToCart={handleAddToCart}
                    ></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;