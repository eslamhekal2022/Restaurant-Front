import React from 'react'
import mainImage from "../ProductsUmages/Main-image.jpg"
import './mainHome.css'

export default function MainHome() {
  return (
    <div className='MainHome'>
      <img src={mainImage} alt="Main banner" />
    </div>
  )
}