import React, { useState } from "react";
import SideNav from "../sideNav/sideNav";
import DashBoard from "../dashboard/dashboard";

export default function AgricContent() {
  const [selectedYear, setSelectedYear] = useState("2024");

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <SideNav onYearSelect={setSelectedYear} />
      <div style={{ flex: 1, padding: "20px", backgroundColor: "#f4f4f4" }}>
        <DashBoard year={selectedYear} />
      </div>
    </div>
  );
}
