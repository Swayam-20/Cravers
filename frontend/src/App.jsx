import React from 'react'
import Navbar from './component/navbar/Navbar'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './component/Footer/Footer'
import Loginpop from './component/Loginpop/Loginpop'
import { ToastContainer } from 'react-toastify';
const App = ()=> {

  const [showlogin, setshowlogin] = React.useState(false)
  return (
    <>

    <div className="app">
      {showlogin && <div className="login-modal"><Loginpop setshowlogin={setshowlogin}/> </div>}
      <ToastContainer/>
      <Navbar setshowlogin={setshowlogin}/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/placeorder' element={<PlaceOrder/>}/>

      </Routes>
    </div>
    <Footer/>
    </>
    
  )
}

export default App