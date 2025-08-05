import React, { useState, useEffect } from "react";

async function fetchAgricData() {
  try {
    const resp = await fetch("https://advanceug.onrender.com/api/paper3");
    if (!resp.ok) {
      throw new Error(`HTTP error! status: ${resp.status}`);
    }
    const data = await resp.json();
    console.log("Fetched data:", data);
    return data;
  } catch (err) {
    console.error("Error fetching data:", err);
    return null;
  }
}

export default function AgricContent() {
  const [data, setData] = useState(null);
  const [errData, setErrData] = useState(null);

  useEffect(() => {
    fetchAgricData()
      .then((response) => {
        console.log(response);
        if (response) {
          setData(response);
          setErrData(null);
        } else {
          setErrData("Failed to fetch data");
        }
      })
      .catch((err) => {
        console.error("Error in fetching data:", err);
        setErrData("Error fetching data");
      });
  }, []);

  if (errData) {
    return <div>{errData}</div>;
  }


  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Agriculture</h1>
      <p><strong>Name:</strong> {data.name}</p>
      <p><strong>Description:</strong> {data.description}</p>
      <p><strong>Value:</strong> {data.value}</p>
      <p><strong>Timestamp:</strong> {data.timestamp}</p>
      <p><strong>Status:</strong> {data.status}</p>
      <p><br /></p>
    </div>
  );
}
