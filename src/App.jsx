
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

              <Route path='/' element={<Body/>}>
              <Route path='/login' element={<Login/>}  />   
              {/* yeh element mein kisi component ko pass kr skta hai jb bhi login route hoga yeh page load ho jayega */}

              <Route path='/Profile' element={<Profile/>} />


              </Route>
              
              
            </Routes>
          
          </BrowserRouter>

       </div>

  )
}


export default App
