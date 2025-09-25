import moment from 'moment';
import React from 'react';
import { MdOutlinePushPin, MdCreate, MdDelete } from 'react-icons/md';
import { FaUserCircle } from 'react-icons/fa';

const NoteCard = ({ title, date, content, tags, isPinned, onEdit, onDelete, onPinNote, user }) => {
  return (
    <div className="border border-gray-200 rounded-xl p-4 bg-gradient-to-br from-[#fdfbfb] to-[#ebedee] 
      hover:shadow-xl hover:scale-[1.02] transition-all ease-in-out flex flex-col justify-between h-full animate-fadein">
      {/* Title + Date + Pin + Avatar */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-1">
            <FaUserCircle className="text-blue-400 text-xl" />
            <h6 className="text-lg font-bold text-gray-900 break-words">{title}</h6>
          </div>
          <span className="text-xs text-gray-500">{moment(date).format('Do MMM YYYY')}</span>
        </div>
        <MdOutlinePushPin
          className={`text-2xl cursor-pointer transition-all duration-200 ${
            isPinned ? 'text-yellow-500 hover:text-yellow-600' : 'text-gray-300 hover:text-gray-500'
          }`}
          onClick={onPinNote}
        />
      </div>

      {/* Content */}
      <p className="text-sm text-gray-700 mt-3 leading-relaxed">
        {content?.slice(0, 120)}
        {content?.length > 120 && '...'}
      </p>

      {/* Tags + Icons */}
      <div className="flex flex-wrap items-center justify-between mt-4 gap-2">
        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {tags.length === 0 ? (
            <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-400 font-medium">No tags</span>
          ) : (
            tags.map((item) => (
              <span
                key={item}
                className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700 font-medium hover:bg-blue-200 shadow-sm"
              >
                #{item}
              </span>
            ))
          )}
        </div>

        {/* Icons */}
        <div className="flex items-center gap-3">
          <MdCreate
            className="text-xl text-gray-400 cursor-pointer hover:text-green-500 transition"
            onClick={onEdit}
          />
          <MdDelete
            className="text-xl text-gray-400 cursor-pointer hover:text-red-500 transition"
            onClick={onDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
