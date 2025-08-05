import React, { useState } from 'react';
import Agric from '../uaceSubjects/agric/agric.jsx';
import Econ from '../uaceSubjects/econ/econ.jsx';
import Geog from '../uaceSubjects/geog/geog.jsx';
import Gp from '../uaceSubjects/gp/gp.jsx';
import SubMath from '../uaceSubjects/subMath/subMath.jsx';

export default function Uace() {
  const [activeComponent, setActiveComponent] = useState(null);

  const handleClick = (subject) => {
    setActiveComponent(subject);
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case 'Agric':
        return <Agric />;
      case 'Econ':
        return <Econ />;
      case 'Geog':
        return <Geog />;
      case 'Gp':
        return <Gp />;
      case 'SubMath':
        return <SubMath />;
      default:
        return null;
    }
  };

  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full border-collapse border border-gray-300 shadow-md text-left text-sm">
        <thead className="bg-gray-200 text-gray-700">
          <tr>
            <th className="p-3 border">Subjects</th>
            <th className="p-3 border">Revision</th>
            <th className="p-3 border">Past Papers</th>
            <th className="p-3 border">Notes</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-3 border">Agriculture</td>
            <td className="p-3 border">Revision notes, study groups</td>
            <td onClick={() => handleClick('Agric')} className="p-3 border cursor-pointer hover:bg-green-400">Click here</td>
            <td className="p-3 border">Class notes, online articles</td>
          </tr>
          <tr >
            <td className="p-3 border">Economics</td>
            <td className="p-3 border">Key concepts, graphs</td>
            <td onClick={() => handleClick('Econ')} className="p-3 border cursor-pointer hover:bg-blue-400">Click here</td>
            <td className="p-3 border">Lectures, guides</td>
          </tr>
          <tr>
            <td className="p-3 border">Geography</td>
            <td className="p-3 border">Fieldwork notes</td>
            <td onClick={() => handleClick('Geog')} className="p-3 border cursor-pointer hover:bg-yellow-400">Click here</td>
            <td className="p-3 border">Maps, case studies</td>
          </tr>
          <tr>
            <td className="p-3 border">General Paper</td>
            <td className="p-3 border">Essay structures</td>
            <td  onClick={() => handleClick('Gp')} className=" p-3 border cursor-pointer hover:bg-red-400">Click here</td>
            <td className="p-3 border">Article summaries</td>
          </tr>
          <tr>
            <td className="p-3 border">Sub Math</td>
            <td className="p-3 border">Formulas, theorems</td>
            <td onClick={() => handleClick('SubMath')} className=" p-3 border cursor-pointer hover:bg-purple-400">Click here</td>
            <td className="p-3 border">Reference sheets</td>
          </tr>
        </tbody>
      </table>

      <div className="mt-6">
        {renderComponent()}
      </div>
    </div>
  );
}
