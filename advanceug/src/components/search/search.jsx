import React from "react";

export default function Search() {
  return (
    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 m-4">
      <input
        className="w-full sm:w-80 border-2 border-gray-500 rounded-full px-4 py-2 tracking-wide"
        placeholder="Search"
      />
      <button className="w-full sm:w-auto bg-white hover:bg-blue-500 text-gray-800 hover:text-white border-2 border-gray-500 rounded-full px-6 py-2 transition">
        Search
      </button>
    </div>
  );
}
