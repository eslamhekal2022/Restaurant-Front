import React from 'react'

import CategoryProduct from '../CategoryProduct/CategoryProduct.jsx'
import HeroSection from '../Banner/HeroSec.jsx'
import ReviewUsers from '../ReviewUsers/ReviewUsers.jsx'
import MainHome from '../MainHome/MainHome.jsx'

export default function Home() {
  return (
    <div>  
<MainHome/>
<CategoryProduct/>
<ReviewUsers/>
    </div>
  )
}
