import React, { useState, useEffect } from 'react';
import Agric from '../uaceSubjects/agric/agric.jsx';
import Econ from '../uaceSubjects/econ/econ.jsx';
import Geog from '../uaceSubjects/geog/geog.jsx';
import Gp from '../uaceSubjects/gp/gp.jsx';
import SubMath from '../uaceSubjects/subMath/subMath.jsx';

export default function Uace() {
  const [activeComponent, setActiveComponent] = useState(null);
  const [hoveredSubject, setHoveredSubject] = useState(null);
  const [shouldScroll, setShouldScroll] = useState(false);

  const handleClick = (subject) => {
    setActiveComponent(subject);
    setShouldScroll(true);
  };

  useEffect(() => {
    if (shouldScroll && activeComponent) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setShouldScroll(false);
    }
  }, [shouldScroll, activeComponent]);

  const handleHover = (subject) => {
    setHoveredSubject(subject);
  };

  const handleMouseLeave = () => {
    setHoveredSubject(null);
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
        return (
          <div className="flex items-center justify-center p-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg shadow-inner">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-700 mb-2">Welcome to UACE Resources</h3>
              <p className="text-gray-600">Click on a subject to view past papers and resources</p>
            </div>
          </div>
        );
    }
  };

  const subjectColors = {
    Agric: 'green',
    Econ: 'blue',
    Geog: 'yellow',
    Gp: 'red',
    SubMath: 'purple'
  };

  const getHoverColor = (subject) => {
    const color = subjectColors[subject] || 'gray';
    return `hover:bg-${color}-500 hover:text-white hover:shadow-lg`;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Content Section (will move to top when selected) */}
        <div 
          id="content-section" 
          className={`bg-white rounded-xl shadow-lg overflow-hidden p-6 transition-all duration-300 mb-8 ${
            activeComponent ? 'sticky top-4 z-10' : ''
          }`}
        >
          {renderComponent()}
        </div>

        {/* Table Section */}
        <div>
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">UACE Subject Resources</h1>
          
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                  <tr>
                    <th className="p-4 text-left font-semibold">Subjects</th>
                    <th className="p-4 text-left font-semibold">Past Papers</th>
                    <th className="p-4 text-left font-semibold">Study Materials</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {[
                    { name: 'Agriculture', key: 'Agric', notes: 'Class notes, online articles' },
                    { name: 'Economics', key: 'Econ', notes: 'Lectures, guides' },
                    { name: 'Geography', key: 'Geog', notes: 'Maps, case studies' },
                    { name: 'General Paper', key: 'Gp', notes: 'Article summaries' },
                    { name: 'Subsidiary Mathematics', key: 'SubMath', notes: 'Reference sheets' }
                  ].map((subject) => (
                    <tr 
                      key={subject.key}
                      className={`transition-all duration-200 ${hoveredSubject === subject.key ? 'bg-gray-50' : ''}`}
                      onMouseEnter={() => handleHover(subject.key)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <td className="p-4 font-medium text-gray-700">{subject.name}</td>
                      <td 
                        onClick={() => handleClick(subject.key)}
                        className={`p-4 cursor-pointer transition-all duration-200 ${getHoverColor(subject.key)} font-medium`}
                      >
                        <span className="inline-flex items-center">
                          View Papers
                          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </td>
                      <td className="p-4 text-gray-600">{subject.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}