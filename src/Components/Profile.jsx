import React, { useState, useContext, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Nav, Tab, Badge, Spinner } from 'react-bootstrap';
import { UserContext } from "../context/User.context";
import { useNavigate } from 'react-router-dom';
import Post from '../Modals/Post';

const styles = {
  pageWrapper: {
    background: "#212121",
    color: "#E5E5E5",
    fontFamily: "'DM Sans', sans-serif",
    minHeight: "100vh",
    paddingBottom: "80px",
  },
  heroBanner: {
    width: "100%",
    height: "calc(180px + 10vw)", // Fluid height adjustment
    background: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(33, 33, 33, 1)), url('https://wallpapers.com/images/hd/black-car-4k-8iilwvng2997orpp.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    textAlign: "center",
    padding: "0 20px",
    marginBottom: "40px"
  },
  heroSub: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "11px",
    color: "#C8102E",
    letterSpacing: "0.3em",
    textTransform: "uppercase",
    fontWeight: "700",
    marginBottom: "10px"
  },
  heroTitle: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: "calc(32px + 2.5vw)", // Responsive fluid typography
    color: "#fff",
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    margin: "0",
    lineHeight: "1"
  },
  profileCard: {
    background: "#141414",
    border: "1px solid rgba(255, 255, 255, 0.05)",
    borderRadius: "12px",
    padding: "25px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.7)",
  },
  avatarWrapper: {
    width: "110px",
    height: "110px",
    borderRadius: "50%",
    background: "#C8102E",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "36px",
    fontWeight: 600,
    color: "#fff",
    margin: "0 auto 20px auto",
    overflow: "hidden",
    border: "2px solid #C8102E",
    boxShadow: "0 0 25px rgba(200, 16, 46, 0.3)",
  },
  userName: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: "32px",
    color: "#fff",
    letterSpacing: "0.05em",
    marginBottom: "5px",
    textAlign: "center",
  },
  userMeta: {
    fontSize: "13px",
    color: "#888",
    textAlign: "center",
    marginBottom: "20px",
  },
  sectionHeading: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: "28px",
    color: "#fff",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    marginBottom: "25px",
  },
  postCard: {
    background: "#141414",
    border: "1px solid rgba(255, 255, 255, 0.04)",
    borderRadius: "12px",
    overflow: "hidden",
    transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.4)"
  },
  postTitle: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: "24px",
    color: "#fff",
    letterSpacing: "0.05em",
    marginBottom: "0",
    textTransform: "uppercase",
  },
  metaLabel: {
    fontSize: "10px",
    color: "#666",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    fontWeight: "600",
    display: "block",
    marginBottom: "1px"
  },
  metaValue: {
    fontSize: "13px",
    color: "#fff",
    fontWeight: "500"
  },
  priceTag: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: "22px",
    color: "#C8102E",
    letterSpacing: "0.03em"
  },
  actionBtn: {
    background: "transparent",
    border: "1px solid rgba(255, 255, 255, 0.15)",
    borderRadius: "6px",
    color: "#fff",
    fontSize: "11px",
    fontWeight: 600,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    padding: "8px 16px",
    transition: "all 0.3s ease",
  },
  deleteBtn: {
    background: "rgba(200, 16, 46, 0.1)",
    border: "none",
    borderRadius: "6px",
    color: "#C8102E",
    padding: "8px 14px",
    transition: "all 0.3s ease",
  }
};

