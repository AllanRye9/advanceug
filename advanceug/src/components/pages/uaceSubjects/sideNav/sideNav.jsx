import React, { useEffect, useState } from "react";

export default function SideNav({ onYearSelect, selectedYear: propSelectedYear }) {
    const years = Array.from({ length: 25 }, (_, i) => 2000 + i);
    const [localSelectedYear, setLocalSelectedYear] = useState(propSelectedYear);
    const [hoveredYear, setHoveredYear] = useState(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [isOpen, setIsOpen] = useState(window.innerWidth <= 768);

    useEffect(() => {
        setLocalSelectedYear(propSelectedYear);
    }, [propSelectedYear]);

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth <= 768;
            setIsMobile(mobile);
            if (mobile) {
                setIsOpen(true);
            } else {
                setIsOpen(true);
            }
        };
        
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleYearClick = (year) => {
        setLocalSelectedYear(year);
        if (onYearSelect) {
            onYearSelect(year);
        }
        if (isMobile) {
            setIsOpen(false);
        }
    };

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const styles = {
        sidebar: {
            width: isMobile ? (isOpen ? "250px" : "0") : "220px",
            height: "100vh",
            backgroundColor: "#f8f9fa",
            color: "#333",
            padding: isOpen ? "20px" : "0",
            display: "flex",
            flexDirection: "column",
            position: "fixed",
            top: 10,
            left: 0,
            zIndex: 1000,
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            boxShadow: isOpen ? "4px 0 15px rgba(0,0,0,0.1)" : "none",
            overflow: "hidden",
        },
        overlay: {
            position: "fixed",
            top: 10,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 999,
            display: isMobile && isOpen ? "block" : "none",
            transition: "opacity 0.3s ease",
        },
        button: {
            padding: "8px 4px",
            margin: "4px 0",
            backgroundColor: "#0074D9",
            border: "none",
            color: "white",
            cursor: "pointer",
            borderRadius: "6px",
            fontSize: "0.9rem",
            transition: "all 0.2s ease",
            textAlign: "center",
            width: "100%",
            minWidth: "80px",
            flexShrink: 0,
        },
        toggleBtn: {
            position: "fixed",
            top: "20px",
            left: isOpen && isMobile ? "calc(250px + 20px)" : "20px",
            backgroundColor: "#0074D9",
            color: "#fff",
            border: "none",
            borderRadius: "50%",
            padding: "12px",
            width: "64px",
            height: "48px",
            zIndex: 1100,
            display: isMobile ? "flex" : "none",
            cursor: "pointer",
            fontSize: "1.2rem",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
            transition: "all 0.3s ease",
        },
        title: {
            fontSize: "1.1rem",
            marginBottom: "15px",
            textAlign: "center",
            padding: "10px 0",
            fontWeight: "600",
            color: "#2c3e50",
            borderBottom: "2px solid #e0e0e0",
        },
        scrollContent: {
            flex: 1,
            overflowY: "auto",
            paddingRight: "8px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
        },
        yearsContainer: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))",
            gap: "8px",
            width: "100%",
        }
    };

    return (
        <>
            {/* Overlay for mobile */}
            <div 
                style={styles.overlay} 
                onClick={toggleSidebar}
                aria-hidden="true"
            />

            {/* Toggle button */}
            {isMobile && (
                <button 
                    onClick={toggleSidebar} 
                    style={styles.toggleBtn}
                    aria-label={isOpen ? "Close menu" : "Open menu"}
                    aria-expanded={isOpen}
                >
                    {isOpen ? "×" : "☰"}
                </button>
            )}

            {/* Sidebar content */}
            <div style={styles.sidebar}>
                <div style={styles.title}>📘 Exam Years</div>
                <div style={styles.scrollContent}>
                    <div style={styles.yearsContainer}>
                        {years.map((year) => (
                            <button
                                key={year}
                                onClick={() => handleYearClick(year)}
                                onMouseEnter={() => setHoveredYear(year)}
                                onMouseLeave={() => setHoveredYear(null)}
                                style={{
                                    ...styles.button,
                                    backgroundColor: 
                                        localSelectedYear === year ? "#2a7f3a" :
                                        hoveredYear === year ? "#0062a3" : "#0074D9",
                                    transform: hoveredYear === year ? "scale(1.03)" : "scale(1)",
                                    boxShadow: localSelectedYear === year ? "0 2px 8px rgba(0,0,0,0.15)" : "none",
                                    fontWeight: localSelectedYear === year ? "600" : "400"
                                }}
                                aria-current={localSelectedYear === year ? "true" : undefined}
                            >
                                {year}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}