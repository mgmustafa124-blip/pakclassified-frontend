import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
    Navbar,
    Nav,
    NavDropdown,
    Container,
    Button,
    Row,
    Col,
    Card,
    Form,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import CarCarousel from "./Carasoule";
// import { UserContext } from "../context/User.context";
import { PostContext } from "../context/Post.context";

// --- STYLES OBJECT ---
const styles = {
    topBar: {
        background: "#C8102E",
        padding: "5px 0",
        fontSize: "12px",
        color: "#fff",
        letterSpacing: "0.03em",
    },
    topBarLink: {
        color: "#fff",
        textDecoration: "none",
        opacity: 0.85,
    },
    mainNav: {
        background: "#0A0A0A",
        borderBottom: "1px solid rgba(200,16,46,0.35)",
        padding: "0",
    },
    brandWrapper: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        textDecoration: "none",
    },
    brandDot: {
        width: "10px",
        height: "10px",
        background: "#C8102E",
        borderRadius: "50%",
        display: "inline-block",
        flexShrink: 0,
    },
    brandName: {
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: "28px",
        color: "#fff",
        letterSpacing: "0.06em",
        lineHeight: 1,
        margin: 0,
    },
    brandSub: {
        fontSize: "10px",
        color: "#C8102E",
        fontFamily: "'DM Sans', sans-serif",
        letterSpacing: "0.2em",
        fontWeight: 500,
        textTransform: "uppercase",
        display: "block",
        marginTop: "-4px",
    },
    ctaBtn: {
        background: "#C8102E",
        border: "none",
        color: "#fff",
        padding: "8px 20px",
        borderRadius: "3px",
        fontSize: "12px",
        fontWeight: 500,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        marginLeft: "8px",
        cursor: "pointer",
        transition: "background 0.2s",
        fontFamily: "'DM Sans', sans-serif",
    },
    badge: {
        display: "inline-block",
        background: "rgba(200,16,46,0.18)",
        color: "#C8102E",
        fontSize: "10px",
        padding: "1px 6px",
        borderRadius: "2px",
        marginLeft: "8px",
        fontWeight: 500,
        letterSpacing: "0.05em",
    },

    // --- Showcase Section Styles ---
    showcaseSection: {
        background: "#121212", // Dull grey se badal kar sleek pure charcoal tone diya
        padding: "calc(40px + 3vw) 0", // Responsive vertical spacing
        color: "#fff",
    },
    mainHeading: {
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: "calc(32px + 1.5vw)", // Fluid scaling for text sizing on mobile
        letterSpacing: "0.05em",
        textTransform: "uppercase",
        marginBottom: "6px",
    },
    subHeading: {
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "calc(11px + 0.2vw)", // Scalable sub text
        color: "#888",
        textTransform: "uppercase",
        letterSpacing: "0.15em",
        marginBottom: "calc(25px + 2vw)",
    },
    carCard: {
        background: "#161616",
        border: "1px solid rgba(255, 255, 255, 0.05)",
        borderRadius: "6px",
        overflow: "hidden",
        transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
        height: "100%",
        display: "flex",
        flexDirection: "column",
    },
    cardTitle: {
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: "24px",
        letterSpacing: "0.03em",
        color: "#fff",
        margin: 0,
    },
    cardCategory: {
        fontSize: "11px",
        textTransform: "uppercase",
        color: "#C8102E",
        fontWeight: 600,
        letterSpacing: "0.1em",
    },
    specLabel: {
        fontSize: "10px",
        color: "#666",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        margin: 0,
    },
    specValue: {
        fontSize: "12px",
        color: "#ddd",
        fontWeight: 500,
        margin: 0,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis" // Long specifications text overflow prevention
    },
    cardBtn: {
        background:"#322e2e",
        border: "2px solid rgb(103, 94, 94)",
        color: "#fff",
        fontSize: "12px",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        padding: "11px 0",
        width: "100%",
        borderRadius: "4px",
        transition: "all 0.2s ease",
        fontFamily: "'DM Sans', sans-serif",
        marginTop: "auto", // Automatically pushes button to the bottom of the card
    },

    // --- Footer Styles ---
    footerMain: {
        background: "linear-gradient(135deg, #7A0A1C 0%, #121212 55%, #050505 100%)",
        color: "#D1D1D1",
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "14px",
        borderTop: "1px solid rgba(200, 16, 46, 0.3)",
        paddingTop: "70px",
        paddingBottom: "30px",
    },
    sectionHeading: {
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: "19px",
        color: "#fff",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        marginBottom: "22px",
        position: "relative",
        display: "inline-block",
    },
    footerLink: {
        color: "#999",
        textDecoration: "none",
        transition: "all 0.3s ease",
        display: "block",
        marginBottom: "12px",
    },
    inputField: {
        background: "rgba(255, 255, 255, 0.03)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        borderRadius: "4px",
        color: "#fff",
        padding: "11px 16px",
        fontSize: "13px",
        transition: "all 0.3s ease",
    },
    submitBtn: {
        background: "#C8102E",
        border: "none",
        borderRadius: "4px",
        marginLeft: "8px",
        color: "#fff",
        fontWeight: 600,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        fontSize: "12px",
        padding: "11px 22px",
        transition: "all 0.3s ease",
        boxShadow: "0 4px 15px rgba(200, 16, 46, 0.3)",
    },
    bottomBar: {
        borderTop: "1px solid rgba(255, 255, 255, 0.04)",
        marginTop: "50px",
        paddingTop: "25px",
        fontSize: "12px",
        color: "#777",
    }
};

