import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PasswordInput from '../../components/Input/PasswordInput.jsx';
import { validateEmail } from '../../utils/helper.js';
import axiosInstance from '../../utils/axiosInstance.js';
import safeIcon from '../../assets/images/icons8-safe-96.png';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setError("Please enter a valid password.");
      return;
    }
    setError("");

    try {
      const response = await axiosInstance.post("/login", { email, password });
      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate('/dashboard');
      }
    } catch (error) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-orange-50 px-4">
      
      {/* Logo / Header */}
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold flex items-center justify-center gap-2">
          <span className="text-blue-950">Notes</span>
          <span className="text-orange-500 drop-shadow-md">Vault</span>
          <img src={safeIcon} alt="Safe Icon" className="w-9 h-9" />
        </h1>
        <p className="text-gray-600 mt-2 text-sm">Your secure place for all notes ✨</p>
      </header>

      {/* Login Card */}
      <div className="w-full max-w-md bg-white border rounded-xl shadow-lg px-8 py-8">
        <form onSubmit={handleLogin}>
          <h4 className="text-2xl font-semibold text-center mb-6 text-gray-800">Welcome Back</h4>

          {/* Email */}
          <input
            type="text"
            placeholder="Email"
            className="w-full mb-4 px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password */}
          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Error */}
          {error && <p className="text-red-500 text-xs mt-2">{error}</p>}

          {/* Submit */}
          <button
            type="submit"
            className="w-full mt-5 py-2.5 bg-blue-950 text-white rounded-lg font-medium hover:bg-blue-800 transition"
          >
            Login
          </button>

          {/* Signup Link */}
          <p className="text-sm text-center mt-5 text-gray-600">
            Not registered yet?{" "}
            <Link
              to="/signup"
              className="font-medium text-blue-950 hover:underline"
            >
              Create an Account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
