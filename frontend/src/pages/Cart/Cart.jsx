import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../Context/StoreContext'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'
function Cart() {
    const{food_list,cartitems,addtocart,removefromcart,gettotalcartamount}=useContext(StoreContext)

    const navigate = useNavigate();
  return (
    <>
    <div className="cart">
        <div className="cart-items">
            <div className="cart-items-title">
            <p>Item</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
            </div>
        
        <br />
        <hr />
        {food_list.map((item,index)=>{
            if(cartitems[item._id]>0)
            {
                return (
                    <div>
                        <div className="cart-items-title cart-items-details" key={index}>
                        <img src={`http://localhost:4000/uploads/${item.imageUrl}`} alt="" />
                        <p>{item.name}</p>
                        <p>${item.price}</p>
                        <p>{cartitems[item._id]}</p>
                        <p>${cartitems[item._id]*item.price}</p>
                        <img className="Cross"src={assets.cross_icon} alt="" onClick={() => removefromcart(item._id)} />
                    </div>
                    <hr />
                    </div>
                    
                )
            }
        })}
    </div>
    <div className="cart-bottom">
        <div className="cart-total">
            <h2>Cart Totals</h2>
            <div>
                <div className="cart-total-details">
                    <p>Subtotal</p>
                    <p>{gettotalcartamount()}</p>
                </div>
                <hr />
                <div className="cart-total-details">
                    <p>Delivery</p>
                    <p>{gettotalcartamount()?2:0}</p>
                </div>
                <hr />
                <div className="cart-total-details">
                    <b>Total</b>
                    <b>{gettotalcartamount()?gettotalcartamount()+2:0}</b>
                </div>
            </div>
            <div className="cart-checkout">
            <button onClick={()=>navigate('/placeorder')} >Checkout</button>
            </div>
        </div>
        <div className="cart-promocode">
                    <div>
                        <p>Have a promo code?</p>
                        <div className="cart-promocode-input">
                            <input type="text" placeholder='Promo Code' />
                            <button>Submit</button>
                        </div>
                        
                    </div>
        </div>
    </div>
    </div>
    </>
  )
}

export default Cart