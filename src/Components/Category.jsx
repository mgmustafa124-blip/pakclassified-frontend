import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Spinner, Badge } from "react-bootstrap";

const styles = {
    pageWrapper: {
        background: "#0A0A0A", // Matching the sleek true dark palette
        color: "#fff",
        minHeight: "100vh",
        padding: "60px 0",
        fontFamily: "'DM Sans', sans-serif",
    },
    categoryTitle: {
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: "calc(32px + 2vw)", // Fluid fluid-typography
        letterSpacing: "0.06em",
        color: "#fff",
        marginBottom: "5px",
        lineHeight: "1.1"
    },
    accentLine: {
        width: "60px",
        height: "4px",
        background: "#C8102E",
        marginBottom: "40px",
    },
    postCard: {
        background: "#141414",
        border: "1px solid rgba(255, 255, 255, 0.05)",
        borderRadius: "6px",
        overflow: "hidden",
        transition: "all 0.3s ease",
        height: "100%",
        display: "flex",
        flexDirection: "column",
    },
    cardImageWrapper: {
        position: "relative",
        width: "100%",
        height: "240px", // Fixed standard display ratio
        overflow: "hidden",
        backgroundColor: "#1f1f1f"
    },
    cardImage: {
        height: "100%",
        width: "100%",
        objectFit: "cover",
        borderBottom: "1px solid rgba(200,16,46,0.15)",
    },
    cardContentBox: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        flexGrow: 1, // Forces lower sections to push downwards equally
        padding: "20px"
    },
    cardTitle: {
        fontSize: "20px",
        fontWeight: "600",
        color: "#fff",
        lineHeight: "1.3",
    },
    cardText: {
        color: "#aaa",
        fontSize: "14px",
        lineHeight: "1.6",
    }
};

const customGlobalCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;700&display=swap');

  .post-card-hover:hover {
    transform: translateY(-8px);
    border-color: rgba(200, 16, 46, 0.4) !important;
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.6);
  }
  
  /* Micro-fixes for date stacking on very narrow mobile screens */
  @media (max-width: 380px) {
    .meta-date-row {
        flex-direction: column !important;
        align-items: start !important;
        gap: 6px !important;
    }
  }
`;

export default function CategoryPage() {
    const { id } = useParams();

    const [posts, setPosts] = useState([]);
    const [categoryName, setCategoryName] = useState("Vehicles"); // Controlled dynamic title fallback
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchCategoryPosts() {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`http://localhost:3000/Post/readcat/${id}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch posts for this category.");
                }
                const data = await response.json();
                setPosts(data);
                
                // Extract category name dynamically safely
                if (data.length > 0 && data[0]?.CategoryID?.Name) {
                    setCategoryName(data[0].CategoryID.Name);
                }
            } catch (err) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        if (id) {
            fetchCategoryPosts();
        }
    }, [id]);

    return (
        <>
            <style>{customGlobalCSS}</style>
            <div style={styles.pageWrapper}>
                <Container>
                    {/* Header Section */}
                    <div className="mb-2 px-1">
                        <span className="text-uppercase small tracking-wider text-secondary d-block mb-1" style={{ letterSpacing: '0.2em', color: '#777' }}>SHOWROOM CATEGORY</span>
                        <h1 style={styles.categoryTitle}>
                            {loading ? "Loading Showroom..." : categoryName}
                        </h1>
                        <div style={styles.accentLine} />
                    </div>

                    {/* Loader State */}
                    {loading && (
                        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "400px" }}>
                            <Spinner animation="border" style={{ color: "#C8102E", width: '3rem', height: '3rem' }} />
                        </div>
                    )}

                    {/* Error State */}
                    {error && !loading && (
                        <div className="text-center py-5 px-3">
                            <p className="text-danger fs-5">⚠️ {error}</p>
                        </div>
                    )}

                    {/* Empty Posts State */}
                    {!loading && !error && posts.length === 0 && (
                        <div className="text-center py-5 mx-1" style={{ background: "#141414", borderRadius: "6px", border: "1px dashed rgba(255,255,255,0.1)" }}>
                            <h3 className="text-light fs-5 mb-2">No Vehicles Posted Yet</h3>
                            <p className="text-muted small mb-0">Be the first to create a premium listing in this category.</p>
                        </div>
                    )}

                    {/* Responsive Posts Grid Display */}
                    {!loading && !error && posts.length > 0 && (
                        <Row className="g-4 px-1">
                            {posts.map((post) => (
                                <Col key={post._id || post.id} xs={12} sm={6} lg={4}>
                                    <Card style={styles.postCard} className="post-card-hover">
                                        
                                        {/* Fixed Aspect Image Wrapper */}
                                        <div style={styles.cardImageWrapper}>
                                            <Card.Img
                                                variant="top"
                                                src={post.Image ? `http://localhost:3000/${post.Image.replace(/\\/g, '/')}` : "https://via.placeholder.com/600x400?text=Veloce+Automobiles"}
                                                style={styles.cardImage}
                                                alt={post.Name || "Vehicle"}
                                            />
                                        </div>

                                        {/* Structured Content Body */}
                                        <div style={styles.cardContentBox}>
                                            {/* Upper half of card details */}
                                            <div className="mb-4">
                                                <div className="d-flex justify-content-between align-items-center gap-2 mb-3">
                                                    <Badge style={{ background: "rgba(200, 16, 46, 0.15)", color: "#C8102E", border: "1px solid rgba(200, 16, 46, 0.3)", fontSize: "10px", padding: "5px 10px", letterSpacing: "0.05em" }}>
                                                        {post.CategoryID?.Name || "Vehicle"}
                                                    </Badge>
                                                    {post.Price && (
                                                        <span className="fw-bold fs-5 text-white">
                                                            Rs. {Number(post.Price).toLocaleString('en-PK')}
                                                        </span>
                                                    )}
                                                </div>

                                                <Card.Title style={styles.cardTitle} className="mb-2 text-white">
                                                    {post.Name}
                                                </Card.Title>

                                                <Card.Text style={styles.cardText} className="text-secondary">
                                                    {post.Description || "No registration description provided for this performance model."}
                                                </Card.Text>
                                            </div>

                                            {/* Lower section fixed at the bottom */}
                                            <div>
                                                <hr style={{ borderColor: "rgba(255,255,255,0.08)", margin: "0 0 15px 0" }} />

                                                <div className="text-secondary" style={{ fontSize: "13px" }}>
                                                    {/* Flex Wrap Fix applied */}
                                                    <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-2 meta-date-row">
                                                        <span>📅 <strong className="text-light">Start:</strong> {post.Startdate || "N/A"}</span>
                                                        <span>⌛ <strong className="text-light">End:</strong> {post.Enddate || "N/A"}</span>
                                                    </div>

                                                    <div className="pt-2 border-top border-secondary border-opacity-25 d-flex flex-column gap-1" style={{ opacity: 0.85 }}>
                                                        <div className="text-truncate">
                                                            📍 <strong className="text-light">City:</strong> <span className="font-monospace text-muted">{post.CityID?.Name || "Global"}</span>
                                                        </div>
                                                        <div className="text-truncate">
                                                            ⚙️ <strong className="text-light">Status:</strong> <span className="font-monospace text-muted">{post.StatusID?.Name || "Available"}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    )}
                </Container>
            </div>
        </>
    );
}