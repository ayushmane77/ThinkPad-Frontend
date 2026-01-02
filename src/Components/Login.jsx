import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { loginUser } from "../API/authAPI.js";
import { useAuth } from "../Context/AuthContext.jsx";
import { toast } from "react-toastify";
// import {toastContainer, toast} from 'react-toastify'
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const { login } = useAuth();
  const notify = () => toast("Wow so easy!");


  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const [errorObj, setErrorObj] = useState({});

  function handleInput(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  function validate() {
    let errors = {};

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Invalid email";
    }

    if (!formData.password) {
      errors.password = "Password is required";
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

      const response = await loginUser(formData);
      console.log("Login success:", response);

      // // ✅ Save token
      // localStorage.setItem("token", response.token);

      // // ✅ Redirect (later → /notes)
      // navigate("/");

      login(response.token);
      // notify();
      // toastContainer(); // Show toast notification
      toast.success("Login successful!");

      navigate("/notes");

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

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
            Welcome Back
          </h1>
          <p className="text-gray-400 mt-2 text-lg">
            Login to continue
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-gray-900/80 backdrop-blur-xl border border-gray-800/50 rounded-3xl p-10 shadow-2xl"
        >
          {/* Email */}
          <div className="mb-8">
            <input
              name="email"
              value={formData.email}
              onChange={handleInput}
              placeholder="Email"
              className="w-full px-6 py-4 bg-gray-800/50 border border-gray-700/50 rounded-2xl text-white placeholder-gray-400
                         focus:outline-none focus:ring-4 focus:ring-purple-500/30 focus:border-purple-500/70
                         transition-all duration-300 text-lg"
            />
            {errorObj.email && (
              <p className="mt-2 text-red-400 text-sm">
                {errorObj.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="mb-10">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInput}
              placeholder="Password"
              className="w-full px-6 py-4 bg-gray-800/50 border border-gray-700/50 rounded-2xl text-white placeholder-gray-400
                         focus:outline-none focus:ring-4 focus:ring-purple-500/30 focus:border-purple-500/70
                         transition-all duration-300 text-lg"
            />
            {errorObj.password && (
              <p className="mt-2 text-red-400 text-sm">
                {errorObj.password}
              </p>
            )}
          </div>

          {serverError && (
            <p className="mb-4 text-red-400 text-center font-medium">
              {serverError}
            </p>
          )}


          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-5 px-8 rounded-2xl font-bold text-lg
    ${loading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 hover:opacity-90"}
  `}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

      </div>
    </div>
  );
};

export default Login;
