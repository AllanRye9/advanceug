import React, { useEffect, useState } from "react";

export default function SideNav({ onYearSelect }) {
    const years = Array.from({ length: 25 }, (_, i) => 2000 + i);
    const [selectedYear, setSelectedYear] = useState(null);
    const [yearData, setYearData] = useState(null);
    const [hoveredYear, setHoveredYear] = useState(null);
    const [isOpen, setIsOpen] = useState(window.innerWidth <= 768);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth <= 768;
            setIsMobile(mobile);
            setIsOpen(true); // keep open by default
        };
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
  if (!selectedYear) return;

  fetch(`https://advanceug.onrender.com/api/${selectedYear}`)
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      return res.json(); // ✅ parse JSON
    })
    .then((data) => {
      setYearData(data);   // ✅ store fetched data
      console.log("Fetched data:", data);
    })
    .catch((err) => {
      console.error("Fetch error:", err);
      setYearData({ error: "Failed to load data." });
    });
}, [selectedYear]); // ✅ Remove yearData from dependency array


    const styles = {
        sidebar: {
            width: isMobile ? (isOpen ? "100%" : "0") : "220px",
            height: "96vh",
            backgroundColor: "rgb(244, 244, 244)",
            color: "#333",
            padding: isOpen ? "5px" : "0",
            display: isOpen ? "flex" : "none",
            flexDirection: "column",
            position: isMobile ? "fixed" : "relative",
            top: 0,
            left: 0,
            zIndex: 1000,
            transition: "all 0.3s ease-in-out",
            boxShadow: isOpen ? "2px 0 10px rgba(0,0,0,0.3)" : "none",
        },
        scrollContent: {
            flex: 1,
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "1px",
        },
        toggleBtn: {
            position: "fixed",
            top: "15px",
            left: "15px",
            backgroundColor: "#0074D9",
            color: "#fff",
            border: "none",
            borderRadius: "20px",
            padding: "10px 15px",
            zIndex: 1100,
            display: isMobile ? "block" : "none",
            cursor: "pointer",
            fontSize: "1rem",
        },
        title: {
            fontSize: "1.2rem",
            marginBottom: "10px",
            textAlign: "center",
        },
        button: {
            padding: "10px",
            backgroundColor: "#0074D9",
            border: "none",
            color: "white",
            cursor: "pointer",
            borderRadius: "4px",
            fontSize: "1rem",
            transition: "background-color 0.3s ease",
        },
    };

    return (
        <>
            {isMobile && (
                <button onClick={() => setIsOpen(!isOpen)} style={styles.toggleBtn}>
                    {isOpen ? "❌ Close" : "📚 Menu"}
                </button>
            )}

            <div style={styles.sidebar}>
                <div style={styles.title}>📘 Exam Years</div>
                <div style={styles.scrollContent}>
                    {years.map((year) => (
                        <button
                            key={year}
                            onClick={() => {
                                setSelectedYear(year);
                                onYearSelect(String(year));
                                if (isMobile) setIsOpen(false);
                            }}
                            onMouseEnter={() => setHoveredYear(year)}
                            onMouseLeave={() => setHoveredYear(null)}
                            style={{
                                ...styles.button,
                                backgroundColor:
                                    hoveredYear === year ? "#005fa3" : "#0074D9",
                            }}
                        >
                            {year}
                        </button>
                    ))}
                </div>
            </div>

            {/* Render fetched year data below sidebar */}
            {selectedYear && (
                <div style={{ marginLeft: isMobile ? 0 : "240px", padding: "20px" }}>
                    {yearData?.error ? (
                        <p style={{ color: "red" }}>{yearData.error}</p>
                    ) : yearData?.message && Array.isArray(yearData.message) ? (
                        <div>
                            {yearData.message.map((item, index) => (
                                <div key={index}>
                                    <h2>{item.title}</h2>
                                    <h4>{item.sectionA}</h4>
                                    <ul>
                                        {item.questions?.map((q) => (
                                            <li key={q.number}>
                                                <strong>Q{q.number}:</strong> {q.question}
                                                <ul>
                                                    {Object.entries(q.options || {}).map(
                                                        ([optionKey, optionVal]) => (
                                                            <li key={optionKey}>
                                                                <strong>{optionKey}:</strong> {optionVal}
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            )}

        </>
    );
}
