import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

//outlet means any children routes of body will be render here

const Body = () => {
  return (
    <div>
    {/* navbar is always loaded and then after its children route using outlet */}
       <Navbar/>
       <Outlet/>  
       <Footer/>
      
    </div>
  )
}

export default Body
