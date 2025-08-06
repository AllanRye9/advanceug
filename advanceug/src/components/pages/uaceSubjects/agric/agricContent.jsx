import React, { useState, useCallback } from "react";
import SideNav from "../sideNav/sideNav";
import DashBoard from "../dashboard/dashboard";

export default function AgricContent() {
  const [selectedYear, setSelectedYear] = useState("2000");
  const [dataError, setDataError] = useState(null);

  const handleYearSelect = useCallback((year) => {
    setSelectedYear(year);
    setDataError(null);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1 overflow-hidden">
        <SideNav 
          onYearSelect={handleYearSelect} 
          selectedYear={selectedYear}
        />
        <div className="flex-1 flex flex-col overflow-auto">
          <DashBoard 
            year={selectedYear} 
            onError={setDataError}
            error={dataError}
          />
        </div>
      </div>
    </div>
  );
}