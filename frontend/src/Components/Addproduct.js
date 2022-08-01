import React,{useState} from 'react'

function AddProduct() {
  let [name,setName]=useState("");
  let [price,setPrice]=useState("");
  let [category,setCategory] = useState("");
  let [company,setCompany]= useState("");
  let [error,setError]=useState(false)
  
  async function addProduct(){
    if(!name || !price || !category || !company){
      setError(true);
      return false;
    }
    
    let userid = JSON.parse(localStorage.getItem('user'))._id;
   let result= await fetch('http://localhost:4500/add',{
      method:'post',
      body:JSON.stringify({name,price,category,company,userid}),
      headers:{"Content-Type":"application/json"}
    })
    
    result = await result.json()
    console.log(result);
    setName('');
    setPrice('');
    setCategory('');
    setCompany('');
    alert('product added');
  }
  return (
    <>
    <div className='product'>
      <h2>Add Product</h2>
    <input type="text" className='input-product' placeholder='Enter Name' value={name}  onChange={(e)=>setName(e.target.value)}/>
    {error && !name && <span className="invalid">Enter Valid Name</span>}

    <input type="text" className='input-product' placeholder='Enter Price' value={price} onChange={(e)=>setPrice(e.target.value)}/>
    {error && !price && <span className="invalid">Enter Valid Price</span>}

    <input type="text" className='input-product' placeholder='Enter Category' required value={category} onChange={(e)=>setCategory(e.target.value)}/>
    {error && !category && <span className="invalid">Enter Valid Category</span>}

    <input type="text" className='input-product'  placeholder='Enter Comany' value={company} onChange={(e)=>setCompany(e.target.value)}/>
    {error && !company && <span className="invalid">Enter Valid Company</span>}

    <button className='btn btn3'onClick={addProduct}>Add</button>
    </div>
    </>
     

    
    
  )
}

export default AddProduct