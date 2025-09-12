import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext.jsx";
import "./Cart.css";

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  return (
    <div className="cart-container">
      <h2 className="cart-title">Shopping Cart</h2>
      {cart.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <div className="cart-content">
          <ul className="cart-items">
            {cart.map((item) => (
              <li key={item.id} className="cart-item">
                <img src={`http://localhost:5000${item.image}`} alt={item.name} className="cart-image" />
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p className="item-price">Price: ₹{item.price}</p>
                  <p className="item-quantity">Quantity: {item.quantity}</p>
                </div>
                <button className="remove-btn" onClick={() => removeFromCart(item.id)}> Remove </button>
              </li>
            ))}
          </ul>
          <div className="cart-actions">
            <button className="clear-cart-btn" onClick={clearCart}>
              Clear Cart
            </button>
            <Link to="/payment" className="payment-link">
              Payment Details
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
