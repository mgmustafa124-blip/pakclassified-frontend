import React, { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";

const styles = {
    detailSection: {
        background: "#0A0A0A", 
        padding: "60px 0",
        color: "#fff",
        minHeight: "100vh"
    },
    backLink: {
        color: "#999",
        textDecoration: "none",
        fontSize: "14px",
        fontFamily: "'DM Sans', sans-serif",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        marginBottom: "30px",
        transition: "color 0.2s"
    },
    carCategory: {
        fontSize: "13px",
        textTransform: "uppercase",
        color: "#C8102E",
        fontWeight: 600,
        letterSpacing: "0.15em",
        fontFamily: "'DM Sans', sans-serif",
        margin: "0 0 8px 0",
        display: "block"
    },
    mainHeading: {
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: "calc(32px + 2vw)", // Fluid typography for perfect mobile scaling
        letterSpacing: "0.05em",
        textTransform: "uppercase",
        marginBottom: "25px",
        lineHeight: "1.1"
    },
    imageContainer: {
        background: "#141414",
        border: "1px solid rgba(255, 255, 255, 0.05)",
        borderRadius: "6px",
        overflow: "hidden",
        width: "100%",
        boxShadow: "0 10px 30px rgba(0,0,0,0.5)"
    },
    specCard: {
        background: "#141414",
        border: "1px solid rgba(200, 16, 46, 0.2)",
        borderRadius: "6px",
        padding: "25px",
        height: "100%",
        boxShadow: "0 8px 24px rgba(0,0,0,0.3)"
    },
    specTitle: {
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: "26px",
        letterSpacing: "0.05em",
        color: "#fff",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        paddingBottom: "12px",
        marginBottom: "15px"
    },
    // Flex direction is handled via global responsive CSS class now
    specLabel: {
        fontSize: "13px",
        color: "#777",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        margin: 0,
        fontFamily: "'DM Sans', sans-serif",
        fontWeight: 500,
        minWidth: "120px"
    },
    specValue: {
        fontSize: "15px",
        color: "#fff",
        fontWeight: 400,
        margin: 0,
        fontFamily: "'DM Sans', sans-serif",
        textAlign: "right",
        wordBreak: "break-word"
    },
    ctaBtn: {
        background: "#C8102E",
        border: "none",
        color: "#fff",
        padding: "14px 30px",
        borderRadius: "4px",
        fontSize: "13px",
        fontWeight: 600,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        cursor: "pointer",
        fontFamily: "'DM Sans', sans-serif",
        marginTop: "25px",
        width: "100%",
        transition: "all 0.3s ease"
    }
};

const customCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;700&display=swap');

  .veloce-back-link:hover {
    color: #C8102E !important;
  }
  
  .veloce-spec-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px 0;
    border-bottom: 1px solid rgba(255,255,255,0.04);
    gap: 15px;
  }

  .veloce-cta-btn:hover {
    background: #A00D22 !important;
    box-shadow: 0 4px 15px rgba(200, 16, 46, 0.4);
  }

  /* Responsive styling for small screens */
  @media (max-width: 576px) {
    .veloce-spec-row {
      flex-direction: column;
      align-items: flex-start;
      gap: 4px;
      padding: 12px 0;
    }
    .veloce-spec-value {
      text-align: left !important;
      font-size: 14px;
    }
  }
