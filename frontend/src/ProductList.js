import React, { useEffect, useState } from 'react';
import ProductTile from './ProductTile';

export default function ProductList({ onAddToBasket }) {

    const [products, setProducts] = useState([]);

    // useEffect(() => {
    //     fetch('http://localhost:5002/api/products')
    //         .then(response => {
    //             if (!response.ok) {
    //                 throw new Error('Failed to fetch products');
    //             }
    //             return response.json();
    //         })
    //         .then(data => {
    //             setProducts(data);
    //         })
    //         .catch(error => {
    //             console.error('Error:', error);
    //         });
    // }, []);


    // rewritten using async await
    useEffect(()=> {(async () => {
      try {
        const response = await fetch('http://localhost:5002/api/products');
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();
        setProducts(data);
        console.log(data);
      } catch (error) {
        console.error('Error', error)
      }
    })();},[])
    // first passed the async function diretly as a parameter but could not do it, so wrapped it inside a function

    return (
        <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '20px',
            marginTop: '30px'
        }}>
            {products.length > 0 ? (
                products.map((product, index) => (
                    <ProductTile
                        key={index}
                        product_id={product.product_id}
                        image={product.image}
                        description={product.description}
                        price={product.price}
                        quantityAvailable={product.quantity}
                        onAddToBasket={onAddToBasket}
                    />
                ))
            ) : (
                <p>No products available.</p>
            )}
        </div>
    );
}