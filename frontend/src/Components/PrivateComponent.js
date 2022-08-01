import React from 'react'
import {Navigate,Outlet, useNavigate} from 'react-router-dom'

function PrivateComponent() {
    const navigate = useNavigate();
    const auth =  localStorage.getItem('user')
  return (
    <>
    {auth? <Outlet/>:<Navigate to="/signup"/>}
    </>
    
  )
}

export default PrivateComponent