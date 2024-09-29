import React from 'react';
import { Link, useLocation,useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userLogout } from '../slices/userSlice';
import axios from 'axios'; // Example for making HTTP requests

const Header = () => {
  const location = useLocation();

  // Determine whether to show "Login" or "Sign Up" button based on current URL
  const showSignup = location.pathname === '/';
  const showLogin = location.pathname === '/signup';
  const showLogout= location.pathname === '/profile';
  
  const dispatch = useDispatch()
  const navigate =useNavigate()
  
  const handleLogout = async() =>{
    try{
      dispatch(userLogout())
      await axios.post('/api/logout');
      navigate("/")

    }catch(error){
      console.error(error);
    }
  }
 

  return (
    <header className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl">
          MERN APP
        </div>
        <div>
          {showSignup && (
            <Link to="/signup" className="bg-blue-500 text-white px-6 py-1 rounded">
              Sign Up
            </Link>
          )}
          {showLogin && (
            <Link to="/" className="bg-blue-500 text-white px-6 py-1 rounded">
              Login
            </Link>
          )}
          {showLogout && (
            <button onClick={handleLogout} className="bg-blue-500 text-white px-6 py-1 rounded">
             Lougout
            </button>
          )}
         
        </div>
      </div>
    </header>
  );
};

export default Header;
