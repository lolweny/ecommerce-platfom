import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [products, setProducts] = useState([]);

  // Fetch products from the backend when the component mounts
  useEffect(() => {
    axios.get('http://localhost:3001/api/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  // Function to handle adding products to the cart
  const addToCart = (productId) => {
    const token = localStorage.getItem('token'); // Assuming you store JWT token in localStorage after login
    if (!token) {
      alert('You must be logged in to add products to your cart');
      return;
    }
    
    axios.post('http://localhost:3001/api/cart', 
      {
        productId,
        quantity: 1, // Default quantity is 1
      },
      {
        headers: {
          'Authorization': `Bearer ${token}`, // Pass the JWT token in the request headers
        },
      }
    )
    .then(() => {
      alert('Product added to cart');
    })
    .catch(error => {
      console.error('Error adding product to cart:', error);
      alert('Error adding product to cart');
    });
  };

  return (
    <div>
      <h1>Welcome to the E-commerce Platform</h1>
      <h2>Featured Products</h2>
      <div>
        {products.length > 0 ? (
          products.map(product => (
            <div key={product.id}>
              <h3>{product.name}</h3>
              <p>Price: ${product.price}</p>
              <button onClick={() => addToCart(product.id)}>Add to Cart</button>
            </div>
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  );
};

export default Home;

