// import React, { useState, useEffect } from 'react';
// import { useSelector } from "react-redux";

// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import Header from './Header';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const SignupComponent = () => {
//   const [name, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [error, setError] = useState({});
//   const [phone, setPhone] = useState('');
//   const navigate = useNavigate();
//   const { user } = useSelector((state) => state.user);

//   useEffect(() => {
//     if (user) {
//       navigate("/home");
//     }
//   }, [navigate, user]);

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     let isValid = true;
//     const errors = {};

//     // Name validation
//     if (!name || !name.trim()) {
//         errors.name = 'Name is required';
//         isValid = false;
//     } else if (!/^[a-zA-Z ]+$/.test(name.trim())) {
//         errors.name = 'Name should only contain letters and spaces';
//         isValid = false;
//     }

//     // Email validation
//     if (!email || !email.trim()) {
//         errors.email = 'Email is required';
//         isValid = false;
//     } else if (!/\S+@\S+\.\S+/.test(email.trim())) {
//         errors.email = 'Email is invalid';
//         isValid = false;
//     }

//     // Phone number validation
//     if (!phone || !phone.trim()) {
//         errors.phone = 'Phone number is required';
//         isValid = false;
//     } else if (!/^\d{10}$/.test(phone.trim())) {
//         errors.phone = 'Phone number should be 10 digits';
//         isValid = false;
//     }

//     // Password validation
//     if (!password || !password.trim()) {
//         errors.password = 'Password is required';
//         isValid = false;
//     }

//     // Confirm password validation
//     if (!confirmPassword || !confirmPassword.trim()) {
//         errors.confirmPassword = 'Confirm Password is required';
//         isValid = false;
//     } else if (password.trim() !== confirmPassword.trim()) {
//         errors.confirmPassword = 'Passwords do not match';
//         isValid = false;
//     }

//     // Set errors if any
//     if (!isValid) {
//         setErrors(errors);
//         return; // Exit early if form is invalid
//     }


//     try {
//       const data = {
//         name,
//         email,
//         password,
//         phone
//       };

//       const response = await axios.post("api/signup", data);
//       toast.success("signup succesfull")
//       const newUser = response.data;

//       if (newUser) { 
//         navigate("/"); // Redirect to login page after signup
//       }
//     } catch (err) {
//       toast.error(err?.response?.data?.message || err.message);
//     }
//   };

//   return (
//     <div className="bg-gray-100 min-h-screen flex flex-col">
     
//       <Header /> {/* Including the Header component */}
//       <div className="flex-1 flex items-center justify-center">
//         <div className="bg-white p-6 rounded shadow-md w-full max-w-lg">
//           <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
//           {error && <div className="bg-red-100 text-red-700 p-2 rounded mb-4">{error}</div>}
//           <form onSubmit={handleSubmit}>
//             <div className="mb-3">
//               <label className="block text-gray-700 mb-1" htmlFor="username">Username</label>
//               <input
//                 type="text"
//                 id="username"
//                 className="w-full p-1 border border-gray-300 rounded"
//                 value={name}
//                 onChange={(e) => setUsername(e.target.value)}
//               />
//             </div>
//             <div className="mb-3">
//               <label className="block text-gray-700 mb-1" htmlFor="email">Email address</label>
//               <input
//                 type="email"
//                 id="email"
//                 className="w-full p-1 border border-gray-300 rounded"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>
//             <div className="mb-3">
//               <label className="block text-gray-700 mb-1" htmlFor="phone">Phone Number</label>
//               <input
//                 type="text"
//                 id="phone"
//                 className="w-full p-1 border border-gray-300 rounded"
//                 value={phone}
//                 onChange={(e) => setPhone(e.target.value)}
//               />
//             </div>
//             <div className="mb-3">
//               <label className="block text-gray-700 mb-1" htmlFor="password">Password</label>
//               <input
//                 type="password"
//                 id="password"
//                 className="w-full p-1 border border-gray-300 rounded"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>
//             <div className="mb-3">
//               <label className="block text-gray-700 mb-1" htmlFor="confirmPassword">Confirm Password</label>
//               <input
//                 type="password"
//                 id="confirmPassword"
//                 className="w-full p-1 border border-gray-300 rounded"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//               />
//             </div>
//             <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
//               Sign Up
//             </button>
//           </form>
//         </div>
//       </div>
//       <ToastContainer />
//     </div>
    
