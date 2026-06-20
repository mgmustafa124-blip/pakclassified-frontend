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
    padding: "0",
    fontSize: "10px",
    color: "#fff",
    letterSpacing: "0.03em"
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
    minHeight: "50px", 
    display: "flex",
    alignItems: "center",
  },
  brandWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    textDecoration: "none",
    padding: "5px 0",
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
    fontSize: "24px", 
    color: "#fff",
    letterSpacing: "0.06em",
    lineHeight: 1,
    margin: 0,
  },
  brandSub: {
    fontSize: "9px", 
    color: "#C8102E",
    fontFamily: "'DM Sans', sans-serif",
    letterSpacing: "0.2em",
    fontWeight: 500,
    textTransform: "uppercase",
    display: "block",
  },
  ctaBtn: {
    background: "#f01338",
    border: "none",
    color: "#fff",
    padding: "6px 16px", 
    borderRadius: "3px",
    fontSize: "11px",
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
    padding:
  }
  .navbar-toggler-icon {
    filter: invert(1);
  }

  /* --- CATEGORIES DROPDOWN CUSTOM STYLING --- */
  .categories-dropdown .dropdown-toggle {
    color: #999 !important;
    font-size: 13px !important;
    font-weight: 500 !important;
    letter-spacing: 0.05em !important;
    text-transform: uppercase !important;
    font-family: 'DM Sans', sans-serif !important;
    padding: 12px 14px !important; 
    background: transparent !important;
    border: none !important;
    transition: color 0.2s !important;
    display: flex !important;
    align-items: center !important;
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
  
  /* Desktop Navigation Links (Force exact padding even on active state) */
  .veloce-nav .navbar-nav .nav-link {
    color: #999 !important;
    font-size: 13px !important;
    font-weight: 500 !important;
    letter-spacing: 0.05em !important;
    text-transform: uppercase !important;
    padding: 12px 14px !important; /* Fixed padding enforced everywhere */
    position: relative !important;
    transition: color 0.2s !important;
    font-family: 'DM Sans', sans-serif !important;
  }
  
  .veloce-nav .navbar-nav .nav-link::after {
    content: '';
    position: absolute;
    bottom: 0; left: 14px; right: 14px;
    height: 2px;
    background: #C8102E;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.25s ease;
  }
  
  .veloce-nav .navbar-nav .nav-link:hover,
  .veloce-nav .navbar-nav .nav-link.active {
    color: #fff !important;
  }
  
  .veloce-nav .navbar-nav .nav-link:hover::after,
  .veloce-nav .navbar-nav .nav-link.active::after {
    transform: scaleX(1);
  }
  
  .veloce-cta:hover {
    background: #750c1c !important;
  }
  .veloce-signup-btn:hover {
    background: rgba(255, 255, 255, 0.08) !important;
    color: #fff !important;
  }

  /* User Menu Dropdown */
  .user-dropdown .dropdown-toggle {
    color: #f5efef !important;
    font-size: 12px !important;
    font-weight: 500 !important;
    letter-spacing: 0.08em !important;
    text-transform: uppercase !important;
    font-family: 'DM Sans', sans-serif !important;
    background: transparent !important;
    padding: 16px 12px !important; 
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
    
  }

  /* --- RESPONSIVE MOBILE FIXES --- */
  @media (max-width: 991px) {
    .veloce-nav {
      padding: 10px 0 !important;
    }
    .categories-dropdown .dropdown-toggle {
      padding: 12px 0px !important;
      width: 100%;
      justify-content: space-between;
    }
    .veloce-nav .navbar-nav .nav-link {
      padding: 12px 0px !important;
    }
    .veloce-nav .navbar-nav .nav-link::after {
      display: none !important;
    }
    .user-dropdown {
      width: 100%;
     
    }
    .user-dropdown .dropdown-toggle {
      width: 100%;
      justify-content: space-between;
      border: 1px solid rgba(255, 255, 255, 0.1) !important;
      padding: 12px 16px !important;
    }
    .user-dropdown .dropdown-menu,
    .categories-dropdown .dropdown-menu {
      position: static !important;
      float: none !important;
      width: 100% !important;
      box-shadow: none !important;
      background: #1c1c1c !important;
      border-top: none !important;
      border-left: 3px solid #C8102E !important;
      border-radius: 0 !important;
    }
    .auth-buttons-wrapper {
      padding-bottom: 15px;
    }
  }
`;

export default function CarNavbar() {
  const [login, setlogin] = useState(false);
  const [signup, setsignup] = useState(false);
  const [post, setpost] = useState(false);
  const [category, setcategory] = useState([]);
  const user = useContext(UserContext);
  const url = import.meta.env.VITE_API_URL;

  async function fetchCategories() {
    try {
      const data = await fetch(`${url}/Category/read`);
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

      {/* Main Navbar */}
      <Navbar expand="md" style={styles.mainNav} className="veloce-nav">
        <Container className="px-3">
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
          <Navbar.Collapse id="main-nav">
            <Nav className="mx-auto align-ite-enter">
              {/* FIXED: Removed hardcoded className="active" from Home link */}
              <Nav.Link as={NavLink} to="/home">
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
            <Nav className="d-flex align-items-center">
              {user.user ? (
                /* Profile Dropdown if logged in */
                <NavDropdown
                  title={
                    <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <span style={{
                        width: "40px", height: "40px", borderRadius: "50%", 
                        background: "#C8102E", display: "inline-flex",
                        alignItems: "center", justifyContent: "center",
                        fontSize: "11px", fontWeight: 600, color: "#fff",
                        flexShrink: 0, overflow: "hidden"
                      }}>
                        {user.user?.Image ? (
                          <img
                            src={`${url}/${user.user.Image}`}
                            alt="Profile"
                            style={{ width: "40px", height: "40px", objectFit: "cover" }}
                          />
                        ) : (
                          user.user?.Name?.charAt(0)?.toUpperCase() || "U"
                        )}
                      </span>
                      <span className=" fw-bold text-light">My Account</span>
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
                <div className="auth-buttons-wrapper d-flex flex-column flex-sm-row align-items-stretch align-items-lg-center w-100 gap-2 gap-lg-0">
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
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Post show={post} handleClose={() => setpost(false)} />
      <Login show={login} handleClose={() => setlogin(false)} />
      <Signup show={signup} handleClose={() => setsignup(false)} />
    </>
  );
}