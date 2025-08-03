import React from "react";
import HandleClick from './handleClicks.jsx'

export default function Others() {
    return (
        <div className="m-6 max-w-xs rounded-lg overflow-hidden shadow-md bg-white hover:scale-115 transition-transform duration-200">
            <img className="w-full h-32 object-cover" src="/PLE.jpg" alt="Card image" />
            <div className="px-4 py-3">
                <div className="font-semibold text-lg mb-1">Resources</div>
                <p className="text-gray-600 text-sm">
                    Compilation of all resources required for your studies
                </p>
            </div>
            <button onClick={() => {
                console.log("Props data collected");
                <HandleClick name="others" />
            }} className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-1.5 px-3 rounded">
                Click
            </button>
        </div>
    );
}