// --- GLOBAL CSS RULES ---
const globalCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;700&display=swap');

  body { 
    background: #0B0B0B !important; 
  }

  .veloce-nav .nav-link {
    color: #999 !important;
    font-size: 13px !important;
    font-weight: 500 !important;
    letter-spacing: 0.05em !important;
    text-transform: uppercase !important;
    padding: 28px 14px !important;
    position: relative !important;
    transition: color 0.2s !important;
    font-family: 'DM Sans', sans-serif !important;
  }
  .veloce-nav .nav-link::after {
    content: '';
    position: absolute;
    bottom: 0; left: 14px; right: 14px;
    height: 2px;
    background: #C8102E;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.25s ease;
  }
  .veloce-nav .nav-link:hover,
  .veloce-nav .nav-link.active {
    color: #fff !important;
  }
  .veloce-nav .nav-link:hover::after,
  .veloce-nav .nav-link.active::after {
    transform: scaleX(1);
  }
  .veloce-nav .navbar-toggler { border-color: rgba(255,255,255,0.2) !important; }
  .veloce-nav .navbar-toggler-icon { filter: invert(1) !important; }
  .veloce-cta:hover { background: #9B0B21 !important; }

  /* Card Hover Animations & Image Handling */
  .veloce-card-wrapper:hover .car-showcase-card {
    transform: translateY(-8px);
    border-color: rgba(200, 16, 46, 0.6) !important;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.7), 0 0 20px rgba(200, 16, 46, 0.15);
  }
  .veloce-card-wrapper:hover .car-action-btn {
    background: #C8102E !important;
    border-color: #C8102E !important;
    color: #fff !important;
  }
  .veloce-card-wrapper:hover .veloce-card-img {
    transform: scale(1.05);
  }

  /* Footer Links */
  .veloce-footer-link:hover {
    color: #C8102E !important;
    padding-left: 6px;
  }
  .veloce-footer-input:focus {
    background: rgba(255, 255, 255, 0.06) !important;
    border-color: #C8102E !important;
    box-shadow: 0 0 10px rgba(200, 16, 46, 0.2) !important;
    color: #fff !important;
  }
  .veloce-footer-btn:hover {
    background: #A00D25 !important;
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(200, 16, 46, 0.4) !important;
  }
  .footer-heading::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 20px;
    height: 2px;
    background: #C8102E;
    transition: width 0.3s ease;
  }
  .veloce-col:hover .footer-heading::after { width: 35px; }
  .hover-white:hover { color: #fff !important; }

  /* Responsive Fixes */
  @media (max-width: 991px) {
    .veloce-nav .nav-link { padding: 12px 16px !important; }
    .veloce-nav .nav-link::after { display: none !important; }
  }
  
  @media (max-width: 576px) {
    .veloce-card-body {
        padding: 20px !important;
    }
    .veloce-metrics-row {
        gap: 4px !important;
    }
  }
`;

export default function Home() {

    const navigate = useNavigate();
    const Post = useContext(PostContext);

    return (
        <>
            {/* INJECTING GLOBAL CSS HOVER RULES INTO DOM */}
            <style>{globalCSS}</style>

            <CarCarousel />
            <section style={styles.showcaseSection}>
                <Container>
                    <div className="text-center">
                        <h2 style={styles.mainHeading}>LATEST CARS</h2>
                        <p style={styles.subHeading}>Discover peak performance precision machines</p>
                    </div>

                    {/* Added row-gap and adjusted column sizes cleanly */}
                    <Row className="g-4">
                        {Post && Post.post && Post.post.slice(0, 6).map((car) => (
                            <Col lg={4} md={6} sm={6} xs={12} key={car._id} className="veloce-card-wrapper d-flex">
                                <Card style={styles.carCard} className="car-showcase-card w-100">
                                    {/* Image Wrapper using responsive aspect-ratio technique */}
                                    <div style={{ width: "100%", aspectRatio: "16 / 10", overflow: "hidden", background: "#1A1A1A" }}>
                                        <img
                                            src={`http://localhost:3000/${car.Image}`}
                                            alt={car.Name || "Car Showcase"}
                                            className="veloce-card-img"
                                            style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }}
                                        />
                                    </div>
                                    <Card.Body className="d-flex flex-column justify-content-between veloce-card-body p-4">
                                        <div>
                                            <span style={styles.cardCategory}>{car.Category || "Supercar"}</span>
                                            <h4 style={styles.cardTitle} className="mt-1 mb-3">{car.Name}</h4>

                                            {/* Specs Metric Cluster */}
                                            <Row className="mb-4 text-start bg-black bg-opacity-30 py-2 px-1 rounded g-0 veloce-metrics-row">
                                                <Col xs={4} className="ps-2">
                                                    <p style={styles.specLabel}>Power</p>
                                                    <p style={styles.specValue}>780 HP</p>
                                                </Col>

                                                <Col xs={4} className="border-start border-secondary border-opacity-25 ps-2">
                                                    <p style={styles.specLabel}>0-100 km/h</p>
                                                    <p style={styles.specValue}>2.7s</p>
                                                </Col>

                                                <Col xs={4} className="border-start border-secondary border-opacity-25 ps-2 pe-1">
                                                    <p style={styles.specLabel}>Powertrain</p>
                                                    <p style={styles.specValue}>V8 Twin</p>
                                                </Col>
                                            </Row>
                                        </div>

                                        <button style={styles.cardBtn} className="" onClick={() => navigate(`/details/${car._id}`)} className="car-action-btn">
                                            Explore Performance
                                        </button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>
        </>
    );
}