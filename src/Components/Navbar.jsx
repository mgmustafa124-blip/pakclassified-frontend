import { useEffect, useContext, useState } from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Container,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "../Modals/Login";
import Signup from "../Modals/Signup";
import { NavLink } from "react-router-dom";
import Post from "../Modals/Post";
import { UserContext } from "../context/User.context";

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
    padding: "5px 0", // Reduced from 10px to 5px
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
    background: "#f01338",
    border: "none",
    color: "#fff",
    padding: "8px 20px",
    borderRadius: "3px",
    fontSize: "12px",
    fontWeight: 500,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    cursor: "pointer",
    transition: "all 0.2s ease",
    fontFamily: "'DM Sans', sans-serif",
  },
};

const globalCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500&display=swap');
  @import url('https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css');
  body { background: #111 !important; }
  
  /* Custom Navbar Toggle Styling */
  .navbar-toggler {
    border-color: rgba(255, 255, 255, 0.1) !important;
  }
  .navbar-toggler-icon {
    filter: invert(1); /* Makes the burger icon white */
  }

  /* --- CATEGORIES DROPDOWN CUSTOM STYLING --- */
  .categories-dropdown .dropdown-toggle {
    color: #999 !important;
    font-size: 13px !important;
    font-weight: 500 !important;
    letter-spacing: 0.05em !important;
    text-transform: uppercase !important;
    font-family: 'DM Sans', sans-serif !important;
    padding: 12px 14px !important; /* FIXED: Reduced vertical padding from 28px to 12px */
    background: transparent !important;
    border: none !important;
    transition: color 0.2s !important;
  }
  @media (max-width: 991px) {
    .categories-dropdown .dropdown-toggle {
      padding: 12px 0px !important; /* Mobile padding fixed */
    }
  }
  .categories-dropdown .dropdown-toggle:hover {
    color: #f4e9e9 !important;
  }
  .categories-dropdown .dropdown-menu {
    background: #141414 !important;
    border: 1px solid rgba(200,16,46,0.2) !important;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5) !important;
    padding: 6px 0 !important;
  }
  .categories-dropdown .dropdown-item {
    color: #c2abab !important;
    font-size: 13px !important;
    padding: 10px 18px !important;
    font-family: 'DM Sans', sans-serif !important;
    transition: all 0.15s ease !important;
  }
  .categories-dropdown .dropdown-item:hover {
    background: rgba(200, 16, 46, 0.1) !important;
    color: #fcf8f8 !important;
    padding-left: 22px !important;
  }

  .user-dropdown .dropdown-item i {
    width: 18px;
    text-align: center;
    flex-shrink: 0;
  }
  .veloce-nav .nav-link {
    color: #999 !important;
    font-size: 13px !important;
    font-weight: 500 !important;
    letter-spacing: 0.05em !important;
    text-transform: uppercase !important;
    padding: ; /* FIXED: Reduced vertical padding from 28px to 12px */
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
  
  .veloce-cta:hover {
    background: #750c1c !important;
  }
  .veloce-signup-btn:hover {
    background: rgba(255, 255, 255, 0.08) !important;
    color: #fff !important;
  }

  /* Trigger Button Styling */
  .user-dropdown .dropdown-toggle {
    color: #f5efef !important;
    font-size: 12px !important;
    font-weight: 500 !important;
    letter-spacing: 0.08em !important;
    text-transform: uppercase !important;
    font-family: 'DM Sans', sans-serif !important;
    background: transparent !important;
    padding: ; /* FIXED: Slightly reduced padding from 8px to 6px */
    border-radius: 3px !important;
    transition: all 0.2s ease-in-out !important;
    display: flex !important;
    align-items: center !important;
  }
  
  .user-dropdown .dropdown-toggle:hover {
    background: rgba(200, 16, 46, 0.05) !important;
  }

  .user-dropdown .dropdown-toggle::after {
    margin-left: 8px !important;
    transition: transform 0.2s ease;
  }
  
  .user-dropdown .dropdown-menu {
    background: #141414 !important;
    padding: 6px 0 !important;
    min-width: 180px !important;
    margin-top: 10px !important;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5) !important;
  }

  .user-dropdown .dropdown-item {
    color: #c2abab !important;
    font-size: 13px !important;
    padding: 10px 18px !important;
    letter-spacing: 0.02em !important;
    font-family: 'DM Sans', sans-serif !important;
    transition: all 0.15s ease !important;
    display: flex !important;
    align-items: center !important;
    gap: 8px !important;
  }

  .user-dropdown .dropdown-item:hover {
    background: rgba(200, 16, 46, 0.1) !important;
    color: #eae4e4 !important;
    padding-left: 22px !important;
  }

  .user-dropdown .dropdown-item.text-danger {
    color: #f01338 !important;
  }
  
  .user-dropdown .dropdown-item.text-danger:hover {
    background: rgba(240, 19, 56, 0.12) !important;
    color: #ff4d6d !important;
  }

  .user-dropdown .dropdown-divider {
    border-color: rgba(255, 255, 255, 0.08) !important;
    margin: 4px 0 !important;
  }

  @media (max-width: 991px) {
    .categories-dropdown .dropdown-toggle {
      padding: 12px 0px !important;
      width: 100%;
      text-align: left;
    }
    .veloce-nav .nav-link {
      padding: 12px 0px !important; /* Mobile links spacing fixed */
    }
    .veloce-nav .nav-link::after {
      display: none !important;
    }
    .user-dropdown {
      width: 100%;
      margin-top: 10px;
    }
    .user-dropdown .dropdown-toggle {
      width: 100%;
      justify-content: space-between;
      border: 1px solid rgba(255, 255, 255, 0.1) !important;
    }
    .user-dropdown .dropdown-menu,
    .categories-dropdown .dropdown-menu {
      position: static !important;
      float: none !important;
      width: 100% !important;
      box-shadow: none !important;
      background: #1c1c1c !important;
      margin-top: 5px !important;
      border-top: none !important;
      border-left: 2px solid #C8102E !important;
    }
  }
