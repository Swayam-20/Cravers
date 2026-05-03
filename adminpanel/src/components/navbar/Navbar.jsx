import React from 'react'
import './navbar.css'
import { assets } from '../../../../frontend/src/assets/assets'
function Navbar() {
  return (
    <>
    <div className="navbar">
        <img className='img-logo' src={assets.logo} alt="" />
        <img className='img-profile' src={assets.profile_icon} alt="" />
    </div>
    </>
  )
}

export default Navbar