import React, { useEffect, useState } from 'react'
import GetFilterCat from '../GetFilterCat/GetFilterCat.jsx'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

export default function GetCategories() {
    const {id}=useParams()
const [dataProduct, setdataProduct] = useState([])
    async function getCategoriesFilter(){
        const {data}=await axios.get(`${process.env.REACT_APP_API_URL}/productDetails/${id}`)
        setdataProduct(data.data)
        if(data.success){
            toast.success("goodCat")
            console.log("dataProduct",data.data)
        }
    }
    useEffect(()=>{
        getCategoriesFilter()
    },[])
    return (
        <div className='GetCategories'>
          {dataProduct?.category && (
            <GetFilterCat category={dataProduct.category} />
          )}
        </div>
      );
}
