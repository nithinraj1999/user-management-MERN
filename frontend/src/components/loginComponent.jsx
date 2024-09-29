import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Header from "./Header"; // Assuming Header is in the same directory as LoginComponent
import { userLogin } from "../slices/userSlice";
const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
 
  useEffect(() => {
    if (user) {
      navigate("/profile");
    }
  }, [navigate, user]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = {
        email,
        password
      };

      const request = await axios.post("/api", data);
      const user = request.data;
      if (user) {
        dispatch(userLogin(user)) 
        navigate("/profile");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.log(err?.data?.message || err.error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Header /> {/* Including the Header component */}
      <div className="flex-1 flex items-center justify-center">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4">Login</h2>
          {error && (
            <div className="bg-red-100 text-red-700 p-2 rounded mb-4">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="email">
                Email address
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-2 border border-gray-300 rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full p-2 border border-gray-300 rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded"
            >
              Login
            </button>
          </form>
          <div className="mt-4 text-center">
            <span className="text-gray-700">Don't have an account? </span>
            <Link to="/signup" className="text-blue-500">
              Sign up here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
