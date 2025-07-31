import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'




//outlet means any children routes of body will be render here

const Body = () => {

  const dispatch=useDispatch();
  const navigate=useNavigate();
 
    const fetchUser=async () =>{

       try{
         
          const res= await axios.get(BASE_URL+"/profile",{
            withCredentials:true,
          });

          dispatch(addUser(res.data));

          
    }
  
  catch(err){
    
      navigate('/login')
      
    console.log(err);
  }

}

useEffect(()=>{
   fetchUser();
},[]);


  return (
    <div>
    {/* navbar is always loaded and then after its children route using outlet */}
       <Navbar/>
       
       <Outlet/>  
       {/* any childrens of route whose parent is the body will be render using outleb like login page */}

       {/* <Footer/> */}
      
    </div>
  )
}

export default Body
