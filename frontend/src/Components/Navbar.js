import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate();
  const auth = localStorage.getItem('user');
  const logout = () => {
    localStorage.clear();
    navigate('/signup')
  }
  return (
    <>
      <div className='nav-container'>
        {auth?<ul className='nav-ul'>
          <li className='nav-item'><Link to="/">Product</Link></li>
          <li className='nav-item'><Link to="/add">Add Product</Link></li>
          {/* <li className='nav-item'><Link to="/update/:id"></Link></li> */}
          <li className='nav-item'><Link to="/profile">Profile</Link></li>
          <li className='nav-item'><Link onClick={logout} to="/logout">LogOut</Link> </li>
        </ul>:<ul className='nav-ul text-align'>
      <li><Link to="/signup">Sign-Up/In</Link></li>
      </ul>}
    </div>
    </>
  )
}

export default Navbar