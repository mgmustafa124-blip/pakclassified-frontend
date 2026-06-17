import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const styles = {
  footerMain: {
    // Aesthetic smooth transition blending deep red into dark charcoal black at an angle
    background: "linear-gradient(135deg, #7A0A1C 0%, #121212 55%, #050505 100%)",
    color: "#D1D1D1", // Soft white/grey for premium look
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "14px",
    borderTop: "1px solid rgba(200, 16, 46, 0.3)", // Subtle glowing top border
    paddingTop: "70px",
    paddingBottom: "30px",
  },
  brandName: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: "36px",
    color: "#fff",
    letterSpacing: "0.08em",
    lineHeight: 1,
    margin: 0,
    textShadow: "0 0 20px rgba(200, 16, 46, 0.2)", // Subtle glowing effect
  },
  brandSub: {
    fontSize: "11px",
    color: "#C8102E", // Signature Red accents
    letterSpacing: "0.25em",
    fontWeight: 600,
    textTransform: "uppercase",
    display: "block",
    marginTop: "2px",
    marginBottom: "25px",
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
    width: "100%", // Ensures it scales properly
  },
  submitBtn: {
    background: "#C8102E",
    border: "none",
    borderRadius: "4px",
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

const customCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500&display=swap');

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
  .veloce-col:hover .footer-heading::after {
    width: 35px;
  }
  .hover-white:hover {
    color: #fff !important;
  }
`;

export default function CarFooter() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert(`Subscribed: ${email}`);
    setEmail("");
  };

  return (
    <>
      <style>{customCSS}</style>
      
      <footer style={styles.footerMain}>
        <Container>
          <Row className="gy-4">
            
            {/* Column 1: Brand & About */}
            <Col lg={4} md={6} className="veloce-col">
              <div>
                <p style={styles.brandName}>VELOCE</p>
                <span style={styles.brandSub}>Automobiles</span>
              </div>
              <p className="pe-lg-5" style={{ lineHeight: "1.7", opacity: 0.75 }}>
                Engineered with passion, driven by performance. Veloce crafts high-performance machines that redefine automotive boundaries.
              </p>
            </Col>

            {/* Column 2: Quick Links */}
            <Col lg={2} md={6} className="veloce-col">
              <h5 style={styles.sectionHeading} className="footer-heading">Models</h5>
              <div className="mt-2">
                <a href="#" style={styles.footerLink} className="veloce-footer-link">Veloce GT</a>
                <a href="#" style={styles.footerLink} className="veloce-footer-link">Veloce Sport</a>
                <a href="#" style={styles.footerLink} className="veloce-footer-link">Veloce SUV</a>
                <a href="#" style={styles.footerLink} className="veloce-footer-link">Veloce EV</a>
              </div>
            </Col>

            {/* Column 3: Services */}
            <Col lg={2} md={6} className="veloce-col">
              <h5 style={styles.sectionHeading} className="footer-heading">Owners</h5>
              <div className="mt-2">
                <a href="#" style={styles.footerLink} className="veloce-footer-link">Book Test Drive</a>
                <a href="#" style={styles.footerLink} className="veloce-footer-link">Schedule Service</a>
                <a href="#" style={styles.footerLink} className="veloce-footer-link">Finance Options</a>
                <a href="#" style={styles.footerLink} className="veloce-footer-link">Find Dealer</a>
              </div>
            </Col>

            {/* Column 4: Newsletter Subscription */}
            <Col lg={4} md={6} className="veloce-col">
              <h5 style={styles.sectionHeading} className="footer-heading">Newsletter</h5>
              <p className="small mb-3" style={{ opacity: 0.75 }}>Stay updated with latest hyper-car launches and track events.</p>
              
              {/* Responsive Newsletter Form layout */}
              <Form onSubmit={handleSubscribe} className="d-flex flex-column flex-sm-row gap-2">
                <Form.Control
                  type="email"
                  placeholder="ENTER YOUR EMAIL"
                  required
                  style={styles.inputField}
                  className="veloce-footer-input m-0"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button type="submit" style={styles.submitBtn} className="veloce-footer-btn w-auto text-nowrap">
                  Join
                </Button>
              </Form>
            </Col>

          </Row>

          {/* Bottom Row */}
          <Row style={styles.bottomBar} className="align-items-center text-center text-md-start gy-2">
            <Col md={6}>
              <span>© 2026 VELOCE Automobiles India. All Rights Reserved.</span>
            </Col>
            <Col md={6} className="text-md-end d-flex justify-content-center justify-content-md-end gap-3 flex-wrap">
              <a href="#" style={{ color: "#777", textDecoration: "none", transition: "color 0.2s" }} className="hover-white">Privacy Policy</a>
              <a href="#" style={{ color: "#777", textDecoration: "none", transition: "color 0.2s" }} className="hover-white">Terms of Use</a>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
}