import React from "react";
import Agric from '../pages/uaceSubjects/agric.jsx'
import Econ from '../pages/uaceSubjects/econ.jsx'
import Gp from '../pages/uaceSubjects/gp.jsx'
import SubMath from '../pages/uaceSubjects/subMath.jsx'
import Geog from '../pages/uaceSubjects/geog.jsx'
import { useNavigate } from 'react-router-dom';


export default function UaceButton() {
    const navigate = useNavigate();
    const handleClick = (name) => {
        if (name === 'uace') {
            navigate('/uace');
        }
        else {
            navigate('/noPage');
        }
    }
    return (
        <div>
            <div className="max-w-xs rounded-lg overflow-hidden shadow-md bg-white hover:scale-115 transition-transform duration-200">
                <img className="w-full h-32 object-cover" src="/UACE.ico" alt="Card image" />
                <div className="px-4 py-3">
                    <div className="font-semibold text-lg mb-1">UACE page</div>
                    <p className="text-gray-600 text-sm">
                        Navigate to this page to find all the past papers and resources for UACE exams.
                    </p>
                </div>
                <div className="px-4 pb-4 flex justify-center">
                    <button onClick={() => {
                        handleClick('uace');
                    }} className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-1.5 px-3 rounded">
                        Click
                    </button>
                </div>
            </div>
        </div>
    );
}