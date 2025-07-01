import React, { useEffect, useState } from 'react';
import axios from "axios";
import { toast } from 'react-toastify';
import './GetFilterCat.css';
import { Link } from 'react-router-dom';
import { useHandleAddToCart } from '../../utilits/handleAddCart';

export default function GetFilterCat({ category }) {
  const [data, setdata] = useState([]);
    const { handleAddToCart } = useHandleAddToCart();

  async function getBYCategory() {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/getProductsCat/${category}`);
    
      if (data.success) {
        setdata(data.data);
        console.log("dataFilterCat", data.data);
      }

} catch (error) {
  toast.error("An error occurred while fetching the data.");
    console.error("Error fetching products:", error);
  }

  }

  useEffect(() => {
    if (category) {
      getBYCategory();
    }
  }, [category]);

  return (
    <div className='GetProductsCat'>
      <div className="ContainerGetProductsCat">
        {data?.map((x, i) => (
            <div className='productFilterCat'>
                     <Link to={`/ProductDet/${x._id}`} className='LinkProductDet' id='Link' key={x._id}>

            <img
                src={`${process.env.REACT_APP_API_URL}${x.images[0]}`}
                alt={x.name}
                className="product-image"
              />
                        </Link>

              <p>{x.name}</p>
              <p title={x.description}>{x.description.slice(0, 40)}...</p>
       <div className="product-sizes">
  {x.sizes.map((size, idx) => (
    <p key={idx} className="product-price">
      {size.size.toUpperCase()} : {size.price} EGP
    </p>
  ))}
            <button className="add-to-cart-btn" onClick={() => handleAddToCart(x)}>Add To Cart 🛒</button>

</div>            </div>
        ))}
      </div>
    </div>
  );
}
