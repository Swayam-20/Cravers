import React from 'react'
import Navbar from './components/navbar/Navbar'
import Sidebar from './components/sidebar/Sidebar'
import { Router,Route, Routes } from 'react-router-dom'
import Additems from './pages/Additems/Additems'
import Listitems from './pages/Listitems/Listitems'
import Order from './pages/Order/Order'
import { ToastContainer } from 'react-toastify';
function App() {
  return (
    <>
    <div className="app">
      <ToastContainer/>
      <Navbar/>
      <hr />
      
      <div className="app-content">
      <Sidebar/>
        <Routes>
          
          <Route path='/additems' element={<Additems/>}/>
          <Route path='/orders' element={<Order/>}/>
          <Route path='/listitems' element={<Listitems/>}/>
        </Routes>
      </div>
    </div>
    </>
  )
}

export default App