// App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import AddProduct from "./AddProduct";
import ProductList from "./ProductList";
import Basket from "./Basket";

export default function MyApp() {
  const [basket, setBasket] = useState([]);

  const handleAddToBasket = (item) => {
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
    <Router>
      <div style={{ padding: '20px' }}>
        <nav style={{ marginBottom: '20px' }}>
          <Link to="/" style={{ marginRight: '15px' }}>Home</Link>
          <Link to="/dashboard">Dashboard</Link>
        </nav>

        <Routes>
          <Route path="/" element={
            <>
              <h1>Welcome to my first Webstore</h1>
              <section>
                <h2>Products</h2>
                <ProductList onAddToBasket={handleAddToBasket} />
              </section>
              <section>
                <h2>Basket</h2>
                <Basket items={basket} />
              </section>
            </>
          } />

          <Route path="/dashboard" element={
            <div>
              <h1>Dashboard</h1>
              <AddProduct />
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}