import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'

function ProductsList() {
  let [list,setList] = useState([]);
  useEffect(()=>{
    getproducts();
  },[]);

 async function getproducts(){
  let result = await fetch('http://localhost:4500/products')
    result = await result.json();
    setList(result);
} 
async function deleteproduct(id){
  let result = await fetch(`http://localhost:4500/products/${id}`,{
     method:'Delete'
  });
  result = await result.json()
      if(result){
        getproducts();
      }
};
async function searchproduct(e){
  let key = e.target.value;
  let result = await fetch(`http://localhost:4500/search/${key}`);
  result = await result.json();
  if(result){
    setList(result)
  }
  else{
    getproducts();
  }
 
}
   

  return (
    <div className="list-render">
       <input type="search" name="" id="" placeholder='Search product' className='search' onChange={searchproduct}/>
            <h3>Product List</h3>
        <ul >
          <li className="list-item">S.No</li>
          <li className="list-item">Name</li>
          <li className="list-item">Price</li>
          <li className="list-item">Category</li>
          <li className="list-item">Company</li>
          <li className="list-item">Operations</li>
        </ul>
        {list.length>0?list.map((item,index)=>{
          return<ul key={item._id}>
            <li>{index+1}</li>
            <li>{item.name}</li>
            <li>{item.price}</li>
            <li>{item.category}</li>
            <li>{item.company}</li>
            <li><button onClick={()=>deleteproduct(item._id)}>Delete</button><Link className='toupdate' to={`/update/${item._id}`}>Update</Link><button></button></li>
          </ul>
        }):<h2 className='producth2'>No data available</h2>}
    </div>
  )
}

export default ProductsList;