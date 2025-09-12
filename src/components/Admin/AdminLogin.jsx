import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css"; // Add your CSS file

const AdminLogin = () => {
  const [admin, setAdmin] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous errors

   try {
  const res = await axios.post("http://localhost:5000/admin/login", admin);
  console.log("Backend response:", res.data); // Debugging line
  if (res.data.success) {
    localStorage.setItem("adminToken", res.data.token);
    navigate("/admindashboard");
  } else {
    setError(res.data.message || "Invalid email or password");
  }
} catch (err) {
  console.error("Login error:", err.response?.data || err.message);
  setError("An error occurred. Please try again.");
}

  };

  return (
    <div className="admin-login-container">
      <h2>Admin Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="login-form">
        <input type="email" name="email" placeholder="Admin Email" value={admin.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={admin.password} onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
// import React, { useState } from "react";
// import axios from "axios";

// const AdminLogin = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://localhost:5000/admin/login", {
//         email,
//         password,
//       });
//       alert("✅ " + res.data.message);
//       console.log("Admin info:", res.data.admin);
//     } catch (err) {
//       setError("❌ Invalid email or password");
//     }
//   };

//   return (
//     <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
//       <h2>Admin Login</h2>
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       <form onSubmit={handleLogin}>
//         <input
//           type="email"
//           placeholder="Admin Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         /><br /><br />
//         <input
//           type="password"
//           placeholder="Admin Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         /><br /><br />
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

// export default AdminLogin;
