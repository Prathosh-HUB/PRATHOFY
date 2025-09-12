import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../../context/CartContext.jsx"; 
import "./ProductList.css"; 

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart(); 

  useEffect(() => {
    axios.get("http://localhost:5000/products")
      .then(response => setProducts(response.data))
      .catch(error => console.error("Error fetching products:", error));
  }, []);

  return (
    <div className="product-list">
      <h2 className="title">Our Products</h2>
      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
         <img src={`http://localhost:5000${product.image}`} alt={product.name} className="product-image" />

            <div className="product-info">
              <h3>{product.name}</h3>
              <p className="price">₹{product.price}</p>
              <button className="add-to-cart" onClick={() => addToCart(product)}>
                Add to Cart 🛒
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
