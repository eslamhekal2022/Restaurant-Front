// import React, { useState } from 'react'


// export default function Training() {
//     const [Clicked, setClicked] = useState(false)
//   return (
//     <div className='Training'>
//     <h1>Welcome to My MERN App</h1>
//     <button onClick={()=>setClicked(true)}>Click Me</button>
//     {Clicked?<p>Button clicked!</p>:null}
//     </div>
//   )
// }
import React, { useEffect, useState } from 'react'
import axios from "axios";
import { toast } from 'react-toastify';

export default function Training() {
const [dataEntry, setdataEntry] = useState({
 name: "",
})
const [AllData, setAllData] = useState([])
function handleChange (e) { 
    setdataEntry({...dataEntry,[e.target.name]:e.target.value})
 }

// async function handleSubmit(){

//     const formdata=new FormData()
//     formdata.append("name",dataEntry.name)
// const {data}=await axios.post("http://localhost:5000/postData",formdata)
// if(data.success){
//     toast.success("good-Data-Send")
// }
//  }
// <form  onSubmit={handleSubmit}>
    // <input type="text" placeholder='Product-Name' name='name' onChange={handleSubmit}/>
    // </form>

async function getData(){
 const {data}=await axios.get("http://localhost:5000/postData")
 setAllData(data.data)
 }
 useEffect(()=>{
    getData()
 },[])

async function deleteProduct(id){
    const [data]=await axios.delete(`http://localhost:5000/deleteProduct/${id}`)
if(data.success){
    toast.success("deleteKosOMk")
    setdataEntry(prev=>prev.filter(item=>item._id!==id))
}
}
    return (
    <div className='training'>
    {AllData.map((x,i)=>{
        <div key={i}>
        {x.name}
        <button onClick={()=>deleteProduct(x._id)}>deleteProduct</button>
        </div>
    })}
    </div>
  )
}
