// import React, { useState } from "react";
// import axios from "axios";
// import { useCart } from "../../context/CartContext.jsx";
// import "./Payment.css";

// const Payment = () => {
//   const { cart, clearCart } = useCart();
//   const [name, setName] = useState("");
//   const [cardNumber, setCardNumber] = useState("");
//   const [expiry, setExpiry] = useState("");
//   const [cvv, setCvv] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);

//   const handlePayment = async (e) => {
//     e.preventDefault();

//     if (!name || !cardNumber || !expiry || !cvv) {
//       alert("Please fill in all payment details.");
//       return;
//     }

//     setLoading(true);

//     try {
//       // Prepare payload (Note: Never send sensitive card details to your own server in production)
//       const paymentPayload = {
//         name,
//         cardNumber,
//         expiry,
//         cvv,
//         totalAmount,
//         // Additional order details can be added here
//       };

//       // Call backend payment endpoint (simulate payment processing)
//       const response = await axios.post("http://localhost:5000/api/payments", paymentPayload);
      
//       if (response.data.success) {
//         setSuccessMessage("Payment Successful! Thank you for shopping.");
//         clearCart();
//         // Reset form fields
//         setName("");
//         setCardNumber("");
//         setExpiry("");
//         setCvv("");
//       } else {
//         setSuccessMessage("Payment failed. Please try again.");
//       }
//     } catch (error) {
//       console.error("Payment error:", error);
//       setSuccessMessage("An error occurred. Please try again.");
//     }
    
//     setLoading(false);
//   };

//   return (
//     <div className="payment-container">
//       <h2>Checkout</h2>
//       {cart.length === 0 ? (
//         <p>Your cart is now empty. Add items before proceeding to payment.</p>
//       ) : (
//         <>
//           <h3>Total Amount: ₹{totalAmount.toFixed(2)}</h3>
//           <form onSubmit={handlePayment} className="payment-form">
//             <input
//               type="text"
//               placeholder="Cardholder Name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//             />
//             <input
//               type="text"
//               placeholder="Card Number"
//               value={cardNumber}
//               onChange={(e) => setCardNumber(e.target.value)}
//               maxLength="16"
//               required
//             />
//             <input
//               type="text"
//               placeholder="Expiry (MM/YY)"
//               value={expiry}
//               onChange={(e) => setExpiry(e.target.value)}
//               required
//             />
//             <input
//               type="password"
//               placeholder="CVV"
//               value={cvv}
//               onChange={(e) => setCvv(e.target.value)}
//               maxLength="3"
//               required
//             />
//             <button type="submit" className="pay-btn" disabled={loading}>
//               {loading ? "Processing..." : "Pay Now"}
//             </button>
//           </form>
//           {successMessage && <p className="success-message">{successMessage}</p>}
//         </>
//       )}
//     </div>
//   );
// };

// export default Payment;
import React, { useState } from "react";
import axios from "axios";
import { useCart } from "../../context/CartContext.jsx";
import { CheckCircle } from "lucide-react"; // ✅ nice modern icon
import "./Payment.css";

const Payment = () => {
  const { cart, clearCart } = useCart();
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [success, setSuccess] = useState(false); // ✅ track success
  const [loading, setLoading] = useState(false);
  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!name || !cardNumber || !expiry || !cvv) {
      alert("Please fill in all payment details.");
      return;
    }

    setLoading(true);

    try {
      const paymentPayload = {
        name,
        cardNumber,
        expiry,
        cvv,
        totalAmount,
      };

      // Simulate payment API call
      const response = await axios.post(
        "http://localhost:5000/api/payments",
        paymentPayload
      );

      if (response.data.success) {
        setSuccess(true); // ✅ show success screen
        clearCart();
        setName("");
        setCardNumber("");
        setExpiry("");
        setCvv("");
      } else {
        alert("Payment failed. Please try again.");
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("An error occurred. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="payment-container">
      <h2>Checkout</h2>

      {/* ✅ Show Success Screen */}
      {success ? (
        <div className="flex flex-col items-center justify-center min-h-[300px] text-center p-6">
          <CheckCircle className="w-20 h-20 text-green-500 animate-bounce" />
          <h2 className="text-2xl font-bold mt-4 text-green-600">
            Order Placed Successfully!
          </h2>
          <p className="text-gray-600 mt-2">
            🎉 Thank you for shopping with us. Your product has been ordered and will be delivered soon.
          </p>
          <div className="mt-6 flex gap-4">
            <button
              onClick={() => (window.location.href = "/orders")}
              className="px-6 py-2 rounded-2xl bg-green-600 text-white font-semibold shadow-lg hover:bg-green-700 transition"
            >
              View Orders
            </button>
            <button
              onClick={() => (window.location.href = "/")}
              className="px-6 py-2 rounded-2xl bg-gray-200 text-gray-800 font-semibold shadow-md hover:bg-gray-300 transition"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      ) : cart.length === 0 ? (
        <p>Your cart is now empty. Add items before proceeding to payment.</p>
      ) : (
        <>
          <h3>Total Amount: ₹{totalAmount.toFixed(2)}</h3>
          <form onSubmit={handlePayment} className="payment-form">
            <input
              type="text"
              placeholder="Cardholder Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Card Number"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              maxLength="16"
              required
            />
            <input
              type="text"
              placeholder="Expiry (MM/YY)"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="CVV"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              maxLength="3"
              required
            />
            <button type="submit" className="pay-btn" disabled={loading}>
              {loading ? "Processing..." : "Pay Now"}
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default Payment;
