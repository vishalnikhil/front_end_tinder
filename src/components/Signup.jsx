import React, { useState } from 'react'
import axios from 'axios'

import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../utils/constants'

const Signup = () => {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [emailId, setEmailId] = useState("")
  const [password, setPassword] = useState("")
  const [age, setAge] = useState("")
  const [gender, setGender] = useState("")
  const [error, setError] = useState()

  
  const navigate = useNavigate()

  const signup = async () => {
    try {
      await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password, age, gender },
        { withCredentials: true }
      )

      navigate('/login')
    } catch (err) {
      setError(err.response?.data || "Signup failed")
      console.log(err)
    }
  }

  return (
    <div className='h-screen flex justify-center items-center px-2'>
      <div className="card bg-base-300 w-full max-w-md shadow-md">
        <div className="card-body p-6 space-y-4">
          <h2 className="card-title justify-center text-lg">Signup</h2>

          <fieldset className="space-y-1">
            <legend className="text-sm">First Name</legend>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="input input-bordered w-full"
            />
          </fieldset>

          <fieldset className="space-y-1">
            <legend className="text-sm">Last Name</legend>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="input input-bordered w-full"
            />
          </fieldset>

          <fieldset className="space-y-1">
            <legend className="text-sm">Email ID</legend>
            <input
              type="email"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              className="input input-bordered w-full"
            />
          </fieldset>

          <fieldset className="space-y-1">
            <legend className="text-sm">Password</legend>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered w-full"
            />
          </fieldset>

          <fieldset className="space-y-1">
            <legend className="text-sm">Age</legend>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="input input-bordered w-full"
            />
          </fieldset>

          <fieldset className="space-y-1">
            <legend className="text-sm">Gender</legend>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="input input-bordered w-full"
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </fieldset>

          {error && <p className="text-sm text-red-500 text-center">{error}</p>}

          <div className="card-actions justify-center pt-2">
            <button className="btn btn-primary w-full" onClick={signup}>Signup</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
