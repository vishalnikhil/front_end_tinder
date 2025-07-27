import React, { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../utils/constants'



const Login = () => {
  const [emailId, setEmailId] = useState("vishalnikhil2002@gmail.com")
  const [password, setPassword] = useState("Nikhil@143")

  const [error,seterror]=useState();

  const dispatch = useDispatch();
  const navigate=useNavigate();
 

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL+"/login",
        { emailId, password },
        { withCredentials: true }
      )

      // console.log(res.data);

      dispatch(addUser(res.data)); //dispatched an action here data gets addeded in the store 
      navigate('/')
    } catch (err) {

        seterror(err.response.data);
      console.log(err)
    }
  }

  return (
    <div className='flex justify-center my-10'>
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">Login page</h2>

          <div className='m-2'>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email Id</legend>
              <input
                type="text"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                className="input"
              />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Password</legend>
              <input
                type="text"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="input w-full"
              />
            </fieldset>
          </div>

          <div>

            <p className='text-red-500'>{error}</p>
          </div>

          <div className="card-actions flex justify-center">
            <button className="btn btn-primary" onClick={handleLogin}>Login</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
