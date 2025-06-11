import {React,  useEffect} from 'react'
import Navbar from './Navbar'
import { useNavigate, Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Footer from './Footer'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { addUser } from '../utils/userSlice'
const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector(state => state.user);

  const fetchUser = async () => {
    if(userData) return;
    try {
      const user = await axios.get(BASE_URL + "/profile/view",
        { withCredentials: true }
      );
      dispatch(addUser(user.data));
    }
    catch (error) {
      if(error.response && error.response.status === 401) {
        // If user is not authenticated, redirect to login
        navigate('/login');
      }
      console.error('Error fetching user:', error);
    }
  };

  useEffect( () => {
    fetchUser();
  }, [])

  return (
    <div>
        <Navbar />
        <Outlet />
        <Footer />
    </div>
  )
}

export default Body