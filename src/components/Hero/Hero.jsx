import "./Hero.css";
import { Link } from "react-router-dom";
import "./Hero.css";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Discover the Best Deals</h1>
        <p>Shop the latest trends at unbeatable prices.</p>
        <Link to="/customer" className="btn">Shop Now</Link>
      </div>
    </section>
  );
};

export default Hero;
