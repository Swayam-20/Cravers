import React from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { NavLink} from 'react-router-dom'
function Sidebar() {
    
  return (
    <>
    <div className="sidebar">
        <div className="sidebar-options">
            <NavLink to="/additems" className="sidebar-option" >
                <img src={assets.add_icon} alt=""  />
                <p>Add Items</p>
            </NavLink>
            <NavLink to="/listitems" className="sidebar-option" >
                <img src={assets.order_icon} alt=""  />
                <p>Item list</p>
            </NavLink>
            <NavLink to="/orders" className="sidebar-option" >
                <img src={assets.order_icon} alt="" />
                <p>order</p>
            </NavLink>
        </div>
    </div>
    </>
  )
}

export default Sidebar