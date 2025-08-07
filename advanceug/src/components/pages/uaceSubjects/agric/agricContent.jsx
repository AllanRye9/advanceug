import React, { useState, useCallback } from "react";
import SideNav from "../sideNav/sideNav";
import DashBoard from "../dashboard/dashboard";

export default function AgricContent() {
  const [selectedYear, setSelectedYear] = useState("2000");
  const [dataError, setDataError] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleYearSelect = useCallback((year) => {
    setSelectedYear(year);
    setDataError(null);
  }, []);

  const handleToggleFullScreen = useCallback((state) => {
    setIsFullScreen(state);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1 overflow-hidden">
        {!isFullScreen && (
          <SideNav 
            onYearSelect={handleYearSelect} 
            selectedYear={selectedYear}
          />
        )}
        <div className={`flex-1 flex flex-col overflow-auto ${isFullScreen ? 'full-screen-content' : ''}`}>
          <DashBoard 
            year={selectedYear} 
            onError={setDataError}
            error={dataError}
            onToggleFullScreen={handleToggleFullScreen}
            isFullScreen={isFullScreen}
          />
        </div>
      </div>
    </div>
  );
}