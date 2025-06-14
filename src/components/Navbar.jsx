import React, { use } from 'react'
import { useSelector } from 'react-redux'
import { Link , useNavigate} from 'react-router-dom'
import { BASE_URL } from '../utils/constants'
import { useDispatch } from 'react-redux'
import { removeUser } from '../utils/userSlice'
const Navbar = () => {
  const user = useSelector((store) => store.user)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try{
      const response = await fetch(BASE_URL + "/logout", {
        method: 'GET',
        credentials: 'include',
      });
      if (response.ok) {
        
        dispatch(removeUser());
        console.log('Logout successful');
        
        navigate('/login');
      } else {
        console.error('Logout failed:', response.statusText);
      }

    }catch (error) {
      console.error('Logout failed:', error);
    }
  }
  return (
    <div className="navbar bg-neutral ">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">DevTinder</Link>
        </div>
        {user && (
          <div className="flex flex-row items-center gap-2">
          
            <div className='form-control'> Welcome {user.firstName}</div>
            <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar mx-4">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src= {user.profilePicture}/>
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li><Link to="/connections" className='justify-between'> My Connections</Link></li>
              <li><Link to="/requests" className='justify-between'> My Requests</Link></li>
              <li><button onClick={handleLogout}>Logout</button></li>
            </ul>
          </div>
          
        </div>
        )}
    </div>
  )
}

export default Navbar