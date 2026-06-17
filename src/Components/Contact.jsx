import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";

const styles = {
  // Hero Image Section
  heroSection: {
    position: "relative",
    height: "450px",
    backgroundImage: "linear-gradient(to bottom, rgba(10, 10, 10, 0.3) 0%, rgba(10, 10, 10, 0.95) 100%), url('https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&q=80&w=1920')",
    backgroundSize: "cover",
    backgroundPosition: "center 60%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    borderBottom: "1px solid rgba(200, 16, 46, 0.2)",
    padding: "0 20px"
  },
  heroHeading: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: "calc(36px + 3.5vw)", // Fluid typography for perfect scaling
    color: "#fff",
    letterSpacing: "0.05em",
    lineHeight: "1.1",
    margin: 0,
    textShadow: "0 4px 20px rgba(0, 0, 0, 0.8), 0 0 40px rgba(200, 16, 46, 0.4)",
  },
  heroSubHeading: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "calc(10px + 0.3vw)", // Subtle responsive sub-heading
    color: "#C8102E",
    letterSpacing: "0.4em",
    fontWeight: 600,
    textTransform: "uppercase",
    marginTop: "16px",
    display: "block",
  },

  // Main Contact Section
  contactPage: {
    background: "#252424",
    color: "#D1D1D1",
    fontFamily: "'DM Sans', sans-serif",
    paddingTop: "60px",
    paddingBottom: "90px",
    minHeight: "400px",
  },
  sectionHeading: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: "28px",
    color: "#fff",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    marginBottom: "25px",
    position: "relative",
    display: "inline-block",
  },
  infoCard: {
    background: "rgba(255, 255, 255, 0.02)",
    border: "1px solid rgba(255, 255, 255, 0.04)",
    borderLeft: "3px solid #C8102E",
    padding: "25px",
    borderRadius: "4px",
    marginBottom: "20px",
    transition: "all 0.3s ease",
  },
  infoTitle: {
    fontSize: "11px",
    color: "#777",
    textTransform: "uppercase",
    letterSpacing: "0.15em",
    marginBottom: "5px",
    fontWeight: 600,
  },
  infoDetail: {
    fontSize: "15px",
    color: "#fff",
    margin: 0,
    lineHeight: "1.6",
    wordBreak: "break-word" // Prevents long emails from breaking container
  },
  mapContainer: {
    background: "rgba(255, 255, 255, 0.01)",
    border: "1px solid rgba(200, 16, 46, 0.15)",
    borderRadius: "8px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
    height: "100%",
  },
};

const customCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;700&display=swap');

  .veloce-info-card:hover {
    background: rgba(255, 255, 255, 0.04) !important;
    border-color: rgba(200, 16, 46, 0.3) !important;
    transform: translateX(5px);
  }
  .contact-heading::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 25px;
    height: 2px;
    background: #C8102E;
    transition: width 0.3s ease;
  }
  .veloce-contact-section:hover .contact-heading::after {
    width: 45px;
  }
  .veloce-map {
    width: 100%;
    height: 100%;
    min-height: 450px; /* Great layout height for desktops */
    border: none;
    border-radius: 6px;
    filter: grayscale(1) invert(0.9) contrast(1.2); 
    opacity: 0.65;
    transition: all 0.5s ease;
    display: block;
  }
  .veloce-map:hover {
    filter: grayscale(0) invert(0) contrast(1); 
    opacity: 1;
  }

  /* Custom Media Query for Mobile view map adjustment */
  @media (max-width: 991px) {
    .veloce-map {
      min-height: 320px; /* Reduced map height for vertical stacked mobile screens */
    }
  }
`;

export default function CarContact() {
  return (
    <>
      <style>{customCSS}</style>

      {/* Hero Image Section */}
      <div style={styles.heroSection}>
        <div>
          <h1 style={styles.heroHeading}>CONNECT WITH VELOCE</h1>
          <span style={styles.heroSubHeading}>Experience Unmatched Performance</span>
        </div>
      </div>

      {/* Form & Info Section */}
      <div style={styles.contactPage} className="veloce-contact-section">
        <Container>
          {/* Added 'g-4' for better grid padding across all breakpoints */}
          <Row className="g-4 lg-g-5 align-items-stretch">

            {/* Left Column: Contact Info & Details */}
            <Col lg={5} className="pe-lg-4 d-flex flex-column justify-content-between">
              <div>
                <h3 style={styles.sectionHeading} className="contact-heading">VELOCE HQ</h3>
                <p style={{ opacity: 0.75, lineHeight: "1.8", marginBottom: "35px" }}>
                  Whether you want to schedule an exclusive private track day, customize your incoming hyper-car configuration, or have questions about ownership—our global concierge crew is at your service.
                </p>

                {/* Info Block 1: Location */}
                <div style={styles.infoCard} className="veloce-info-card">
                  <div style={styles.infoTitle}>Global Experience Center</div>
                  <p style={styles.infoDetail}>Gulberg III, Main Boulevard, Lahore, Pakistan</p>
                </div>

                {/* Info Block 2: Phone */}
                <div style={styles.infoCard} className="veloce-info-card">
                  <div style={styles.infoTitle}>Concierge Desk</div>
                  <p style={styles.infoDetail}>+92 (42) 111-VELOCE (835623)</p>
                </div>

                {/* Info Block 3: Email */}
                <div style={styles.infoCard} className="veloce-info-card">
                  <div style={styles.infoTitle}>Inquiries Email</div>
                  <p style={styles.infoDetail}>concierge@veloceautomobiles.com</p>
                </div>
              </div>
            </Col>

            {/* Right Column: Premium Map Wrapper */}
            <Col lg={7}>
              <div style={styles.mapContainer}>
                <iframe
                  title='Veloce Location Map'
                  className="veloce-map"
                  src="https://maps.google.com/maps?q=Gulberg%20III,%20Main%20Boulevard,%20Lahore,%20Pakistan&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}