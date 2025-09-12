import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./CustomerSignup.css"; // Style file
import { Link } from "react-router-dom";

const CustomerSignup = () => {
  const [customer, setCustomer] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/customers/signup", customer);
      if (res.data.success) {
        alert("Signup successful! Redirecting...");
        navigate("/productlist"); // Redirect after signup
      } else {
        setError(res.data.message || "Signup failed. Please try again.");
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="customer-signup-container">
      <h2>Customer Signup</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="signup-form">
        <input type="text" name="name" placeholder="Full Name" value={customer.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email Address" value={customer.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={customer.password} onChange={handleChange} required />
        <button type="submit">Signup</button>
        <Link to="/customerlogin" className="login-link">Login</Link>

      </form>
    </div>
  );
};

export default CustomerSignup;
