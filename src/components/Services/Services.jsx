import React from "react";
import "./Services.css"; // Ensure you have a CSS file for styling

const Services = () => {
  const services = [
    { id: 1, title: "Fast Delivery", description: "Get your products delivered within 24 hours." },
    { id: 2, title: "24/7 Support", description: "Our team is available 24/7 to assist you." },
    { id: 3, title: "Secure Payment", description: "Your payments are safe and secure with us." },
    { id: 4, title: "Easy Returns", description: "Hassle-free returns within 30 days of purchase." },
    { id: 5, title: "Best Deals", description: "Exclusive discounts and offers for our customers." },
    { id: 6, title: "Quality Assurance", description: "We ensure top-notch quality products for you." }
  ];

  return (
    <section className="services">
      <h2>Our Services</h2>
      <p>We are committed to providing the best online shopping experience for our customers.</p>
      <div className="service-list">
        {services.map((service) => (
          <div key={service.id} className="service-item">
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
  