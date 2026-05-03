import React from 'react'
import './Loginpop.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import { StoreContext } from '../../Context/StoreContext';
function Loginpop({setshowlogin}) {
    const [currState, setcurrState] = React.useState("sign-up")
    const {Token,setToken}=React.useContext(StoreContext);
    const [data, setdata] = React.useState({
        name:"",
        email:"",
        password:""
    })
    const onchangehandler=(e)=>{
        setdata({...data,[e.target.name]:e.target.value})
    }
    useEffect(() => {
        console.log("Current form data:", data);
    },[data])
    const onsubmithandler=async(e)=>{
        e.preventDefault();
        
        currState === "login" ?  console.log("Login data",data) : console.log("Sign up data",data);
        const url = currState === "login" ? "http://localhost:4000/api/user/login" : "http://localhost:4000/api/user/register";
        const response=await axios.post(url,data);
        if(response.status===200)
        {   
            setToken(response.data.cookie);
            console.log("Token set in context:", response.data.cookie);
            localStorage.setItem("token", response.data.cookie);
            
            currState==="login" ?setshowlogin(false):setcurrState("login");
            
            currState === "login" ? toast.success(response.data.message) : toast.success(response.data.message);
            
        }
        else
        {
            toast.error(response.data.message);
        }
    }
  return (
    <>
    <div className="login-popup">
        <form onSubmit={onsubmithandler} className="login-popup-container">
            <div className="login-popup-title">
                {currState === "login" ? "Login to your account" : "Create a new account"}
                <img src={assets.cross_icon} alt=""  onClick={()=>setshowlogin(false)}/>
            </div>

            <div className="login-popup-input">
                {currState==="login"?<><input onChange={onchangehandler}  name='email' value={data.email} type="text" placeholder="Email" />
                <input onChange={onchangehandler} name='password' value={data.password} type="password" placeholder="Password" /></>
                :<>
                <input onChange={onchangehandler} name='name' value={data.name}  type="text" placeholder="Name" />
                <input onChange={onchangehandler} name='email' value={data.email} type="text" placeholder="Email" />
                <input onChange={onchangehandler} name='password' value={data.password} type="password" placeholder="Password" />
                </>}
            </div>

            <button type="submit"  >
                    {currState === "login" ? "Login" : "Sign Up"}
                    
            </button>
            
            <div className="login-popup-condition">
                <input type="checkbox" required />
                <p>I agree to the terms and conditions</p>
            </div>
            {currState === "login" ?
            <p>create a new account? <span onClick={()=>setcurrState("sign-up")}>Click here</span></p>
            :
            <p>Already have a account? <span onClick={()=>setcurrState("login")}>Login</span></p>
            }

        </form>
    </div>
    </>
  )
}

export default Loginpop