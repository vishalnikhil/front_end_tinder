import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'



const Navbar = () => {

  

  const user=useSelector((store)=>store.user);  //subscribing to the store
  console.log(user);

  
  

  return (
    <div>
      <div className="navbar bg-base-300 shadow-sm">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl"> 😊 DevTinder</a>
        </div>
        <div className="flex gap-2">
          <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              {/* <p>welcome {user.firstName}</p> */}
            {user && <div className="w-10 rounded-full">

              <img
                alt="Tailwind CSS Navbar component"
                src="https://media.licdn.com/dms/image/v2/D5603AQHsyVarYIrhXg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1719959067503?e=2147483647&v=beta&t=xYhm7cPg_tKOpFVvd0AgO7qkECf_L6yYen96OIj5Spk" />
            </div>}
          


            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li><a>Settings</a></li>
              <li><Link to="./Login">Login</Link></li> {/* ✅ Fixed */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
