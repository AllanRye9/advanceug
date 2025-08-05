import React from "react";
import { useNavigate } from 'react-router-dom';

export default function UceButton() {
    const navigate = useNavigate();
    const handleClick = (name) =>{
        if (name === "uce"){
            navigate("/uce");
        }
        else{
            navigate("/noPage");
        }
    }
    return (
        <div>
            <div className="max-w-xs rounded-lg overflow-hidden shadow-md bg-white hover:scale-115 transition-transform duration-200">
                <img
                    className="w-full h-32 object-cover"
                    src="/UCE.ico"
                    alt="Card image"
                />
                <div className="px-4 py-3">
                    <div className="flex items-center justify-center font-semibold text-lg mb-1">UCE</div>
                    <p className="text-gray-600 text-sm">
                        Navigate to this page to find all the past papers and resources for UCE exams.
                    </p>
                </div>
                <div className="px- pb-4 flex justify-center">
                    <button onClick={() => {
                       handleClick('uce');
                    }} className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-1.5 px-3 rounded">
                        Click
                    </button>
                </div>
            </div>
        </div>
    );
}
