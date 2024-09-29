import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
const HomeScreen = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate()
  useEffect(()=>{
    if(!user){
      navigate("/api")
    }
  })
  console.log(user.user.name);
  const sr = useSelector((state) => state.user);
console.log(sr);
  return (
    <>
    <Header/>
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-lg">
        <div className="flex items-center justify-center mb-4">
          <img
            src={user.user.image}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-2 border-blue-500"
          />
        </div>
        <div className="mb-3">
          <label className="block text-gray-700 font-bold mb-1" htmlFor="name">Name</label>
          <div className="text-gray-900">{user.user.name}</div>
        </div>
        <div className="mb-3">
          <label className="block text-gray-700 font-bold mb-1" htmlFor="email">Email</label>
          <div className="text-gray-900">{user.user.email}</div>
        </div>
        <div className="mb-3">
          <label className="block text-gray-700 font-bold mb-1" htmlFor="phone">Phone Number</label>
          <div className="text-gray-900">{user.user.phone}</div>
        </div>
      </div>
    </div>
    </>
  );
};

export default HomeScreen;
