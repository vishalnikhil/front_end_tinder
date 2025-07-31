import React from 'react'

const UserCard = ({user}) => {

  //  console.log(user);

    


  return (
<div className="card bg-base-300 w-80 shadow-sm">
  <figure>
    <img
      src={user.photoUrl}
      alt="Shoes" />
  </figure>
  <div className="card-body">
    <h2 className="card-title ">{user.firstName} {user.lastName}</h2>
    <p>{user.gender}</p>
    <p>{user.age}</p>
    <p>{user.skills}</p>
    <div className="card-actions justify-end">
      <button className="btn btn-secondary bg-amber-500">INTRESTED</button>
       <button className="btn btn-secondary bg-orange-700">IGNORE</button>
    </div>
  </div>
</div>
  )
}

export default UserCard