`;

export default function CarDetails() {
    const { id } = useParams(); 
    const [car, setCar] = useState(null); 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        
        setLoading(true);
        fetch(`http://localhost:3000/Post/readid/${id}`)
            .then(res => res.json())
            .then(data => {
                setCar(data); 
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching car details:", err);
                setLoading(false);
            });
    }, [id]);

    // 1. Loading Screen
    if (loading) {
        return (
            <div style={{ background: "#0A0A0A", minHeight: "100vh" }} className="d-flex justify-content-center align-items-center">
                <Spinner animation="border" style={{ color: "#C8102E" }} />
            </div>
        );
    }

    // 2. Data Not Found Screen
    if (!car) {
        return (
            <div style={{ background: "#0A0A0A", color: "#fff", minHeight: "100vh" }} className="d-flex justify-content-center align-items-center text-center p-3">
                <h3 className="fs-5 text-muted">⚠️ Vehicle Information Profile Not Found</h3>
            </div>
        );
    }

    return (
        <>
            <style>{customCSS}</style>
            <section style={styles.detailSection}>
                <Container>
                    <NavLink to="/home" style={styles.backLink} className="veloce-back-link">
                        ← Back to Showroom
                    </NavLink>

                    {/* Added 'g-4 lg-g-5' for responsive adjustments between layout boxes */}
                    <Row className="g-4 g-lg-5">
                        
                        {/* Left Column: Image & Title */}
                        <Col lg={7}>
                            <span style={styles.carCategory}>
                                Vehicle Type: {car.CategoryID?.Name || "Performance Model"}
                            </span>
                            <h1 style={styles.mainHeading}>{car.Name || "Unnamed Model"}</h1>
                            
                            <div style={styles.imageContainer}>
                                {car.Image ? (
                                    <img
                                        src={`http://localhost:3000/${car.Image.replace(/\\/g, '/')}`}
                                        alt={car.Name || "Vehicle"}
                                        style={{ width: "100%", height: "auto", display: "block" }}
                                    />
                                ) : (
                                    <div style={{ padding: "60px 20px", textAlign: "center", color: "#444", fontSize: "14px" }}>
                                        No Image Available For This Model
                                    </div>
                                )}
                            </div>
                        </Col>

                        {/* Right Column: Dynamic Specifications Info Panel */}
                        <Col lg={5}>
                            <Card style={styles.specCard}>
                                <h3 style={styles.specTitle}>Vehicle Specifications</h3>
                                
                                <div className="veloce-spec-row">
                                    <p style={styles.specLabel}>Brand/Name</p>
                                    <p style={styles.specValue} className="veloce-spec-value">{car.Name}</p>
                                </div>

                                <div className="veloce-spec-row">
                                    <p style={styles.specLabel}>Price</p>
                                    {/* FIXED: Removed double style object conflict */}
                                    <p style={{ ...styles.specValue, color: "#C8102E", fontWeight: "700", fontSize: "18px" }} className="veloce-spec-value">
                                        {car.Price ? `Rs. ${(car.Price).toLocaleString('en-PK')}` : "Contact for Price"}
                                    </p>
                                </div>

                                <div className="veloce-spec-row">
                                    <p style={styles.specLabel}>Description</p>
                                    <p style={{ ...styles.specValue, textAlign: "justify" }} className="veloce-spec-value">
                                        {car.Description || "No registration features recorded."}
                                    </p>
                                </div>

                                <div className="veloce-spec-row">
                                    <p style={styles.specLabel}>City</p>
                                    <p style={styles.specValue} className="veloce-spec-value">{car.CityID?.Name || "Global"}</p>
                                </div>

                                <div className="veloce-spec-row">
                                    <p style={styles.specLabel}>Status</p>
                                    <p style={styles.specValue} className="veloce-spec-value">{car.StatusID?.Name || "Available"}</p>
                                </div>

                                <div className="veloce-spec-row">
                                    <p style={styles.specLabel}>Available From</p>
                                    <p style={styles.specValue} className="veloce-spec-value">{car.Startdate || "Immediate"}</p>
                                </div>

                                <div className="veloce-spec-row">
                                    <p style={styles.specLabel}>Available Till</p>
                                    <p style={styles.specValue} className="veloce-spec-value">{car.Enddate || "Until Sold"}</p>
                                </div>

                                <button style={styles.ctaBtn} className="veloce-cta-btn">
                                    Book This Vehicle
                                </button>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
}