import React from "react";
import HandleClick from './handleClicks.jsx';

export default function Uce() {
    return (
        <div>
            <div className="max-w-xs rounded-lg overflow-hidden shadow-md bg-white hover:scale-115 transition-transform duration-200">
                <img
                    className="w-full h-32 object-cover"
                    src="/UCE.jpg"
                    alt="Card image"
                />
                <div className="px-4 py-3">
                    <div className="font-semibold text-lg mb-1">UCE page</div>
                    <p className="text-gray-600 text-sm">
                        Navigate to this page to find all the past papers and resources for UCE exams.
                    </p>
                </div>
                <div className="px-4 pb-4">
                    <button onClick={() => {
                        console.log("Props data collected");
                        <HandleClick name="uce" />
                    }} className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-1.5 px-3 rounded">
                        Click
                    </button>
                </div>
            </div>
        </div>
    );
}
