import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./CustomerLogin.css"; // Style file

const CustomerLogin = () => {
  const [customer, setCustomer] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  // Handle login form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/customers/login", customer);

      if (res.data.success) {
        // Store token securely
        localStorage.setItem("customerToken", res.data.token);
        
        // Redirect to product list
        navigate("/productlist");
      } else {
        setError("Invalid email or password. Try again.");
        setCustomer({ ...customer, password: "" }); // Clear password field
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An error occurred. Please try again.");
      setCustomer({ ...customer, password: "" }); // Clear password field
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="customer-login-container">
      <h2>Customer Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={customer.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={customer.password}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default CustomerLogin;
