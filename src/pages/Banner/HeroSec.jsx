import React from 'react';
import './Banner.css';
import { Link } from 'react-router-dom';
import LapTop from "./OIP_10.jpeg"
const HeroSection = () => {
  return (
    <header className="hero">
     
<div className='LayoutHero'>
<img src={LapTop} alt="" />
</div>
      <div className="hero-content">
      
        <h2>Discover the latest offers</h2>
        <p>  Shop now and get special discounts on our products!        </p>
       <Link to={"/allProducts"}>
       <button className="cta-button">    Shop now    </button>
       </Link> 
      </div>
    </header>
  );
};

export default HeroSection;
