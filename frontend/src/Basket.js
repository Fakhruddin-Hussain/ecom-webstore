import React from 'react';

export default function Basket({ items }) {
  const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div style={{ borderTop: '2px solid #ccc', paddingTop: '20px' }}>
      {items.length === 0 ? <p>No items in basket.</p> : (
        <div>
          {items.map((item, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <img src={item.image} alt="Item" style={{ width: '40px', height: '40px', marginRight: '10px' }} />
              <div>
                <p>{item.description}</p>
                <p>{item.quantity} pcs × ₹{item.price} = ₹{item.price * item.quantity}</p>
              </div>
            </div>
          ))}
          <h3>Total: ₹{totalAmount}</h3>
        </div>
      )}
    </div>
  );
}