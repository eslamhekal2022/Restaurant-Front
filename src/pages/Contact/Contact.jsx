import React from "react";
import "./contact.css";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Contact = () => {
  return (
    <div className="contact-container">
      <h2 className="contact-title">Contact Us</h2>

      <div className="contact-info">
        <div className="info-box">
          <FaMapMarkerAlt className="icon" />
          <p>19 El-Motamad Wali St, Nasr City, Cairo, Egypt</p>
        </div>
        <div className="info-box">
          <FaPhone className="icon" />
          <p>+20 123 456 7890</p>
        </div>
        <div className="info-box">
          <FaEnvelope className="icon" />
          <p>info@restaurant.com</p>
        </div>
      </div>

      <div className="map-container">
        <iframe
          title="restaurant-location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3451.9068500068447!2d31.2896214!3d30.096854!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583fdc2174230f%3A0x43fe91736b95f532!2zMTkgRW10ZWRhZCBXYWxpIEFsIEFoZCwg2KfZhNiy2YrYqtmI2YYg2KfZhNmC2KjZhNmK2KnYjCDYp9mE2KPZhdmK2LHZitip2Iwg2YXYrdin2YHYuNipINin2YTZgtin2YfYsdip4oCsIDQ1MTEwMDM!5e0!3m2!1sar!2seg!4v1751146650392!5m2!1sar!2seg"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      <div className="social-media">
        <a href="https://facebook.com" target="_blank" rel="noreferrer">
          <FaFacebook />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noreferrer">
          <FaInstagram />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noreferrer">
          <FaTwitter />
        </a>
      </div>

      <form className="contact-form">
        <input type="text" placeholder="Your Name" required />
        <input type="email" placeholder="Your Email" required />
        <textarea placeholder="Your Message" rows="4" required />
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default Contact;
