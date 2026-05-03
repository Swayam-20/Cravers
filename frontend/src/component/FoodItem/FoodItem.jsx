import React from 'react'
import { assets } from '../../assets/assets'
import './foodItem.css'
import { StoreContext } from '../../Context/StoreContext'
function FoodItem({id,name,description,price,image}) {
    const {cartitems,addtocart,removefromcart} = React.useContext(StoreContext);
  return (
    
    <>
    <div className="food-item">
        <div className="food-item-img-container">
            <img className="food-item-img" src={`http://localhost:4000/uploads/${image}`} alt="" />
            {!cartitems[id] ? <img src={assets.add_icon_white} alt="" className="food-item-add-button" onClick={() => addtocart(id)} /> :
            <div className="food-item-count-container">
                <img src={assets.remove_icon_red} onClick={() => removefromcart(id)} alt="" />
                    <p>{cartitems[id]}</p>
                <img src={assets.add_icon_green} onClick={() => addtocart(id)} alt="" />
            </div>

            }
        </div>
        <div className="food-item-info">
            <div className="food-item-name-rating">
                <p>{name}</p>
                <img src={assets.rating_starts} alt="" />
            </div>
            <p className="food-item-description">
                {description}
            </p>
            <p className="food-item-price">
                ${price}
            </p>
        </div>
    </div>
    </>
  )
}

export default FoodItem