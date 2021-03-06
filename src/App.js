import React, { useEffect, useState } from 'react';
import {commerce} from './lib/commerce';
import {Navbar, Products} from './components';
const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const fetchProducts = async () => {
    const {data} = await commerce.products.list();
    setProducts(data);
  }
  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  }
  const handleAddToCart = async (productId, quantity) => {
    const {cart} = await commerce.cart.add(productId,quantity);
    setCart(cart);
  }
  useEffect(() => {
    fetchProducts();
    fetchCart();
  },[]);
  console.log(cart);
  return (
    <div>
        <Navbar totalItems={cart.total_items} />
        <Products products={products} onAddToCart={handleAddToCart} />
    </div>
  );
};

export default App;
