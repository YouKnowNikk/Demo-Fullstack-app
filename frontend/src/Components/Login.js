import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'


function Login() {

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
    console.log(email, pass);
    let result = await fetch("http://localhost:4500/login", {
      method: 'post',
      body: JSON.stringify({ email, pass }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
        result = await result.json();
    if (result.name) {
      localStorage.setItem("user", JSON.stringify(result))
      navigate('/')
    } else {
      alert("enter correct values");
    }

  }
  return (
    <div className="signup">
      <h1>Sign In</h1>

      <div>
        <input className='input-val' type="email" placeholder='Enter-Email' value={email} onChange={(e) => { setEmail(e.target.value) }} />
        <input className='input-val' type="text" placeholder='Enter Password' value={pass} onChange={(e) => { setPass(e.target.value) }} />
      </div>



      <button className='btn btn2' onClick={collectData}>Log In</button>
      <Link className='login' to="/signup">New User?</Link></div>
  )
}

export default Login