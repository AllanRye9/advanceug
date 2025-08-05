import React from "react";
import { useNavigate } from 'react-router-dom';

export default function PleButton() {
  const navigate = useNavigate();
    const handleClick = (name) => {
        if (name === 'ple') {
            navigate('/ple');
        }
        else {
            navigate('/noPage');
        }
    }
  return (
    <div className="max-w-xs rounded-lg overflow-hidden shadow-md bg-white hover:scale-115 transition-transform duration-200">
      <img className="w-full h-32 object-cover" src="/PLE.ico" alt="Card image" />
      <div className="px-4 py-3">
        <div className="flex items-center justify-center font-semibold text-lg mb-1">PLE</div>
        <p className="text-gray-600 text-sm">
          Navigate to this page to find all the past papers and resources for PLE exams.
        </p>
      </div>
      <div className="px-4 pb-4 flex justify-center">
        <button onClick={() => {
          handleClick('ple');
        }} className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-1.5 px-3 rounded">
          Click
        </button>
      </div>
    </div>
  );
}
