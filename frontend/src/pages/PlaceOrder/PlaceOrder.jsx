import React from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../Context/StoreContext'
function PlaceOrder() {
    const {gettotalcartamount} = React.useContext(StoreContext)
  return (
    <>
    <div className="place-order">
        <div className="place-order-left">
            <p className='title'>Delivery Address</p>
            <div className="multi-field">
                <input type="text" placeholder='First Name' /><input type="text" placeholder='Last Name'/>
            </div>
            <input type="email" placeholder='email' />
            <input type="text" placeholder='Street' />
            <div className="multi-field">
                <input type="text" placeholder='city' />
                <input type="text" placeholder='State'/>
            </div>
            <div className="multi-field">
                <input type="text" placeholder='Zip code' />
                <input type="text" placeholder='Country'/>
            </div>
            <input type="text" placeholder='Phone' />
        </div>
        <div className="place-order-right">
        <div className="cart-total">
            <h2>Cart Totals</h2>
            <div className="cart-details">
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
            <button  >Payment</button>
            </div>
        </div>
        </div>
    </div>
    </>
  )
}

export default PlaceOrder