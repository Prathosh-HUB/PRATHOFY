import React from "react";
import "./About.css"; // Import CSS file

const About = () => {
  return (
    <div className="about-container">
      <div className="about-banner">
        <h1>About Us</h1>
      </div>

      <div className="about-content">
        <div className="about-text">
          <h2>Who We Are</h2>
          <p>
            Welcome to <strong>E-Shop</strong>, your go-to destination for top-quality products at unbeatable prices.
            We strive to provide the best online shopping experience by offering a wide range of products, fast shipping, and exceptional customer service.
          </p>
        </div>

        <div className="about-text">
          <h2>Our Mission</h2>
          <p>
            Our mission is to make shopping easy, enjoyable, and affordable for everyone. We believe in delivering value without compromising on quality.
          </p>
        </div>

        <div className="about-text">
          <h2>Why Choose Us?</h2>
          <ul>
            <li>✔ High-Quality Products</li>
            <li>✔ Secure Payment & Fast Delivery</li>
            <li>✔ 24/7 Customer Support</li>
            <li>✔ Easy Returns & Refunds</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
