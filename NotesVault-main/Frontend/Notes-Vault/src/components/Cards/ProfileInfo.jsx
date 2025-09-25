import React from 'react';
import { getInitials } from '../../utils/helper';
import { MdLogout } from 'react-icons/md';
import { FaUserCircle } from 'react-icons/fa';

const ProfileInfo = ({ userInfo, onLogout }) => {
  if (!userInfo) {
    return (
      <div className="w-12 h-12 rounded-full bg-gray-200 animate-pulse flex items-center justify-center">
        <FaUserCircle className="text-gray-400 text-3xl" />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4 p-3 bg-white rounded-xl shadow-md border border-gray-100">
      {/* Avatar */}
      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-blue-800 text-white text-lg font-bold shadow">
        {getInitials(userInfo.fullName)}
      </div>

      {/* Info */}
      <div className="flex flex-col items-start justify-center leading-tight">
        <span className="text-base font-semibold text-gray-900 truncate max-w-[140px] sm:max-w-[180px]">
          {userInfo.fullName}
        </span>
        <span className="text-xs text-gray-500 font-medium mb-1">{userInfo.role || "User"}</span>
        <button
          className="flex items-center gap-1 text-xs text-red-500 hover:text-red-600 transition font-semibold"
          onClick={onLogout}
        >
          <MdLogout className="text-base" /> Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileInfo;
