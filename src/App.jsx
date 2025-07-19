
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import Login from './Login'
import Body from './Body'
import Profile from './Profile'
import Navbar from './Navbar'

function App() {
 
  return (

       <div >

              
           <BrowserRouter basename='/'>   {/* base of my router */}

           {/* here i have creted the children route of body which has  /login and /profile  now look in the body we must have use n*/}
           {/*  we have used navbar and after that i have added outlet that means navbar will always be loaded and the its children route*/}
           
            <Routes>

              <Route path='/' element={<Body/>}></Route> 
                {/* above is parent route */}




            {/* these 2 are childrens routes body component mein outlet dena parega for these child route to render */}
              <Route path='/login' element={<Login/>}  />   
            
              <Route path='/Profile' element={<Profile/>} />


              
              
              
            </Routes>
          
          </BrowserRouter>

       </div>

  )
}


export default App
