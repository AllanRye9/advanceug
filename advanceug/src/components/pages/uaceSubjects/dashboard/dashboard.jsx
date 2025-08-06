import React, { useEffect, useState } from "react";
import SideNav from "../sideNav/sideNav";

async function fetchAgricData() {
  try {
    const resp = await fetch(`https://advanceug.onrender.com/api/paper1`);
    if (!resp.ok) throw new Error(`HTTP error! status: ${resp.status}`);
    return await resp.json();
  } catch (err) {
    console.error("Error fetching data:", err);
    return null;
  }
}

export default function DashBoard({ year }) {
  const [data, setData] = useState(null);
  const [err, setErr] = useState(null);

  useEffect(() => {
    fetchAgricData(year).then((response) => {
      if (response) {
        setData(response);
        setErr(null);
      } else {
        setErr("Failed to load data.");
        setData(null);
      }
    });
  }, [year]);

  if (err) return <div style={{ color: "red" }}>{err}</div>;
  if (!data) return <div>Loading data for {year}...</div>;

  return (
    <div>
      {data.paper1 || null}
    </div>
  );
}
