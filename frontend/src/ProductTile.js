import React, {useEffect, useState } from 'react';
import './ProductTile.css';
import axios from 'axios';

export default function ProductTile({ product_id,image, description, price, quantityAvailable, onAddToBasket }) {
  const [selectedQty, setSelectedQty] = useState(1);
  const [error, setError] = useState('');
  // Need to define react hook for error because the react should rerender the screen when the error needs to be displayed
  // on the screen. React only tracks a change in state and props. It will not know if a normal variable's value is changed.
  const [availableQuantity, setAvailableQty] = useState(quantityAvailable);


  const handleAddClick = () => {
    if (selectedQty > availableQuantity) {
      setError('Out of Stock');
    } else {
      setError('');
      onAddToBasket({
        product_id,
        image,
        description,
        price,
        quantity: selectedQty
      });
      setAvailableQty(prev => prev-selectedQty);
    }
  };

  return (
    <div className="product-tile">
      <img
        src={image}
        alt="Product"
        className="product-image"
        style={{ width: "10rem", height: "10rem", margin: "20px" }}
      />
      <div className="product-info">
        <p className="product-description">{description}</p>
        <p className="product-price">Rs {price}/-</p>

        <div className='product-actions'>
          <input
            type="number"
            min="1"
            value={selectedQty}
            onChange={(e) => setSelectedQty(Number(e.target.value))}
            style={{ width: '60px', marginRight: '5px' }}
          />
          <button onClick={handleAddClick}>Add</button>
          {error && <p style={{ color: 'red', fontSize: '12px' }}>{error}</p>}
        </div>
      </div>
    </div>
  );
}