import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
function Footer() {
  return (
    
    <>
    <div className="footer" id="footer">
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.logo} alt="" />
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum voluptas laborum quidem fugiat facere blanditiis. Ipsum sapiente error unde quia doloribus, dolor ratione reprehenderit maiores facere natus, nulla, quam delectus.</p>
                <div className="footer-social-icon">
                <img src={assets.facebook_icon} alt="" />
                <img src={assets.twitter_icon} alt="" />
                <img src={assets.linkedin_icon} alt="" />
                </div>
                
            </div>
            <div className="footer-content-centre">
                <h2>Company</h2>
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>Get In Touch</h2>
                <ul>
                    <li>+1-212-123-123</li>
                    <li>contact_company@tomato.com</li>
                </ul>
            </div>
        
        </div>
        <hr />
            <p className='footer-copyright'>
                &copy; 2024 Tomato. All rights reserved.
            </p>
    </div>
    </>
  )
}

export default Footer