import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Agric() {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  const papers = {
    name: "Agric",
    paper: [1, 2, 3],
  };

  const handleNavigation = (paperNumber) => {
    setShowPopup(false); // Close popup
    if (paperNumber === 1) {
      navigate("/agricContent");
    } else if (paperNumber === 2) {
      navigate("/agricContent2");
    } else if (paperNumber === 3) {
      navigate("/agricContent3");
    } else {
      navigate("/noPage");
    }
  };

  return (
    <div className="p-6 flex items-center justify-center">
      {(
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80">
            <h2 className="text-xl font-bold mb-4 text-center">Select Paper</h2>
            <div className="flex flex-col space-y-3">
              {() => showPopup === false ? setShowPopup(true) : null}
              {papers.paper.map((paperNum) => (
                <button
                  key={paperNum}
                  onClick={() => handleNavigation(paperNum)}
                  className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded"
                >
                  Paper {paperNum}
                </button>
              ))}
            </div>
            <button
              onClick={() =>{
                setShowPopup(false) || navigate("/uace") || navigate("/");
              }}
              className="mt-6 w-full bg-gray-400 hover:bg-gray-600 text-white py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
