import React, { useState, useEffect } from "react";

async function fetchAgricData() {
  try {
    const resp = await fetch("https://jsonplaceholder.typicode.com/comments");
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

export default function Agric() {
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
      <h1>Comments</h1>
      {data.map((item) => (
        <div key={item.id}>
          <p><strong>Post ID:</strong> {item.postId}</p>
          <p><strong>Comment ID:</strong> {item.id}</p>
          <p><strong>Name:</strong> {item.name}</p>
          <p><strong>Email:</strong> {item.email}</p>
          <p><br /></p>
        </div>
      ))}
    </div>
  );
}
