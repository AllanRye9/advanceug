import React, { useEffect, useState } from "react";

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
      <h1 className="text-xl font-bold">📊 Dashboard for {year}</h1>
      <div style={{ marginTop: "20px" }}>
        {data.map((item, idx) => (
          <div key={idx} style={{
            marginBottom: "20px",
            padding: "10px",
            backgroundColor: "#fff",
            borderRadius: "6px",
            boxShadow: "0 1px 4px rgba(0,0,0,0.1)"
          }}>
            <p><strong>Name:</strong> {item.name}</p>
            <p><strong>Description:</strong> {item.description}</p>
            <p><strong>Value:</strong> {item.value}</p>
            <p><strong>Status:</strong> {item.status}</p>
            <p><strong>Timestamp:</strong> {item.timestamp}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
