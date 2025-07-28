import React from 'react';
import { useSelector, useDispatch } from 'react-redux'; // Import useDispatch
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { removeUser } from '../utils/userSlice'; // Import removeUser action
import axios from 'axios';
import { BASE_URL } from '../utils/constants';

const Navbar = () => {
    const user = useSelector((store) => store.user); // Subscribing to the store
    const dispatch = useDispatch(); // Get the dispatch function
    const navigate = useNavigate(); // Get the navigate function

    const handleLogout = async () => {


        try {

             

            await axios.post(BASE_URL+"/logout",{},{withCredentials:true});

            dispatch(removeUser());
         
              navigate('/login');
          
        } catch (err) {

           console.log(err);  
          
        }





    };

    return (
        <div>
            <div className="navbar bg-base-300 shadow-sm">
                <div className="flex-1">
                    <Link to="/" className="btn btn-ghost text-xl"> 😊 DevTinder</Link>
                </div>
                <div className="flex gap-2">
                    <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            {user && ( // Only show avatar if user is logged in
                                <div className="w-10 rounded-full">
                                    <img 
                                        alt="User Avatar"
                                        src="https://media.licdn.com/dms/image/v2/D5603AQHsyVarYIrhXg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1719959067503?e=2147483647&v=beta&t=xYhm7cPg_tKOpFVvd0AgO7qkECf_L6yYen96OIj5Spk"
                                    />
                                </div>
                            )}
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                        >
                            <li>
                                <Link to="/profile" className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </Link>
                            </li>
                            <li><a>Settings</a></li>
                            <li>
                                {user ? ( // Conditionally render Login or Logout
                                    <button onClick={handleLogout}>Logout</button>
                                ) : (
                                    <Link to="/Login">Login</Link>
                                )}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;