import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";

const styles = {
  // Top Header Section (Updated URL format)
  topHeaderSection: {
    position: "relative",
    height: "400px",
    backgroundColor: "#0A0A0A",
    backgroundImage: "linear-gradient(to bottom, rgba(10, 10, 10, 0.4) 0%, rgba(10, 10, 10, 0.95) 100%), url('https://cdn.vectorstock.com/i/1000v/21/15/car-dark-headlight-garage-background-supercar-vector-47852115.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    borderBottom: "1px solid rgba(200, 16, 46, 0.2)",
  },
  headerHeading: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: "68px",
    color: "#fff",
    letterSpacing: "0.06em",
    lineHeight: 1,
    margin: 0,
    textShadow: "0 4px 25px rgba(0, 0, 0, 0.9), 0 0 30px rgba(200, 16, 46, 0.3)",
  },
  headerSubHeading: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "12px",
    color: "#C8102E",
    letterSpacing: "0.45em",
    fontWeight: 600,
    textTransform: "uppercase",
    marginTop: "15px",
    display: "block",
  },
  aboutSection: {
    background: "#0A0A0A",
    color: "#D1D1D1",
    fontFamily: "'DM Sans', sans-serif",
    paddingTop: "90px",
    paddingBottom: "60px",
    position: "relative",
    overflow: "hidden",
  },
  coreValuesSection: {
    background: "linear-gradient(180deg, #0A0A0A 0%, #121212 100%)",
    color: "#D1D1D1",
    fontFamily: "'DM Sans', sans-serif",
    paddingTop: "100px",
    paddingBottom: "100px",
    borderTop: "1px solid rgba(200, 16, 46, 0.1)",
    borderBottom: "1px solid rgba(200, 16, 46, 0.1)",
  },
  aboutSectionBlendedBottom: {
    background: "radial-gradient(circle at 100% 50%, #7A0A1C 0%, #4A0510 30%, #121212 70%, #0A0A0A 100%)",
    color: "#D1D1D1",
    fontFamily: "'DM Sans', sans-serif",
    paddingTop: "100px",
    paddingBottom: "140px",
    position: "relative",
    overflow: "hidden",
  },
  accentLine: {
    width: "60px",
    height: "4px",
    background: "#C8102E",
    marginBottom: "20px",
  },
  sectionTag: {
    fontSize: "11px",
    color: "#C8102E",
    letterSpacing: "0.25em",
    fontWeight: 600,
    textTransform: "uppercase",
    display: "block",
    marginBottom: "10px",
  },
  mainHeading: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: "64px",
    color: "#fff",
    letterSpacing: "0.04em",
    lineHeight: "0.95",
    marginBottom: "30px",
  },
  valueTitle: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: "22px",
    color: "#fff",
    letterSpacing: "0.05em",
    marginTop: "15px",
    marginBottom: "10px",
  },
  description: {
    fontSize: "16px",
    lineHeight: "1.8",
    opacity: 0.8,
    marginBottom: "25px",
  },
  statNumber: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: "56px",
    color: "#fff",
    letterSpacing: "0.05em",
    lineHeight: "1",
    marginBottom: "5px",
  },
  statLabel: {
    fontSize: "12px",
    color: "#C8102E",
    textTransform: "uppercase",
    letterSpacing: "0.15em",
    fontWeight: 600,
  },
  imageWrapper: {
    position: "relative",
    padding: "20px",
  },
  ctaBtn: {
    background: "#C8102E",
    border: "none",
    borderRadius: "3px",
    color: "#fff",
    fontWeight: 600,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    fontSize: "13px",
    padding: "12px 28px",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 15px rgba(200, 16, 46, 0.3)",
  },
  timelineCard: {
    background: "rgba(255, 255, 255, 0.02)",
    borderLeft: "3px solid #C8102E",
    padding: "30px",
    height: "100%",
    transition: "all 0.3s ease",
  },
  timelineYear: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: "28px",
    color: "#C8102E",
    letterSpacing: "0.05em",
    marginBottom: "5px",
  }
};

