import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext.jsx";
import Home from "./components/Home/Home.jsx"; 
import ProductList from "./components/ProductList/ProductList";
import Cart from "./components/Cart/Cart.jsx"; 
import Payment from "./components/Payment/Payment.jsx";
import Admin from "./components/Admin/Admin.jsx"
import Header from "./components/Header/Header";
// import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Services from "./components/Services/Services";
import Footer from "./components/Footer/Footer";
import CustomerSignup from "./components/CustomerSignup/CustomerSignup.jsx";
import CustomerLogin from "./components/CustomerSignup/CustomerLogin.jsx";
import AdminLogin from "./components/Admin/AdminLogin.jsx";


function App() {
  return (
    <CartProvider>
      <Router>
        <Header />
        {/* <Hero /> */}
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/productlist" element={<ProductList />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/admindashboard" element={<Admin />} />
          <Route path="/customer" element={<CustomerSignup />} />
          <Route path="/customerlogin" element={<CustomerLogin/>}/>
       
        </Routes>
        <Footer />
      </Router>
      </CartProvider>
   
  );
}

export default App;
