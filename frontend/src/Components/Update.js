import React,{useEffect, useState} from 'react'
import {useParams,useNavigate} from 'react-router-dom'

function Update() {
    let [name,setName]=useState("");
    let [price,setPrice]=useState("");
    let [category,setCategory] = useState("");
    let [company,setCompany]= useState("");
    const params = useParams();
    let navigate = useNavigate();
    useEffect(()=>{
        console.log(params)
        productdetails();
    },[])
  
   
    async function productdetails(){
        let result = await fetch(`http://localhost:4500/products/${params.id}`);
        result = await result.json()
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);
        console.log(name,price,category,company);
    }
    async function updateProduct(){
   
      console.log(name,price,category,company);
      let result = await fetch(`http://localhost:4500/products/${params.id}`,{
        method:'put',
        body:JSON.stringify({name,price,category,company}),
        headers:{'Content-Type':"application/json"}
      })
      result = await result.json();
      console.log(result);
      navigate('/');
    }
    return (
      <>
      <div className='product'>
     
        <h2>Update Product</h2>
        
      <input type="text" className='input-product' placeholder='Enter Name' value={name}  onChange={(e)=>setName(e.target.value)}/>
  
      <input type="text" className='input-product' placeholder='Enter Price' value={price} onChange={(e)=>setPrice(e.target.value)}/>
  
      <input type="text" className='input-product' placeholder='Enter Category' required value={category} onChange={(e)=>setCategory(e.target.value)}/>
  
      <input type="text" className='input-product'  placeholder='Enter Comany' value={company} onChange={(e)=>setCompany(e.target.value)}/>
  
      <button className='btn btn3'onClick={updateProduct}>Add</button>
      </div>
      </>
       
  
      
      
    )
  
}

export default Update