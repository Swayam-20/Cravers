import React from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/assets'


function ExploreMenu({category,setcategory}) {
  return (
    <div className="explore-menu" id="explore-menu">
        <h1>
            Explore Menu
        </h1>
        <p className='explore-menu-text'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, magnam!
        </p>
        <div className="explore-menu-list">
            {menu_list.map((item,index)=>{
                return (
                    <div onClick={()=>setcategory(prev=>prev===item.menu_name?"All":item.menu_name)} className="explore-menu-list-item" key={index}>
                        <img className={category===item.menu_name?"active":""}src={item.menu_image} alt="" />
                        <h3>{item.menu_name}</h3>
                        
                    </div>
                )
            })}
        </div>
        
    </div>
  )
}

export default ExploreMenu