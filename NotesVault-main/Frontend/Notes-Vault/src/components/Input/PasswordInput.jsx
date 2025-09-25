import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const PasswordInput = ({ value, onChange, placeholder }) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  return (
    <div className="flex items-center border border-gray-300 px-4 rounded-lg mb-3 
                    bg-white focus-within:border-blue-500 focus-within:ring-2 
                    focus-within:ring-blue-100 transition-all duration-200">
      <input
        value={value}
        onChange={onChange}
        type={isShowPassword ? "text" : "password"}
        placeholder={placeholder || "Password"}
        className="w-full text-sm bg-transparent py-2.5 mr-3 rounded outline-none text-gray-700 
                   placeholder-gray-400"
      />
      {isShowPassword ? (
        <FaRegEye
          size={20}
          className="text-blue-600 cursor-pointer hover:text-blue-700 transition"
          onClick={toggleShowPassword}
        />
      ) : (
        <FaRegEyeSlash
          size={20}
          className="text-gray-400 cursor-pointer hover:text-gray-600 transition"
          onClick={toggleShowPassword}
        />
      )}
    </div>
  );
};

export default PasswordInput;
