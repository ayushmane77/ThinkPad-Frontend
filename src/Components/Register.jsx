

import { useState } from "react";
import { registerUser } from "../API/authAPI.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: ""
  });

  const [errorObj, setErrorObj] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();


  function handleInput(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  function validate() {
    let errors = {};

    if (!formData.userName.trim()) {
      errors.userName = "Username is required";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Invalid email";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6 || formData.password.length > 20) {
      errors.password = "Password must be 6–20 characters";
    }

    setErrorObj(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(e) {
  e.preventDefault();

  if (!validate()) return;

  try {
    setLoading(true);
    setServerError("");

    const response = await registerUser(formData);
    console.log("Register success:", response);
    toast.success("Account created! Please login.");


    // ✅ IMPORTANT: navigate only after success
    console.log("Navigating to login...");

    navigate("/login");

  } catch (error) {
    toast.error(error.message);

    setServerError(error.message);
  } finally {
    setLoading(false);
  }
}


  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
            Create Account
          </h1>
          <p className="text-gray-400 mt-2 text-lg">Join the dark side</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-gray-900/80 backdrop-blur-xl border border-gray-800/50 rounded-3xl p-10 shadow-2xl shadow-black/50"
        >
          {/* Username Field */}
          <div className="mb-8">
            <input
              name="userName"
              value={formData.userName}
              onChange={handleInput}
              placeholder="Username"
              className="w-full px-6 py-4 bg-gray-800/50 border border-gray-700/50 rounded-2xl text-white placeholder-gray-400 
                         focus:outline-none focus:ring-4 focus:ring-purple-500/30 focus:border-purple-500/70
                         transition-all duration-300 hover:border-gray-600/70 text-lg backdrop-blur-sm"
            />
            {errorObj.userName && (
              <p className="mt-2 text-red-400 text-sm font-medium flex items-center">
                <span className="w-1.5 h-1.5 bg-red-400 rounded-full mr-2 animate-pulse"></span>
                {errorObj.userName}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div className="mb-8">
            <input
              name="email"
              value={formData.email}
              onChange={handleInput}
              placeholder="Email"
              className="w-full px-6 py-4 bg-gray-800/50 border border-gray-700/50 rounded-2xl text-white placeholder-gray-400 
                         focus:outline-none focus:ring-4 focus:ring-purple-500/30 focus:border-purple-500/70
                         transition-all duration-300 hover:border-gray-600/70 text-lg backdrop-blur-sm"
            />
            {errorObj.email && (
              <p className="mt-2 text-red-400 text-sm font-medium flex items-center">
                <span className="w-1.5 h-1.5 bg-red-400 rounded-full mr-2 animate-pulse"></span>
                {errorObj.email}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-10">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInput}
              placeholder="Password"
              className="w-full px-6 py-4 bg-gray-800/50 border border-gray-700/50 rounded-2xl text-white placeholder-gray-400 
                         focus:outline-none focus:ring-4 focus:ring-purple-500/30 focus:border-purple-500/70
                         transition-all duration-300 hover:border-gray-600/70 text-lg backdrop-blur-sm"
            />
            {errorObj.password && (
              <p className="mt-2 text-red-400 text-sm font-medium flex items-center">
                <span className="w-1.5 h-1.5 bg-red-400 rounded-full mr-2 animate-pulse"></span>
                {errorObj.password}
              </p>
            )}
          </div>

          {serverError && (
            <p className="mb-4 text-red-400 text-center font-medium">
              {serverError}
            </p>
          )}


          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-5 px-8 rounded-2xl font-bold text-lg
    ${loading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 hover:opacity-90"}
  `}
          >
            {loading ? "Registering..." : "Register Now"}
          </button>

        </form>

        {/* Subtle glow effect container */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-pink-500/5 blur-3xl -z-10 animate-pulse"></div>
      </div>
    </div>
  );
};

export default Register;