const customCSS = `
  .profile-tabs .nav-link {
    color: #666 !important;
    text-transform: uppercase;
    font-size: 13px;
    letter-spacing: 0.08em;
    font-weight: 600;
    border: none !important;
    padding: 12px 0px;
    margin-right: 30px;
    transition: all 0.3s ease;
    position: relative;
  }
  .profile-tabs .nav-link.active {
    background: transparent !important;
    color: #fff !important;
  }
  .profile-tabs .nav-link.active::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: #C8102E;
  }
  .veloce-post-card:hover {
    transform: translateY(-4px);
    border-color: rgba(200, 16, 46, 0.4) !important;
    box-shadow: 0 20px 40px rgba(0,0,0,0.8);
  }
  .veloce-action-btn:hover {
    background: #fff !important;
    color: #000 !important;
    border-color: #fff !important;
  }
  .veloce-delete-btn:hover {
    background: #C8102E !important;
    color: #fff !important;
  }

  /* Responsive Fixes for Sticky Sidebar & Post Card layout */
  @media (min-width: 992px) {
    .veloce-sticky-sidebar {
      position: sticky !important;
      top: 40px;
    }
  }

  @media (max-width: 767px) {
    .veloce-post-img-wrapper {
      min-height: 180px !important;
    }
    .veloce-post-img {
      position: relative !important;
    }
    .veloce-card-header-flex {
      flex-direction: column !important;
      align-items: flex-start !important;
      gap: 5px;
    }
  }
`;

