import React from "react";
import Agric from '../pages/agric.jsx'
import Econ from '../pages/econ.jsx'
import Gp from '../pages/gp.jsx'
import SubMath from '../pages/subMath.jsx'
import Geog from '../pages/geog.jsx'
import HandleClick from './handleClicks.jsx'

// function ResLogs() {
//     return (
//         <div>
//             console.log("Button cliked");
//             alert(`button clicked : <Agric />`)
//             <Agric />
//             <Geog />
//             <Econ />
//             <Gp />
//             <SubMath />
//         </div>
//     );
// }

export default function Uace() {
    return (
        <div>
            <div className="max-w-xs rounded-lg overflow-hidden shadow-md bg-white hover:scale-115 transition-transform duration-200">
                <img className="w-full h-32 object-cover" src="/UACE.jpg" alt="Card image" />
                <div className="px-4 py-3">
                    <div className="font-semibold text-lg mb-1">UACE page</div>
                    <p className="text-gray-600 text-sm">
                        Navigate to this page to find all the past papers and resources for UACE exams.
                    </p>
                </div>
                <div className="px-4 pb-4">
                    <button onClick={() => {
                        console.log("Props data collected");
                        <HandleClick name="uace" />
                    }} className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-1.5 px-3 rounded">
                        Click
                    </button>
                </div>
            </div>
        </div>
    );
}