// App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import AddProduct from "./AddProduct";
import ProductList from "./ProductList";
import Basket from "./Basket";
import Login from "./login";
import Register from './Register';
import GetRoleFromToken from './GetRoleFromToken';

// import {GetRoleFromToken} from './GetRoleFromToken'; struggled a lot with this if you have export default than this will not work, it will only work if you have export default statement in the last



export default function MyApp() {
  const [basket, setBasket] = useState([]);
  const role_decoded = GetRoleFromToken();
  const [role, setRole] = useState(role_decoded);

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

  if (!role){
    return <Login onLogin={(userRole)=> setRole(userRole)}    />
  }


  return (
    <Router>
      <div style={{ padding: '20px' }}>
        <nav style={{ marginBottom: '20px' }}>
          <Link to="/" style={{ marginRight: '15px' }}>Home</Link>
          <Link to="/dashboard" style={{ marginRight: '15px' }}>Dashboard</Link>
          <Link to="/register">Register</Link>
        </nav>

        <Routes>
          <Route path="/register" element={<Register/>} > </Route>
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
            role=== 'admin' ?(
              <div>
                <h1>Dashboard</h1>
                <AddProduct/>
              </div>
            ) : (<h2>Access Denial: Only Admin can view this page</h2>)
          } />
        </Routes>
      </div>
    </Router>
  );
}