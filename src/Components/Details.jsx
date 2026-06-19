import React, { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import { Container, Row, Col, Spinner } from "react-bootstrap";

const styles = {
    pageWrapper: {
        background: "#0d0e12", 
        color: "#ffffff",
        height: "100vh",
        overflow: "hidden", /* Strict No Scrollbar */
        fontFamily: "'Inter', sans-serif",
        display: "flex",
        flexDirection: "column"
    },
    topBar: {
        padding: "16px 0 8px 0",
        flexShrink: 0
    },
    backButton: {
        color: "#94a3b8",
        textDecoration: "none",
        fontSize: "12px",
        fontWeight: "500",
        letterSpacing: "0.05em",
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        transition: "all 0.2s ease-in-out",
    },
    mainWorkspace: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        paddingBottom: "24px",
        overflow: "hidden"
    },
    /* TOP ROW LAYOUT */
    topShowcaseRow: {
        flexShrink: 0,
        marginBottom: "20px"
    },
    imageContainer: {
        width: "100%",
        height: "40vh", /* Explicit responsive percentage of screen height */
        borderRadius: "16px",
        overflow: "hidden",
        background: "#15171e", 
        border: "1px solid rgba(255, 255, 255, 0.03)",
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    heroPreview: {
        width: "100%",
        height: "100%", 
        objectFit: "cover",
    },
    noImage: {
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#475569",
        fontSize: "12px",
        letterSpacing: "0.1em",
        textTransform: "uppercase"
    },
    samneDataBlock: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "100%",
    },
    badgeRow: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        marginBottom: "10px"
    },
    categoryBadge: {
        background: "rgba(255,255,255,0.03)",
        color: "#94a3b8",
        padding: "4px 12px",
        borderRadius: "100px",
        fontSize: "11px",
        fontWeight: "500",
        border: "1px solid rgba(255,255,255,0.08)",
    },
    statusBadge: {
        background: "rgba(239, 68, 68, 0.1)",
        color: "#ef4444",
        padding: "4px 12px",
        borderRadius: "100px",
        fontSize: "11px",
        fontWeight: "600",
        border: "1px solid rgba(239, 68, 68, 0.2)",
    },
    carTitle: {
        fontSize: "calc(22px + 0.8vw)",
        fontWeight: "700",
        letterSpacing: "-0.02em",
        lineHeight: "1.2",
        marginBottom: "12px",
        color: "#ffffff"
    },
    priceWrapper: {
        marginTop: "5px"
    },
    priceMetaLabel: {
        fontSize: "11px",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        color: "#64748b",
        marginBottom: "2px",
        fontWeight: "500"
    },
    priceLabel: {
        fontSize: "32px",
        fontWeight: "800",
        color: "#ef4444",
        letterSpacing: "-0.02em"
    },
    /* BOTTOM ROW LAYOUT (NICHA KA DATA) */
    bottomDataRow: {
        flex: 1,
        overflow: "hidden"
    },
    sectionHeading: {
        fontSize: "12px",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        color: "#64748b",
        marginBottom: "12px",
        fontWeight: "600",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        paddingBottom: "6px"
    },
    descriptionCard: {
        background: "rgba(21, 23, 30, 0.4)",
        border: "1px solid rgba(255,255,255,0.02)",
        padding: "20px",
        borderRadius: "14px",
        height: "100%",
    },
    description: {
        color: "#94a3b8",
        fontSize: "14px",
        lineHeight: "1.6",
        margin: 0,
        maxHeight: "160px",
        overflowY: "auto"
    },
    specsGrid: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "12px",
        marginBottom: "16px"
    },
    specBox: {
        background: "#15171e",
        border: "1px solid rgba(255,255,255,0.03)",
        padding: "12px 14px",
        borderRadius: "12px",
    },
    specLabel: {
        fontSize: "10px",
        color: "#64748b",
        textTransform: "uppercase",
        letterSpacing: "0.03em",
        marginBottom: "2px",
        fontWeight: "500"
    },
    specValue: {
        fontSize: "13px",
        color: "#f1f5f9",
        fontWeight: "600",
        margin: 0
    },
    actionButton: {
        background: "#ef4444",
        color: "#fff",
        border: "none",
        padding: "14px 24px",
        borderRadius: "12px",
        fontSize: "14px",
        fontWeight: "600",
        letterSpacing: "0.02em",
        width: "50%",
        cursor: "pointer",
        transition: "all 0.2s ease-in-out",
        boxShadow: "0 10px 25px -5px rgba(239, 68, 68, 0.3)"
    }
};

const customCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

  /* Inner elements custom mini scrollbar if text flows */
  ::-webkit-scrollbar {
    width: 4px;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background: rgba(255,255,255,0.1);
    border-radius: 10px;
  }

  .veloce-back-btn:hover {
    color: #ef4444 !important;
    transform: translateX(-4px);
  }

  .veloce-action-btn:hover {
    background: #dc2626 !important;
    transform: translateY(-2px);
    box-shadow: 0 15px 30px -5px rgba(239, 68, 68, 0.4) !important;
  }
