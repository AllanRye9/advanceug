import React, { useEffect, useState, useRef } from "react";
import { jsPDF } from "jspdf";

async function fetchAgricData(year) {
  try {
    const resp = await fetch(`http://127.0.0.1:8099/api/${year}`);
    if (!resp.ok) {
      throw new Error(`HTTP error! status: ${resp.status}`);
    }
    const data = await resp.json();
    
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid data format received');
    }
    
    return data;
  } catch (err) {
    console.error("Error fetching data:", err);
    throw err;
  }
}

export default function DashBoard({ year, onError, error, onToggleFullScreen }) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showFullContent, setShowFullContent] = useState(false);
  const [showAnswers, setShowAnswers] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const contentRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const response = await fetchAgricData(year);
        setData(response);
        onError(null);
      } catch (err) {
        const errorMsg = err.message || 'Failed to load data';
        onError(errorMsg);
        setData(null);
      } finally {
        setIsLoading(false);
      }
    };

    if (year) {
      loadData();
    }
  }, [year, onError]);

  const toggleAnswers = () => {
    setShowAnswers(!showAnswers);
  };

  const toggleFullScreen = () => {
    const newFullScreenState = !isFullScreen;
    setIsFullScreen(newFullScreenState);
    if (onToggleFullScreen) {
      onToggleFullScreen(newFullScreenState);
    }
    // When entering full screen, automatically show all content
    if (!isFullScreen) {
      setShowFullContent(true);
    }
  };

  const generatePDF = () => {
    if (!data?.exam) return;
  
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width - 30;
    const margin = 15;
    let yPosition = 20;
    const lineHeight = 7;
    const sectionGap = 10;
  
    // Add title
    doc.setFontSize(18);
    doc.text(`${data.exam.title} - ${year}`, margin, yPosition);
    yPosition += 20;
  
    data.exam.sections?.forEach(section => {
      if (yPosition > 270) {
        doc.addPage();
        yPosition = 20;
      }
  
      doc.setFontSize(14);
      const sectionTitle = `${section.name}${section.marks ? ` (${section.marks} marks)` : ''}`;
      doc.text(sectionTitle, margin, yPosition);
      yPosition += lineHeight + 5;
  
      if (section.instructions) {
        doc.setFontSize(12);
        doc.setFont(undefined, 'italic');
        const instructions = doc.splitTextToSize(section.instructions, pageWidth);
        doc.text(instructions, margin, yPosition);
        yPosition += (instructions.length * lineHeight) + sectionGap;
        doc.setFont(undefined, 'normal');
      }
  
      section.questions?.forEach(question => {
        if (yPosition > 270) {
          doc.addPage();
          yPosition = 20;
        }
  
        if (question.parts) {
          if (question.text) {
            doc.setFontSize(12);
            doc.setFont(undefined, 'bold');
            const qText = doc.splitTextToSize(`${question.number}. ${question.text}`, pageWidth);
            doc.text(qText, margin, yPosition);
            yPosition += (qText.length * lineHeight) + 5;
            doc.setFont(undefined, 'normal');
          }
  
          question.parts.forEach(part => {
            if (yPosition > 270) {
              doc.addPage();
              yPosition = 20;
            }
  
            doc.setFontSize(12);
            doc.setFont(undefined, 'bold');
            const partHeader = `${question.number}(${part.letter}) ${part.text}`;
            const partHeaderLines = doc.splitTextToSize(partHeader, pageWidth);
            doc.text(partHeaderLines, margin, yPosition);
            yPosition += (partHeaderLines.length * lineHeight) + 3;
            doc.setFont(undefined, 'normal');
  
            if (part.parts) {
              part.parts.forEach(subPart => {
                if (yPosition > 270) {
                  doc.addPage();
                  yPosition = 20;
                }
  
                doc.setFontSize(11);
                doc.setFont(undefined, 'bold');
                const subPartHeader = `${question.number}(${part.letter})(${subPart.number}) ${subPart.text}`;
                doc.text(subPartHeader, margin + 5, yPosition);
                yPosition += lineHeight;
                doc.setFont(undefined, 'normal');
  
                if (showAnswers && Array.isArray(subPart.answer)) {
                  subPart.answer.forEach(answer => {
                    if (yPosition > 280) {
                      doc.addPage();
                      yPosition = 20;
                    }
                    const answerText = typeof answer === 'object' ? 
                      `${answer.term}: ${answer.definition}` : 
                      answer;
                    const lines = doc.splitTextToSize(`- ${answerText}`, pageWidth - 10);
                    doc.text(lines, margin + 10, yPosition);
                    yPosition += (lines.length * lineHeight);
                  });
                }
                yPosition += 5;
              });
            } else {
              if (showAnswers && Array.isArray(part.answer)) {
                part.answer.forEach(answer => {
                  if (yPosition > 280) {
                    doc.addPage();
                    yPosition = 20;
                  }
                  const answerText = typeof answer === 'object' ? 
                    `${answer.term}: ${answer.definition}` : 
                    answer;
                  const lines = doc.splitTextToSize(`- ${answerText}`, pageWidth - 10);
                  doc.text(lines, margin + 10, yPosition);
                  yPosition += (lines.length * lineHeight);
                });
              } else if (showAnswers && typeof part.answer === 'object' && part.answer !== null) {
                Object.entries(part.answer).forEach(([key, value]) => {
                  if (yPosition > 280) {
                    doc.addPage();
                    yPosition = 20;
                  }
                  doc.setFont(undefined, 'bold');
                  doc.text(`${key}:`, margin + 10, yPosition);
                  yPosition += lineHeight;
                  doc.setFont(undefined, 'normal');
                  
                  if (Array.isArray(value)) {
                    value.forEach(item => {
                      const lines = doc.splitTextToSize(`- ${item}`, pageWidth - 15);
                      doc.text(lines, margin + 15, yPosition);
                      yPosition += (lines.length * lineHeight);
                    });
                  }
                });
              }
              yPosition += 5;
            }
          });
        } else {
          doc.setFontSize(12);
          doc.setFont(undefined, 'bold');
          const qHeader = `Q${question.number}. ${question.text}`;
          const qHeaderLines = doc.splitTextToSize(qHeader, pageWidth);
          doc.text(qHeaderLines, margin, yPosition);
          yPosition += (qHeaderLines.length * lineHeight);
          doc.setFont(undefined, 'normal');
  
          if (question.options) {
            question.options.forEach(option => {
              if (yPosition > 280) {
                doc.addPage();
                yPosition = 20;
              }
              doc.text(option, margin + 10, yPosition);
              yPosition += lineHeight;
            });
          }
  
          if (showAnswers) {
            if (yPosition > 280) {
              doc.addPage();
              yPosition = 20;
            }
            doc.setFont(undefined, 'bold');
            doc.setTextColor(39, 174, 96);
            doc.text(`Answer: ${question.answer}`, margin, yPosition);
            doc.setFont(undefined, 'normal');
            doc.setTextColor(0, 0, 0);
            yPosition += lineHeight;
          }
          
          yPosition += sectionGap;
        }
      });
    });
  
    if (data.exam.footer) {
      if (yPosition > 270) {
        doc.addPage();
        yPosition = 20;
      }
      doc.setFontSize(10);
      doc.setFont(undefined, 'italic');
      const footerLines = doc.splitTextToSize(data.exam.footer.content, pageWidth);
      doc.text(footerLines, margin, yPosition);
    }
  
    doc.save(`${data.exam.title.replace(/\s+/g, '-')}-${year}.pdf`);
  };

  const toggleContent = () => {
    setShowFullContent(!showFullContent);
  };

  const renderAnswer = (answer) => {
    if (typeof answer === 'string') {
      return answer;
    }
    if (Array.isArray(answer)) {
      return (
        <ul style={{ listStyleType: 'none', paddingLeft: '20px' }}>
          {answer.map((item, index) => (
            <li key={index} style={{ marginBottom: '5px' }}>
              - {renderAnswer(item)}
            </li>
          ))}
        </ul>
      );
    }
    if (typeof answer === 'object' && answer !== null) {
      if (answer.term && answer.definition) {
        return (
          <div>
            <strong>{answer.term}:</strong> {answer.definition}
          </div>
        );
      }
      return (
        <div>
          {Object.entries(answer).map(([key, value]) => (
            <div key={key} style={{ marginBottom: '10px' }}>
              <div style={{ fontWeight: 'bold' }}>{key}:</div>
              {renderAnswer(value)}
            </div>
          ))}
        </div>
      );
    }
    return JSON.stringify(answer);
  };

  const renderSectionContent = (section) => {
    return (
      <div key={section.name} style={{ marginBottom: '30px' }}>
        <h3 style={{ 
          color: '#2c3e50',
          borderBottom: '3px solid #eee',
          paddingBottom: '8px'
        }}>
          {section.name} {section.marks && `(${section.marks} marks)`}
        </h3>
        
        {section.instructions && (
          <p style={{ fontStyle: 'italic', marginBottom: '15px' }}>
            {section.instructions}
          </p>
        )}
        
        {section.questions?.map((question, qIndex) => (
          <div key={qIndex}>
            {question.parts ? (
              <div style={{ 
                marginBottom: '20px',
                padding: '15px',
                backgroundColor: '#f0f7ff',
                borderRadius: '5px'
              }}>
                {question.text && (
                  <div style={{ fontWeight: 'bold', marginBottom: '15px' }}>
                    {question.number}. {question.text}
                  </div>
                )}
                
                {question.parts.map((part) => (
                  <div key={`${question.number}-${part.letter}`} style={{ 
                    marginBottom: '15px',
                    padding: '10px',
                    backgroundColor: '#f9f9f9',
                    borderRadius: '3px'
                  }}>
                    <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>
                      {question.number}({part.letter}) {part.text}
                    </div>
                    
                    {part.parts ? (
                      part.parts.map((subPart, subIndex) => (
                        <div key={subIndex} style={{ marginBottom: '10px' }}>
                          <div style={{ fontWeight: 'bold' }}>
                            {question.number}({part.letter})({subPart.number}) {subPart.text}
                          </div>
                          {showAnswers && renderAnswer(subPart.answer)}
                        </div>
                      ))
                    ) : (
                      showAnswers && renderAnswer(part.answer)
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div key={qIndex} style={{ 
                marginBottom: '20px',
                padding: '15px',
                backgroundColor: '#f9f9f9',
                borderRadius: '5px'
              }}>
                <div style={{ display: 'flex', marginBottom: '10px' }}>
                  <span style={{ 
                    fontWeight: 'bold',
                    marginRight: '10px',
                    color: '#e74c3c'
                  }}>
                    Q{question.number}.
                  </span>
                  <span>{question.text}</span>
                </div>
                
                {question.options?.map((option, optIndex) => (
                  <div key={optIndex} style={{ 
                    marginLeft: '25px',
                    marginRight: '25px',
                    marginBottom: '5px'
                  }}>
                    {option}
                  </div>
                ))}
                
                {showAnswers && (
                  <>
                    <div style={{ 
                      fontWeight: 'bold',
                      color: '#27ae60',
                      marginTop: '10px'
                    }}>
                      Answer: {question.answer}
                    </div>
                    
                    {question.comment && (
                      <div style={{ 
                        fontStyle: 'italic',
                        color: '#7f8c8d',
                        marginTop: '5px'
                      }}>
                        {question.comment}
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        ))}
        
        {Array.isArray(section.content) && section.content.length > 0 && (
          <div style={{ 
            marginTop: '20px',
            fontStyle: 'italic',
            color: '#7f8c8d'
          }}>
            {section.content.map((comment, commentIndex) => (
              <div key={commentIndex}>{comment}</div>
            ))}
          </div>
        )}
      </div>
    );
  };

  if (error) {
    return (
      <div style={{ 
        flex: 1, 
        padding: "20px", 
        backgroundColor: "#f4f4f4",
        color: "red",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        Error: {error}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div style={{ 
        flex: 1, 
        padding: "20px", 
        backgroundColor: "#f4f4f4",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        Loading data for {year}...
      </div>
    );
  }

  if (!data) {
    return (
      <div style={{ 
        flex: 1, 
        padding: "20px", 
        backgroundColor: "#f4f4f4",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        No data available for {year}
      </div>
    );
  }

  return (
    <div style={{ 
      flex: 1, 
      padding: isMobile && !isFullScreen ? "10px" : "20px",
      backgroundColor: "#f4f4f4",
      position: 'relative'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '20px',
        flexWrap: 'wrap',
        gap: '10px'
      }}>
        <h2 style={{ margin: 0 }}>{data.exam?.title || 'Agricultural Exam Data'} - {year}</h2>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button
            onClick={toggleAnswers}
            style={{
              padding: '8px 16px',
              backgroundColor: showAnswers ? '#e67e22' : '#3498db',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            {showAnswers ? 'Hide Answers' : 'Show Answers'}
          </button>
          
          <button
            onClick={generatePDF}
            style={{
              padding: '8px 16px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            Download PDF
          </button>

          <button
            onClick={toggleFullScreen}
            style={{
              padding: '8px 16px',
              backgroundColor: isFullScreen ? '#9b59b6' : '#34495e',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            {isFullScreen ? 'Exit Full Screen' : 'Full Screen'}
          </button>
        </div>
      </div>

      <div
        ref={contentRef}
        style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          maxHeight: isFullScreen || showFullContent ? 'none' : '1100px',
          overflow: isFullScreen ? 'visible' : 'hidden',
          position: 'relative'
        }}
      >
        {data.exam ? (
          <div>
            {data.exam.sections?.map(renderSectionContent)}
            
            {data.exam.footer && (
              <div style={{ 
                marginTop: '30px',
                padding: '15px',
                backgroundColor: '#f5f5f5',
                borderRadius: '5px',
                fontStyle: 'italic'
              }}>
                {data.exam.footer.content}
              </div>
            )}
          </div>
        ) : (
          <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>
            {JSON.stringify(data, null, 2)}
          </pre>
        )}

        {!isFullScreen && !showFullContent && (
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '60px',
            background: 'linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,1))',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            paddingBottom: '10px',
          }}>
            <button 
              onClick={toggleContent}
              style={{
                padding: '8px 16px',
                backgroundColor: '#3498db',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Show More
            </button>
          </div>
        )}
      </div>

      {!isFullScreen && showFullContent && (
        <button 
          onClick={toggleContent}
          style={{
            marginTop: '10px',
            padding: '8px 16px',
            backgroundColor: '#3498db',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Show Less
        </button>
      )}
    </div>
  );
}