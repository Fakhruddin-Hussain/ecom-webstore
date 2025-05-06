import React, { useState } from "react";
import './App.css';
import AddProduct from "./AddProduct";
import ProductList from "./ProductList";
import Basket from "./Basket";

export default function MyApp() {
  const [basket, setBasket] = useState([]);



  const handleAddToBasket = (item) => {
    // Check if product already exists
    const existing = basket.find(b => b.product_id === item.product_id);
    if (existing) {
      setBasket(basket.map(b =>
        b.product_id === item.product_id
          ? { ...b, quantity: b.quantity + item.quantity }
          : b
      ));
    } else {
      setBasket([...basket, item]);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Welcome to my first Webstore</h1>
      <section>
        <h2>Products</h2>
        <ProductList onAddToBasket={handleAddToBasket}/>
      </section>

      <section>
        <h2>Basket</h2>
        <Basket items={basket}/>
      </section>

      <section>
        <h2>Add a New Product</h2>
        <AddProduct/>
      </section>

    </div>
  );
}