import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import Login from './components/Login'
import Body from './components/Body'
import Profile from './components/Profile'
import Navbar from './components/Navbar' // ✅ kept, though not directly used here
import { Provider } from 'react-redux'
import appStore from './utils/appStore'
import Feed from './components/Feed'

function App() {

  return (
    <div>

      <Provider store={appStore}>

        <BrowserRouter basename='/'>   {/* base of my router */}

          {/* here i have creted the children route of body which has  /login and /profile  now look in the body we must have use n*/}
          {/*  we have used navbar and after that i have added outlet that means navbar will always be loaded and the its children route*/}

          <Routes>

            <Route path='/' element={<Body />}>  {/* ✅ turned into layout route for nested children */}
              {/* above is parent route */}
             
              {/* these 2 are childrens routes body component mein outlet dena parega for these child route to render */}
                 <Route path='/' element={<Feed />} /> 
              <Route path='/login' element={<Login />} />   {/* ✅ changed from /login to login */}
               <Route path='/profile' element={<Profile />} /> {/* ✅ changed from /Profile to profile */}
               {/* <Route path='/feed' element={<Feed/>}/> */}
              {/* ✅ optional: placeholder for root index */}
            </Route>

          </Routes>

        </BrowserRouter>

      </Provider>

    </div>
  )
}

export default App
