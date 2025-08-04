import React from "react";
import { useNavigate } from 'react-router-dom';


export default function OthersButton() {
    const navigate = useNavigate();
    const handleClick = (name) => {
        if (name === 'others') {
            navigate('/others');
        }
        else {
            navigate('/noPage');
        }
    }
    return (
        <div className="m-6 max-w-xs rounded-lg overflow-hidden shadow-md bg-white hover:scale-115 transition-transform duration-200">
            <img className="w-full h-32 object-cover" src="/PLE.ico" alt="Card image" />
            <div className="px-4 py-3">
                <div className="font-semibold text-lg mb-1">Resources</div>
                <p className="text-gray-600 text-sm">
                    Compilation of all resources required for your studies
                </p>
            </div>
            <div className="flex justify-center">

            <button onClick={() => {
                handleClick('others');
            }} className="flex-end bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-1.5 px-3 rounded">
                Click
            </button>
            </div>
        </div>
    );
}