const customCSS = `
  .about-image-frame {
    position: relative;
  }
  .about-image-frame::before {
    content: '';
    position: absolute;
    top: -10px;
    left: -10px;
    width: 60px;
    height: 60px;
    border-top: 5px solid #C8102E;
    border-left: 5px solid #C8102E;
    z-index: 2;
  }
  .about-image-frame::after {
    content: '';
    position: absolute;
    bottom: -10px;
    right: -10px;
    width: 60px;
    height: 60px;
    border-bottom: 5px solid #C8102E;
    border-right: 5px solid #C8102E;
    z-index: 2;
  }
  .about-img {
    filter: grayscale(20%) brightness(80%);
    transition: all 0.5s ease;
    border: 1px solid rgba(255, 255, 255, 0.05);
  }
  .about-image-frame:hover .about-img {
    filter: grayscale(0%) brightness(95%);
    transform: scale(1.02);
  }
  .veloce-about-btn:hover {
    background: #A00D25 !important;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(200, 16, 46, 0.5) !important;
  }
  .value-card {
    border: 1px solid rgba(255, 255, 255, 0.03);
    padding: 30px;
    background: rgba(255, 255, 255, 0.01);
    transition: all 0.3s ease;
  }
  .value-card:hover {
    background: rgba(200, 16, 46, 0.03);
    border-color: rgba(200, 16, 46, 0.2);
    transform: translateY(-5px);
  }
  .timeline-block:hover {
    background: rgba(255, 255, 255, 0.04) !important;
    transform: translateX(5px);
  }
  @media (max-width: 768px) {
    .veloce-hdr-heading {
      font-size: 42px !important;
    }
  }
`;

