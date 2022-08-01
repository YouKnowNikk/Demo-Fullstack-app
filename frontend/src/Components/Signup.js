import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function Signup() {
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [pass, setPass] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const auth = localStorage.getItem('user');
    if (auth) {
      navigate('/')
    }
  })

  async function collectData() {

    let result = await fetch("http://localhost:4500/register", {
      method: 'post',
      body: JSON.stringify({ name, email, pass }),
      headers: {
        'Content-Type': 'application/json'

      }
    });
    result = await result.json();
    console.log(result);
    if (!result) {
      console.log("enter result");
    }
    else {
      if (result) {
        navigate('/')
      }
      localStorage.setItem("user", JSON.stringify(result))
    }



  }
  return (
    <div className="signup">
      <h1>Register</h1>
      <input className='input-val' type="text" placeholder='Enter Name' value={name} onChange={(e) => { setName(e.target.value) }} />
      <input className='input-val' type="email" placeholder='Enter-Email' value={email} onChange={(e) => { setEmail(e.target.value) }} />
      <input className='input-val' type="text" placeholder='Enter Password' value={pass} onChange={(e) => { setPass(e.target.value) }} />
      <button className='btn btn1' onClick={collectData}>Sign-Up</button>
      <Link to="/login">Already have an account?</Link>
    </div>
  )
}

export default Signup