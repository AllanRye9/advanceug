import React, { useState, useEffect } from "react";

async function fetchAgricData3() {
  try {
    const resp = await fetch("http://127.0.0.1:8099/api/paper3");
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

export default function AgricContent3() {
  const [data, setData] = useState(null);
  const [errData, setErrData] = useState(null);

  useEffect(() => {
    fetchAgricData3()
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
      {
        data.map((items, key) =>{
          return (
            <div key={key}>
              <p><strong>Name:</strong>{items.name}</p>
              <p><strong>Description:</strong>{items.description}</p>
              <p><strong>Value:</strong>{items.value}</p>
              <p><strong>Timestamp:</strong>{items.timestamp}</p>
              <p><strong>Status:</strong>{items.status}</p>
            </div>
          );
        })
      }
    </div>
  );
}
