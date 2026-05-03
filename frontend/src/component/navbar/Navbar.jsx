import React, { useState } from 'react'

import './navbar.css'
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';
import { useNavigate } from 'react-router-dom';
function Navbar({setshowlogin}) {
    const [menu,setmenu] = useState("home");
    const {gettotalcartamount,cartitems,Token,setToken} = React.useContext(StoreContext)
    const navigate = useNavigate();
    const logout =()=>{
      setToken("");
      localStorage.removeItem("token");
      navigate("/");
    }
  return (
    <>
    <div className="navbar">
     <Link to="/"><img src={assets.logo} alt="" className="logo" /></Link>
        <ul className="navbar-menu">
        <Link  to="/" onClick={()=>{setmenu("home")}} className={menu ==="home" ? "active" : ""} id="navbar-menu-home">Home</Link>
        <li onClick={()=>{setmenu("menu")}} className={menu ==="menu" ? "active" : ""}><a href="#explore-menu">menu</a></li>
        <li onClick={()=>{setmenu("mobile-app")}} className={menu ==="mobile-app" ? "active" : ""}><a href="#app-download">mobile-app</a></li>
        <li onClick={()=>{setmenu("contact")}} className={menu ==="contact" ? "active" : ""}><a href="#footer">Contact</a></li>
        </ul>
        <div className="navbar-right">
            <img src={assets.search_icon} alt="" />
            <div className="navbar-search-icon">
              <Link to='/cart'> <img src={assets.basket_icon} alt="" /></Link>
              <div className={gettotalcartamount()?"dot":""}></div>
              
            </div>
            {Token ? <div className="navbar-profile">
                <img src={assets.profile_icon} alt="" />
                <ul className="navbar-profile-dropdown">
                  <li><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
                  <hr />
                  <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
                </ul>
            </div> :
        <button className="navbar-button" onClick={()=>{setshowlogin(true) }} >Sign in</button>}
        </div>
    </div>
    </>
  )
}

export default Navbar