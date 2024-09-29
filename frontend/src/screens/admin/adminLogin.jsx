import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import axios from "axios";
import Header from "../../components/Header";
import { adminLogin } from "../../slices/adminSlice";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { admin } = useSelector((state) => state.admin);
  useEffect(() => {
    if (admin) {
      navigate("/admin/dashboard");
    }
  }, [admin]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(""); // Clear previous error
    try {
      const response= await axios.post("/api/admin", { email, password });
      if (response) {
        console.log(response.data);
        dispatch(adminLogin(response.data));
        navigate("/admin/dashboard");
      }
    } catch (error) {
      console.error("Error during login:", error);
      if (error.response && error.response.data.message) {
        setError(error.response.data.message); // Show backend error message
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Header /> {/* Including the Header component */}
      <div className="flex-1 flex items-center justify-center">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
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
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
