import React, { useState } from 'react'
import { MdAdd, MdClose } from 'react-icons/md'

const TagInput = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => setInputValue(e.target.value);

  const addNewTag = () => {
    if (inputValue.trim() !== "" && !tags.includes(inputValue.trim())) {
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addNewTag();
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div>
      {/* Tag List */}
      {tags?.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap mt-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="flex items-center gap-1 text-sm bg-blue-100 text-blue-700 
                         px-3 py-1 rounded-full shadow-sm hover:bg-blue-200 transition"
            >
              #{tag}
              <button
                onClick={() => handleRemoveTag(tag)}
                className="ml-1 text-blue-500 hover:text-red-500 transition"
              >
                <MdClose size={16} />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Input + Add Button */}
      <div className="flex items-center gap-3 mt-3">
        <input
          type="text"
          value={inputValue}
          className="flex-1 text-sm border border-gray-300 px-3 py-2 rounded-lg 
                     outline-none focus:border-blue-500 focus:ring-2 
                     focus:ring-blue-100 transition"
          placeholder="Add tags"
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <button
          className="w-9 h-9 flex items-center justify-center rounded-lg 
                     border border-blue-600 text-blue-600 
                     hover:bg-blue-600 hover:text-white transition"
          onClick={addNewTag}
        >
          <MdAdd size={20} />
        </button>
      </div>
    </div>
  );
};

export default TagInput;
