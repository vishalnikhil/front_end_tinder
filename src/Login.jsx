import React, { useState } from 'react'
import axios from 'axios';

const Login = () => {

  const [emailId, setEmailId] = useState("vishalnikhil2002@gmail.com");
  const [password, setPassword] = useState("Nikhil@143");
  const [showPassword, setShowPassword] = useState(false); // ✅ added for toggle

  console.log(emailId);
  console.log(password);

  const handleLogin = async () => {   //this will make an api call when we click on the login button
    try {
      await axios.post("http://localhost:7777/login", {
        emailId,
        password,
      }, { withCredentials: true })
    }
    catch (err) {
      console.log(err);
    }
  }

  return (
    <div className='flex justify-center my-10'>
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">Login page</h2>

          <div className='m-2'>

            <fieldset className="fieldset ">
              <legend className="fieldset-legend">Email Id</legend>
              <input
                type="text"
                value={emailId}
                onChange={(e) => { setEmailId(e.target.value) }}
                className="input"
              />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Password</legend>

              {/* ✅ Password input with eye toggle */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => { setPassword(e.target.value) }}
                  value={password}
                  className="input w-full pr-10"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-xl"
                >
                  {showPassword ? "🙈" : "👁️"}
                </span>
              </div>
            </fieldset>

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
