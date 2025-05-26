import axios from 'axios';
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
export default function OrderDet() {

    
    const {id}=useParams()

   async function getOrderDet(){
        const {data}=await axios.get(`${process.env.REACT_APP_API_URL}/OrderDet/${id}`)
      
    }
    useEffect(()=>{
        getOrderDet()
    },[])
  return (
    <div className='OrderDet'></div>
  )
}
