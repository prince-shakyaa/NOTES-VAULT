
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PasswordInput from '../../components/Input/PasswordInput';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';
import safeIcon from '../../assets/images/icons8-safe-96.png';

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!name) {
      setError("Please enter your name.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setError("Please enter the password");
      return;
    }
    setError("");

    try {
      const response = await axiosInstance.post("/create-account", {
        fullName: name,
        email: email,
        password: password,
      });

      if (response.data && response.data.error) {
        setError(response.data.message);
        return;
      }

      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate('/login');
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-start min-h-screen bg-gray-50 px-4 pt-4 sm:px-6 sm:pt-6">
        <header className="w-full py-4 px-6 bg-white shadow-sm mb-6">
          <div className="flex items-center justify-center gap-2">
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <span className="text-blue-950">Notes</span>{' '}
              <span className="text-orange-500 drop-shadow-md">Vault</span>
              <img src={safeIcon} alt="Safe Icon" className="w-8 h-8" />
            </h1>
          </div>
        </header>

        <div className="w-[90%] max-w-md border rounded bg-white px-6 py-6 shadow-md">
          <form onSubmit={handleSignUp}>
            <h4 className="text-3xl mb-7 text-center">Sign Up</h4>

            <input
              type="text"
              placeholder="Name"
              className="input-box mb-3"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="text"
              placeholder="Email"
              className="input-box mb-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-box mb-3"
            />

            {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

            <button type="submit" className="btn-primary w-full">
              Create Account
            </button>

            <p className="text-sm text-center mt-4">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-blue-950 underline"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;

