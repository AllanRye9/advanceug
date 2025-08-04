import React from 'react';
import Agric from '../uaceSubjects/agric.jsx';
import Econ from '../uaceSubjects/econ.jsx';
import Geog from '../uaceSubjects/geog.jsx';
import Gp from '../uaceSubjects/gp.jsx';
import SubMath from '../uaceSubjects/subMath.jsx';


export default function Uace() {
  return (
    <div className="uace">
      <h1>UACE Page</h1>
      <p>This is the UACE page content.</p>
      <ul>
        <li>
          <h2>UACE Subjects</h2>
          <ul>
            <li><Agric /></li>
            <li><Econ /></li>
            <li><Geog /></li>
            <li><Gp /></li>
            <li><SubMath /></li>
          </ul>
        </li>
      </ul>
    </div>
  );
}