`;

export default function CarNavbar() {
  const [login, setlogin] = useState(false);
  const [signup, setsignup] = useState(false);
  const [post, setpost] = useState(false);
  const [category, setcategory] = useState([]);
  const user = useContext(UserContext);

  async function fetchCategories() {
    try {
      const data = await fetch('http://localhost:3000/Category/read');
      const categories = await data.json();
      setcategory(categories);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  function logout() {
    localStorage.removeItem("auth");
    user.setuser(null);
  }

  return (
    <>
      <style>{globalCSS}</style>

      {/* Top Bar */}
      <div style={styles.topBar}>
        <Container className="d-flex justify-content-between align-items-center px-3">
          <span>
            📍 Lahore &nbsp;|&nbsp;{" "}
            <a href="#" style={styles.topBarLink}>
              Find a Dealer
            </a>
          </span>
          <span className="d-none d-md-block">
            Free test drive booking ·{" "}
            <a href="#" style={styles.topBarLink}>
              Book Now
            </a>
          </span>
        </Container>
      </div>

      {/* Main Navbar */}
      <Navbar expand="lg" style={styles.mainNav} className="veloce-nav">
        <Container className="px-3 ">
          {/* Brand */}
          <Navbar.Brand href="#" style={styles.brandWrapper}>
            <span style={styles.brandDot} />
            <div>
              <p style={styles.brandName}>VELOCE</p>
              <span style={styles.brandSub}>Automobiles</span>
            </div>
          </Navbar.Brand>

          {/* Toggle Button for Mobile */}
          <Navbar.Toggle aria-controls="main-nav" />

          {/* Collapsible Content */}
          <Navbar.Collapse id="main-nav" className="mt-3 mt-lg-0">
            <Nav className="mx-auto align-items-lg-center">
              <Nav.Link as={NavLink} to="/home" className="active">
                Home
              </Nav.Link>

              <Nav.Link as={NavLink} to="about">
                About
              </Nav.Link>
              
              <Nav.Link as={NavLink} to="contact">
                Contact
              </Nav.Link>
              
              {/* Categories Dropdown */}
              <NavDropdown
                title="Category"
                id="categories-dropdown"
                className="categories-dropdown"
              >
                {category.length > 0 ? (
                  category.map((cat) => (
                    <NavDropdown.Item
                      key={cat._id || cat.id}
                      as={NavLink}
                      to={`/category/${cat._id || cat.id}`}
                    >
                      {cat.Name}
                    </NavDropdown.Item>
                  ))
                ) : (
                  <NavDropdown.Item disabled>No Categories Found</NavDropdown.Item>
                )}
              </NavDropdown>
            </Nav>

            {/* Auth Buttons / Profile Sections */}
            <div className="d-flex align-items-center mt-3 mt-lg-0">
              {user.user ? (
                /* Profile Dropdown if logged in */
                <NavDropdown
                  title={
                    <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{
                        width: "35px", height: "35px", borderRadius: "50%", /* FIXED: Reduced from 40px to 35px */
                        background: "#C8102E", display: "inline-flex",
                        alignItems: "center", justifyContent: "center",
                        fontSize: "12px", fontWeight: 600, color: "#fff",
                        flexShrink: 0, overflow: "hidden"
                      }}>
                        {user.user?.Image ? (
                          <img
                            src={`http://localhost:3000/${user.user.Image}`}
                            alt="Profile"
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          />
                        ) : (
                          user.user?.Name?.charAt(0)?.toUpperCase() || "U"
                        )}
                      </span>
                      <span className="fs-6 fw-bold text-light">My Account</span>
                    </span>
                  }
                  id="user-account-dropdown"
                  className="user-dropdown"
                  align="end"
                >
                  <NavDropdown.Item
                    href="#"
                    onClick={(e) => { e.preventDefault(); setpost(true); }}
                  >
                    <i className="ti ti-pencil-plus" style={{ fontSize: "16px", color: "#C8102E" }} aria-hidden="true"></i>
                    Create Post
                  </NavDropdown.Item>

                  <NavDropdown.Item href="#" as={NavLink} to="profile">
                    <i className="ti ti-user-circle" style={{ fontSize: "16px", color: "#888" }} aria-hidden="true"></i>
                    My Profile
                  </NavDropdown.Item>

                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    href="#"
                    onClick={(e) => { e.preventDefault(); logout(); }}
                    className="text-danger"
                  >
                    <i className="ti ti-logout" style={{ fontSize: "16px" }} aria-hidden="true"></i>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                /* Responsive Buttons if logged out */
                <div className="d-flex flex-column flex-sm-row align-items-stretch align-items-lg-center w-100 gap-2 gap-lg-0">
                  <button
                    style={styles.ctaBtn}
                    className="border bg-transparent veloce-signup-btn order-2 order-lg-1 me-0 me-lg-2"
                    onClick={(e) => {
                      e.preventDefault();
                      setsignup(true);
                    }}
                  >
                    Sign up
                  </button>

                  <button
                    style={styles.ctaBtn}
                    className="veloce-cta order-1 order-lg-2"
                    onClick={(e) => {
                      e.preventDefault();
                      setlogin(true);
                    }}
                  >
                    Login
                  </button>
                </div>
              )}
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Post show={post} handleClose={() => setpost(false)} />
      <Login show={login} handleClose={() => setlogin(false)} />
      <Signup show={signup} handleClose={() => setsignup(false)} />
    </>
  );
}