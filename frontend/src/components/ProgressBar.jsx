import React from 'react';

function ProgressBar({ progress }) {
  return (
    <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
      <div
        className="bg-blue-500 h-4 rounded-full transition-all duration-500 ease-in-out flex items-center"
        style={{ width: `${progress}%` }}
      >
        <span className="text-xs text-white font-semibold pl-2">{progress}%</span>
      </div>
    </div>
  );
}

export default ProgressBar;