export default function VeloceProfile() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchUserPosts = async () => {
      const userId = user?.id;
      if (!userId) return;

      try {
        const response = await fetch(`http://localhost:3000/Post/Userposts/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch garage showcase data.');
        }
        const data = await response.json();
        setUserPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchUserPosts();
    }
  }, [user]);

  const handleDeletePost = async (id) => {
    if (window.confirm("Are you sure you want to remove this machine?")) {
      try {
        await fetch(`http://localhost:3000/Post/delete/${id}`, { method: 'DELETE' });
        window.location.reload();
      } catch (err) {
        alert("Could not delete post. Try again.");
      }
    }
  };

  if (!user) {
    return (
      <div style={{ ...styles.pageWrapper, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Spinner animation="border" variant="danger" />
      </div>
    );
  }

  return (
    <>
      <style>{customCSS}</style>

      <div style={styles.pageWrapper}>
        <div style={styles.heroBanner}>
          <span style={styles.heroSub}>Veloce Drivers Club</span>
          <h1 style={styles.heroTitle}>The Garage</h1>
        </div>

        <Container>
          <Row className="gy-4">
            <Col lg={4}>
              <div style={styles.profileCard} className="veloce-sticky-sidebar">
                <div style={styles.avatarWrapper}>
                  {user?.Image ? (
                    <img
                      src={`http://localhost:3000/${user.Image}`}
                      alt="Profile"
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  ) : (
                    user?.Name?.charAt(0)?.toUpperCase() || "U"
                  )}
                </div>

                <h2 style={styles.userName}>{user?.Name || "Veloce Driver"}</h2>
                <div style={styles.userMeta}>
                  <div>{user?.Email || "driver@veloce.com"}</div>
                  <div className="mt-1">Member since 2026</div>
                </div>

                <hr style={{ borderColor: "rgba(255,255,255,0.06)", margin: "20px 0" }} />

                <div className="text-center">
                  <div className="small text-muted text-uppercase mb-2" style={{ letterSpacing: '0.08em', fontSize: '11px' }}>Account Tier</div>
                  <Badge bg="transparent" className="border border-danger text-danger px-3 py-2" style={{ fontSize: '11px', letterSpacing: '0.08em', fontWeight: '600' }}>
                    🏎️ PRESTIGE MEMBER
                  </Badge>
                </div>
              </div>
            </Col>

            <Col lg={8}>
              <Tab.Container defaultActiveKey="my-posts">
                <Nav variant="tabs" className="profile-tabs border-bottom rgba-white-10 mb-4">
                  <Nav.Item>
                    <Nav.Link eventKey="my-posts">
                      My Showcase ({loading ? "..." : userPosts.length})
                    </Nav.Link>
                  </Nav.Item>
                </Nav>

                <Tab.Content>
                  <Tab.Pane eventKey="my-posts">
                    <h3 style={styles.sectionHeading}>Your Garage Showcase</h3>

                    {loading && (
                      <div className="text-center py-5">
                        <Spinner animation="border" variant="danger" size="sm" />
                        <p className="text-muted mt-3 small">Revving engines...</p>
                      </div>
                    )}
                    {!loading && error && <div className="text-center py-5 text-danger">Error: {error}</div>}
                    {!loading && !error && userPosts.length === 0 && <div className="text-center py-5 text-muted">No hyper-cars listed yet.</div>}

                    {!loading && !error && userPosts.length > 0 && (
                      <div className="d-flex flex-column gap-4">
                        {userPosts.map((post) => {
                          const currentId = post.id || post._id;

                          return (
                            <Card style={styles.postCard} className="veloce-post-card" key={currentId}>
                              <Row className="g-0 align-items-stretch">
                                {/* Fixed CSS layout wrapper for images on mobile */}
                                <Col md={4} className="veloce-post-img-wrapper" style={{ position: 'relative' }}>
                                  <Card.Img
                                    src={`http://localhost:3000/${post.Image}`}
                                    className="veloce-post-img"
                                    style={{ width: "100%", height: "100%", objectFit: "cover", position: 'absolute', top: 0, left: 0 }}
                                  />
                                  {post.status && (
                                    <Badge
                                      bg="black"
                                      className={`position-absolute border ${post.status === 'Active' ? 'border-success text-success' : 'border-warning text-warning'}`}
                                      style={{ top: '12px', left: '12px', fontSize: '9px', letterSpacing: '0.05em', padding: '4px 8px', zIndex: 2 }}
                                    >
                                      • {post.status.toUpperCase()}
                                    </Badge>
                                  )}
                                </Col>

                                <Col md={8}>
                                  <Card.Body className="d-flex flex-column justify-content-between p-4 h-100">
                                    <div className="d-flex justify-content-between align-items-start mb-3 veloce-card-header-flex">
                                      <Card.Title style={styles.postTitle}>{post.Name}</Card.Title>
                                      <span style={styles.priceTag}>
                                        {post.Price ? `Rs. ${Number(post.Price).toLocaleString('en-PK')}` : "Contact"}
                                      </span>
                                    </div>

                                    <Row className="g-2 mb-3 border-top border-bottom py-2" style={{ borderColor: 'rgba(255,255,255,0.03)' }}>
                                      <Col xs={4}>
                                        <span style={styles.metaLabel}>Model Year</span>
                                        <span style={styles.metaValue}>{post.StatusID?.Name || "—"}</span>
                                      </Col>
                                      <Col xs={4}>
                                        <span style={styles.metaLabel}>Category</span>
                                        <span style={styles.metaValue}>{post.CategoryID?.Name || "—"}</span>
                                      </Col>
                                      <Col xs={4}>
                                        <span style={styles.metaLabel}>Location</span>
                                        <span style={styles.metaValue}>{post.CityID?.Name || "—"}</span>
                                      </Col>
                                    </Row>

                                    {post.Description && (
                                      <div className="mb-4">
                                        <span style={styles.metaLabel}>Specifications & Overview</span>
                                        <p className="text-light small mb-0 style-description" style={{ lineHeight: '1.5', display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                          {post.Description}
                                        </p>
                                      </div>
                                    )}

                                    <div className="d-flex gap-2 justify-content-end">
                                      <Button
                                        style={styles.actionBtn}
                                        className="veloce-action-btn"
                                        onClick={() => {
                                          setSelectedPostId(currentId);
                                          setShowModal(true);
                                        }}
                                      >
                                        Manage Post
                                      </Button>
                                      <Button
                                        style={styles.deleteBtn}
                                        className="veloce-delete-btn"
                                        onClick={() => handleDeletePost(currentId)}
                                      >
                                        🗑️
                                      </Button>
                                    </div>
                                  </Card.Body>
                                </Col>
                              </Row>
                            </Card>
                          );
                        })}
                      </div>
                    )}
                  </Tab.Pane>
                </Tab.Content>
              </Tab.Container>
            </Col>
          </Row>
        </Container>
      </div>
      <Post
        show={showModal}
        handleClose={() => { setShowModal(false); setSelectedPostId(null); }}
        postId={selectedPostId}
      />
    </>
  );
}