`;

export default function CarDetails() {
    const { id } = useParams();
    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);
    const url = import.meta.env.VITE_API_URL;

    useEffect(() => {
        if (!id) return;
        setLoading(true);
        fetch(`${url}/Post/readid/${id}`)
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

    if (loading) {
        return (
            <div style={{ background: "#0d0e12", minHeight: "100vh" }} className="d-flex justify-content-center align-items-center">
                <Spinner animation="border" style={{ color: "#ef4444" }} />
            </div>
        );
    }

    if (!car) {
        return (
            <div style={{ background: "#0d0e12", color: "#fff", minHeight: "100vh" }} className="d-flex justify-content-center align-items-center text-center p-3">
                <h3 className="fs-6 text-muted" style={{ letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    ⚠️ Vehicle Profile Not Found
                </h3>
            </div>
        );
    }

    return (
        <div style={styles.pageWrapper}>
            <style>{customCSS}</style>
            
            {/* Minimal Header */}
            <div style={styles.topBar}>
                <Container>
                    <NavLink to="/home" style={styles.backButton} className="veloce-back-btn">
                        ← Back to Showroom
                    </NavLink>
                </Container>
            </div>

            {/* Main Segmented Screen */}
            <div style={styles.mainWorkspace}>
                <Container className="d-flex flex-column h-100 justify-content-between">
                    
                    {/* 1. TOP PORTION: Image left, important meta right */}
                    <Row style={styles.topShowcaseRow} className="g-4 align-items-center">
                        <Col md={6}>
                            <div style={styles.imageContainer}>
                                {car.Image ? (
                                    <img
                                        src={`http://localhost:3000/${car.Image.replace(/\\/g, '/')}`}
                                        alt={car.Name || "Showcase Vehicle"}
                                        style={styles.heroPreview}
                                    />
                                ) : (
                                    <div style={styles.noImage}>
                                        No Preview Asset Found
                                    </div>
                                )}
                            </div>
                        </Col>

                        <Col md={6} className="ps-md-4">
                            <div style={styles.samneDataBlock}>
                                <div style={styles.badgeRow}>
                                    <span style={styles.categoryBadge}>
                                        {car.CategoryID?.Name || "Performance"}
                                    </span>
                                    <span style={styles.statusBadge}>
                                        {car.StatusID?.Name || "Available"}
                                    </span>
                                </div>

                                <h1 style={styles.carTitle}>{car.Name || "Elite Asset"}</h1>
                                
                                <div style={styles.priceWrapper}>
                                    <div style={styles.priceMetaLabel}>Value Assessment</div>
                                    <div style={styles.priceLabel}>
                                        {car.Price ? `Rs. ${(car.Price).toLocaleString('en-PK')}` : "Price On Request"}
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>

                    {/* 2. BOTTOM PORTION: Detailed description left, full spec metrics right */}
                    <Row style={styles.bottomDataRow} className="g-4 align-items-stretch">
                        {/* Left Side: Overview Block */}
                        <Col md={6}>
                            <div style={styles.descriptionCard}>
                                <div style={styles.sectionHeading}>Vehicle Overview</div>
                                <p style={styles.description}>
                                    {car.Description || "Premium dynamic fleet asset currently indexed in our central registry database with premium tier configurations."}
                                </p>
                            </div>
                        </Col>

                        {/* Right Side: Specific Details Matrix + CTA */}
                        <Col md={6} className="ps-md-4 d-flex flex-column justify-content-between">
                            <div>
                                <div style={styles.sectionHeading}>Specifications & Logistics</div>
                                <div style={styles.specsGrid}>
                                    <div style={styles.specBox}>
                                        <p style={styles.specLabel}>Hub Location</p>
                                        <p style={styles.specValue}>📍 {car.CityID?.Name || "Global Fleet"}</p>
                                    </div>
                                    <div style={styles.specBox}>
                                        <p style={styles.specLabel}>Registry Key</p>
                                        <p style={styles.specValue} style={{fontFamily: "monospace", color: "#94a3b8"}}>#{car._id ? car._id.slice(-6).toUpperCase() : "N/A"}</p>
                                    </div>
                                    <div style={styles.specBox}>
                                        <p style={styles.specLabel}>Release / Start</p>
                                        <p style={styles.specValue}>📅 {car.Startdate || "Immediate"}</p>
                                    </div>
                                    <div style={styles.specBox}>
                                        <p style={styles.specLabel}>Availability Lock</p>
                                        <p style={styles.specValue}>🔒 {car.Enddate || "Until De-listed"}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Booking Button anchored nicely at the bottom right area */}
                            <button style={styles.actionButton} className="veloce-action-btn">
                                Secure Booking Slot
                            </button>
                        </Col>
                    </Row>

                </Container>
            </div>
        </div>
    );
}