export default function VeloceAbout() {
  return (
    <>
      <style>{customCSS}</style>

      {/* Top Image Header */}
      <div style={styles.topHeaderSection}>
        <div>
          <h1 style={styles.headerHeading} className="veloce-hdr-heading">OUR DNA</h1>
          <span style={styles.headerSubHeading}>The Architects of Ultimate Velocity</span>
        </div>
      </div>

      {/* SECTION 1: Intro Manifest */}
      <section style={styles.aboutSection}>
        <Container>
          <Row className="align-items-center g-5">
            <Col lg={6}>
              <div>
                <span style={styles.sectionTag}>The Veloce Heritage</span>
                <div style={styles.accentLine}></div>
                <h2 style={styles.mainHeading}>
                  WE DO NOT BUILD CARS.<br />
                  <span style={{ color: '#C8102E' }}>WE SHAPE ADRENALINE.</span>
                </h2>
                
                <p style={styles.description}>
                  Founded by a collective of rogue aerospace engineers and professional endurance racers, VELOCE was created with a Singular manifest: to tear down the traditional boundaries of automotive limitations. We reject clinical, sanitized commutes in favor of pure, untamed, visceral driving performance.
                </p>
                
                <p style={{ ...styles.description, fontSize: "15px", opacity: 0.65 }}>
                  Every carbon weave, every mechanical assembly, and every electronic management system is built out of a relentless obsession with velocity. We operate in the extremes—where engineering precision meets absolute high-revving architectural art.
                </p>

                <Row className="my-5 g-4">
                  <Col sm={4} xs={6}>
                    <div style={styles.statNumber}>1.9s</div>
                    <div style={styles.statLabel}>0-100 KM/H Limit</div>
                  </Col>
                  <Col sm={4} xs={6}>
                    <div style={styles.statNumber}>1200+</div>
                    <div style={styles.statLabel}>BHP Raw Output</div>
                  </Col>
                  <Col sm={4} xs={6}>
                    <div style={styles.statNumber}>100%</div>
                    <div style={styles.statLabel}>Autoclaved Carbon</div>
                  </Col>
                </Row>
              </div>
            </Col>

            <Col lg={6} className="ps-lg-5">
              <div style={styles.imageWrapper}>
                <div className="about-image-frame">
                  {/* Updated Unsplash source structure */}
                  <img 
                    src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80" 
                    alt="Veloce High Performance Car Detail" 
                    className="img-fluid about-img"
                    style={{ objectFit: "cover", width: "100%", height: "520px" }}
                  />
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      {/* SECTION 3: Brand Historical Milestones */}
      <section style={styles.aboutSectionBlendedBottom}>
        <Container>
          <Row className="mb-5 align-items-end">
            <Col md={8}>
              <span style={styles.sectionTag}>The Journey</span>
              <h3 style={{ ...styles.mainHeading, fontSize: "45px", marginBottom: "0" }}>CHRONICLES OF VELOCITY</h3>
            </Col>
            <Col md={4} className="text-md-end mt-3 mt-md-0">
              <Button style={styles.ctaBtn} className="veloce-about-btn">
                Download Full Heritage Book
              </Button>
            </Col>
          </Row>

          <Row className="g-4">
            <Col lg={3} md={6}>
              <div style={styles.timelineCard} className="timeline-block">
                <div style={styles.timelineYear}>2018</div>
                <h5 style={{ ...styles.valueTitle, fontSize: "18px" }}>The Incubation</h5>
                <p className="small mb-0" style={{ opacity: 0.7, lineHeight: "1.6" }}>
                  Secret testing operations commence inside an abandoned military airstrip. Prototype V0-Alpha breaks experimental track loops.
                </p>
              </div>
            </Col>

            <Col lg={3} md={6}>
              <div style={styles.timelineCard} className="timeline-block">
                <div style={styles.timelineYear}>2021</div>
                <h5 style={{ ...styles.valueTitle, fontSize: "18px" }}>GT Domination</h5>
                <p className="small mb-0" style={{ opacity: 0.7, lineHeight: "1.6" }}>
                  Veloce GT debuts publicly at the Geneva Showcase, immediately claiming three consecutive endurance lap-records across legendary circuits.
                </p>
              </div>
            </Col>

            <Col lg={3} md={6}>
              <div style={styles.timelineCard} className="timeline-block">
                <div style={styles.timelineYear}>2024</div>
                <h5 style={{ ...styles.valueTitle, fontSize: "18px" }}>The EV Revelation</h5>
                <p className="small mb-0" style={{ opacity: 0.7, lineHeight: "1.6" }}>
                  We successfully deployed high-density 800V solid-state architecture into our performance platforms, delivering over 1400 Nm instantaneous torque.
                </p>
              </div>
            </Col>

            <Col lg={3} md={6}>
              <div style={styles.timelineCard} className="timeline-block">
                <div style={styles.timelineYear}>2026</div>
                <h5 style={{ ...styles.valueTitle, fontSize: "18px" }}>Global Expansions</h5>
                <p className="small mb-0" style={{ opacity: 0.7, lineHeight: "1.6" }}>
                  Opening localized elite design custom engineering spaces across major automotive hubs, bringing custom tailoring variants to private owners.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* SECTION 2: Core Engineering Principles */}
      <section style={styles.coreValuesSection}>
        <Container>
          <div className="text-center mb-5">
            <span style={styles.sectionTag}>Our Pillars</span>
            <h3 style={{ ...styles.mainHeading, fontSize: "45px" }}>ENGINEERING MANTRAS</h3>
          </div>

          <Row className="g-4">
            <Col md={4}>
              <div className="value-card" style={{ height: "100%" }}>
                <div style={{ fontSize: "24px", color: "#C8102E" }}>01 / /</div>
                <h4 style={styles.valueTitle}>Anisotropic Monocoques</h4>
                <p className="small" style={{ opacity: 0.7, lineHeight: "1.7" }}>
                  We utilize complex layered carbon configurations weave-aligned specifically to structural stress matrices. Our safety cells maximize torsional rigidity while shaving crucial grams off track-weight configurations.
                </p>
              </div>
            </Col>
            
            <Col md={4}>
              <div className="value-card" style={{ height: "100%" }}>
                <div style={{ fontSize: "24px", color: "#C8102E" }}>02 / /</div>
                <h4 style={styles.valueTitle}>Thermal Kinetic Synthesis</h4>
                <p className="small" style={{ opacity: 0.7, lineHeight: "1.7" }}>
                  Every system utilizes high-efficiency iconel exhaust channeling paired to variable twin-scroll turbocharging complexes. Airflow isn't managed; it is weaponized for power plants.
                </p>
              </div>
            </Col>

            <Col md={4}>
              <div className="value-card" style={{ height: "100%" }}>
                <div style={{ fontSize: "24px", color: "#C8102E" }}>03 / /</div>
                <h4 style={styles.valueTitle}>Symbiotic Telemetry</h4>
                <p className="small" style={{ opacity: 0.7, lineHeight: "1.7" }}>
                  We program custom sub-millisecond throttle tracking models directly mapping active aero flaps with planetary e-diff differentials. The hardware adapts instantly to your driving line.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

    </>
  );
}