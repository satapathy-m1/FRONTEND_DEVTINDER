import React from 'react'

const UserCard = ({ user }) => {
    console.log(user.about);
    
  return (
    <div className="card bg-base-300 w-96 shadow-sm border">
        <figure>
            <img
            src= {user.profilePicture}
            alt="profile picture" />
        </figure>
        <div className="card-body">
            <h2 className="card-title">{user.firstName + " "+ user.lastName}</h2>
            <p>{user.skills}</p>
            <div className="card-actions justify-end">
            <button className="btn btn-primary">Ignore</button>
            <button className="btn btn-primary">Interested</button>
            </div>
        </div>
    </div>
  )
}

export default UserCard