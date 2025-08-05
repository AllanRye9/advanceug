import React, { useEffect, useState } from "react";

function viewYear(year){
    if (year < 2000) {
        return "Year not supported";
    }
   fetch(`https://advanceug.onrender.com/api/${year}`)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        return data;
    })
    .catch(error => {
        console.error("Error fetching data:", error);
        return null;
    }
    );
}


export default function SideNav({ onYearSelect }) {
    const years = Array.from({ length: 25 }, (_, i) => 2000 + i);

    const [hoveredYear, setHoveredYear] = useState(null);
    const [isOpen, setIsOpen] = useState(window.innerWidth <= 768);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);


    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth <= 768;
            setIsMobile(mobile);
            setIsOpen(mobile ? true : true); // always true on larger screens
        };

        handleResize(); // call once on load

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);



    const styles = {
        sidebar: {
            width: isMobile ? (isOpen ? "100%" : "0") : "220px",
            height: "96vh", // make it full height of screen
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
                            { viewYear(year) || year }
                        </button>
                    ))}
                </div>
            </div>

        </>
    );
}
