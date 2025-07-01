import React from 'react';
import './About.css';

// ❄️ React.memo بيمنع إعادة الريندر لو الـ props ما اتغيرتش
const About = React.memo(() => {
  return (
    <main className="about-container">
      <h2>About Us</h2>

      <section className="about-intro">
        <p>
          Welcome to <strong>Rambo</strong> – your ultimate destination for top-quality products, unbeatable deals, and a smooth shopping experience.
        </p>
      </section>

      <section className="about-section">
        <h3>Who We Are</h3>
        <p>
          Rambo is an e-commerce platform created with the mission of bringing you the best shopping experience from the comfort of your home. We offer a wide variety of products and are committed to customer satisfaction.
        </p>
      </section>

      <section className="about-section">
        <h3>Our Vision</h3>
        <p>
          To become the leading online store in the region, known for quality, reliability, and outstanding service.
        </p>
      </section>

      <section className="about-section">
        <h3>Why Choose Us?</h3>
        <ul>
          <li>Fast and reliable delivery</li>
          <li>Affordable prices</li>
          <li>Secure payment methods</li>
          <li>Excellent customer support</li>
        </ul>
      </section>
    </main>
  );
});

export default About;