//   );
// };

// export default SignupComponent;
import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignupComponent = () => {
  const [name, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [navigate, user]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    let isValid = true;
    const validationErrors = {};

    // Name validation
    if (!name || !name.trim()) {
      validationErrors.name = 'Name is required';
      isValid = false;
    } else if (name.trim() !== name) {
      validationErrors.name = 'Name cannot start or end with whitespace';
      isValid = false;
    } else if (!/^[a-zA-Z ]+$/.test(name.trim())) {
      validationErrors.name = 'Name should only contain letters and spaces';
      isValid = false;
    }

   // Email validation
if (!email || !email.trim()) {
  validationErrors.email = 'Email is required';
  isValid = false;
} else if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
  validationErrors.email = 'Email is invalid';
  isValid = false;
} else if (email !== email.trim()) {
  validationErrors.email = 'Email cannot start or end with whitespace';
  isValid = false;
}


    // Phone number validation
    if (!phone || !phone.trim()) {
      validationErrors.phone = 'Phone number is required';
      isValid = false;
    } else if (phone.trim() !== phone) {
      validationErrors.phone = 'Phone number cannot start or end with whitespace';
      isValid = false;
    } else if (!/^\d{10}$/.test(phone.trim())) {
      validationErrors.phone = 'Phone number should be 10 digits';
      isValid = false;
    }

    // Password validation
    if (!password || !password.trim()) {
      validationErrors.password = 'Password is required';
      isValid = false;
    } else if (password.trim() !== password) {
      validationErrors.password = 'Password cannot start or end with whitespace';
      isValid = false;
    }

    // Confirm password validation
    if (!confirmPassword || !confirmPassword.trim()) {
      validationErrors.confirmPassword = 'Confirm Password is required';
      isValid = false;
    } else if (confirmPassword.trim() !== confirmPassword) {
      validationErrors.confirmPassword = 'Confirm Password cannot start or end with whitespace';
      isValid = false;
    } else if (password.trim() !== confirmPassword.trim()) {
      validationErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    // Set errors if any
    if (!isValid) {
      setErrors(validationErrors);
      return; // Exit early if form is invalid
    }

    try {
      const data = {
        name,
        email,
        password,
        phone
      };

      const response = await axios.post("api/signup", data);
      toast.success("Signup successful");
      const newUser = response.data;

      if (newUser) { 
        navigate("/"); // Redirect to login page after signup
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Header /> {/* Including the Header component */}
      <div className="flex-1 flex items-center justify-center">
        <div className="bg-white p-6 rounded shadow-md w-full max-w-lg">
          <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="block text-gray-700 mb-1" htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                className="w-full p-1 border border-gray-300 rounded"
                value={name}
                onChange={(e) => setUsername(e.target.value)}
              />
              {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
            </div>
            <div className="mb-3">
              <label className="block text-gray-700 mb-1" htmlFor="email">Email address</label>
              <input
                type="text"
                id="email"
                className="w-full p-1 border border-gray-300 rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
            </div>
            <div className="mb-3">
              <label className="block text-gray-700 mb-1" htmlFor="phone">Phone Number</label>
              <input
                type="text"
                id="phone"
                className="w-full p-1 border border-gray-300 rounded"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              {errors.phone && <div className="text-red-500 text-sm mt-1">{errors.phone}</div>}
            </div>
            <div className="mb-3">
              <label className="block text-gray-700 mb-1" htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                className="w-full p-1 border border-gray-300 rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && <div className="text-red-500 text-sm mt-1">{errors.password}</div>}
            </div>
            <div className="mb-3">
              <label className="block text-gray-700 mb-1" htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                className="w-full p-1 border border-gray-300 rounded"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {errors.confirmPassword && <div className="text-red-500 text-sm mt-1">{errors.confirmPassword}</div>}
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
              Sign Up
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignupComponent;
