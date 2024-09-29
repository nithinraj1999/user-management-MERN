import React, { useState,useEffect } from 'react';
import Header from '../components/Header';
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { userLogin } from '../slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate()
   useEffect(()=>{
    if(user){
        setName(user.name)
        setEmail(user.email)
        setPhoneNumber(user.phone)
        setProfilePicture(user.image)
    }
    else{
      navigate('/')
    }
   },[user])

    const handleSubmit = async(event) => {
    event.preventDefault();

    const data = {id:user._id};

    if (name !== user.name) data.name = name;
    if (email !== user.email) data.email = email;
    if (phoneNumber !== user.phone) data.phone = phoneNumber;
    if (password !== '' && password === confirmPassword) data.password = password;
    if (profilePicture) data.image = profilePicture
  
    const response = await axios.put(`/api/profile/`, data);
    if(response){
      toast.success('User profile updatedd.');
    }
    dispatch(userLogin(response.data));
  };



  const handleFileChange = (event) => {
    const file = event.target.files[0];
   
    if (file) {
      console.log("File type:", file.type);
      console.log("File size:", file.size);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
 


  return (
    <div>
      <Header /> {/* Include the Header component */}
      
      <div className="container mx-auto mt-8">
        <h2 className="text-2xl font-bold mb-4 text-center">Update Profile</h2>
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-8 rounded shadow-md">
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 mb-2">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">Email address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block text-gray-700 mb-2">Phone Number</label>
            <input
              type="text"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
             
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-gray-700 mb-2">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            
            />
          </div>
          <div className="mb-4 relative w-32 h-32 mx-auto rounded-full overflow-hidden">
            {profilePicture ? (
              <img
                src={profilePicture}
                alt="Profile"
                className="object-cover w-full h-full rounded-full"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                No Image
              </div>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="profilePicture" className="block text-gray-700 mb-2">Upload Profile Picture</label>
            <input
              type="file"
              id="profilePicture"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
            Update Profile
          </button>
        </form>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Home;
