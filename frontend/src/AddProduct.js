import React, { useState } from 'react';
import axios from 'axios';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    product_id: '',
    image: '',
    description: '',
    price: '',
    quantity: ''
  });

  // const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ 
      ...formData,
      [e.target.name]: e.target.value 
    });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   axios.post('http://localhost:5002/api/products', formData)
  //     .then(() => {
  //       alert('Product Added successfully')
  //       // navigate('/');  // Redirect back to product list after adding
  //     })
  //     .catch(err => {
  //       console.error("Error adding product:", err);
  //     });
  // };

  // rewritten with async await
  const handleSubmit= async (e)=>{
    e.preventDefault();
    try{
      await axios.post("http://localhost:5002/api/products",formData, {headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}});
      alert('Product Added Successfully');
    }catch(err){
      console.error("Error Adding Product: ",err)
    }
  };



  return (
    <div style={{ padding: '20px' }}>
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Product ID:</label><br />
          <input type="text" name="product_id" value={formData.product_id} onChange={handleChange} required />
        </div>
        <div>
          <label>Image URL:</label><br />
          <input type="text" name="image" value={formData.image} onChange={handleChange} required />
        </div>
        <div>
          <label>Description:</label><br />
          <input type="text" name="description" value={formData.description} onChange={handleChange} required />
        </div>
        <div>
          <label>Price:</label><br />
          <input type="number" name="price" value={formData.price} onChange={handleChange} required />
        </div>
        <div>
          <label>Quantity:</label><br />
          <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} required />
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;