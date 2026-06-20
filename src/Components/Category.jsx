import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Spinner, Badge } from "react-bootstrap";

const styles = {
    pageWrapper: {
        background: "#272727",
        color: "#fff",
        minHeight: "100vh",
        padding: "40px 0", // Mobile friendly dynamic padding feel
        fontFamily: "'DM Sans', sans-serif",
    },
    categoryTitle: {
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: "calc(28px + 1.5vw)", // Adjusted fluid typography
        letterSpacing: "0.06em",
        color: "#fff",
        marginBottom: "5px",
        lineHeight: "1.1"
    },
    accentLine: {
        width: "60px",
        height: "4px",
        background: "#C8102E",
        marginBottom: "30px",
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
        overflow: "hidden",
        backgroundColor: "#1f1f1f"
    },
    cardContentBox: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        flexGrow: 1, 
        padding: "16px" // Fluid padding for mobile compatibility
    },
    cardTitle: {
        fontSize: "18px", // Clean font tracking
        fontWeight: "600",
        color: "#fff",
        lineHeight: "1.3",
    },
    cardText: {
        color: "#aaa",
        fontSize: "13px",
        lineHeight: "1.5",
    }
};

const customGlobalCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;700&display=swap');

  .post-card-hover:hover {
    transform: translateY(-6px);
    border-color: rgba(200, 16, 46, 0.4) !important;
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.6);
  }

  /* Responsive Aspect Ratio Control for Images */
  .responsive-img-wrapper {
     height: 220px;
  }

  @media (max-width: 576px) {
     .responsive-img-wrapper {
         height: 180px; /* Smaller aspect for compact mobile screens */
     }
  }
`;

export default function CategoryPage() {
    const { id } = useParams();

    const [posts, setPosts] = useState([]);
    const [categoryName, setCategoryName] = useState("Vehicles"); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const url = import.meta.env.VITE_API_URL;

    useEffect(() => {
        async function fetchCategoryPosts() {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`${url}/Post/readcat/${id}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch posts for this category.");
                }
                const data = await response.json();
                setPosts(data);
                
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
                        <Row className="g-3 g-md-4 px-1"> {/* Adaptive spacing between grids */}
                            {posts.map((post) => (
                                <Col key={post._id || post.id} xs={12} sm={6} lg={4}>
                                    <Card style={styles.postCard} className="post-card-hover">
                                        
                                        {/* Image Container with Media Query adjustments */}
                                        <div style={styles.cardImageWrapper} className="responsive-img-wrapper">
                                            <Card.Img
                                                variant="top"
                                                src={post.Image ? `${url}/${post.Image.replace(/\\/g, '/')}` : "https://via.placeholder.com/600x400?text=Veloce+Automobiles"}
                                                style={{ height: "100%", width: "100%", objectFit: "cover", borderBottom: "1px solid rgba(200,16,46,0.15)" }}
                                                alt={post.Name || "Vehicle"}
                                            />
                                        </div>

                                        {/* Content Area */}
                                        <div style={styles.cardContentBox}>
                                            <div className="mb-3">
                                                {/* Meta Badges Row: Managed Wrapping */}
                                                <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-2">
                                                    <Badge className=" bg-dark-subtle text-body">
                                                        {post.CategoryID?.Name || "Vehicle"}
                                                    </Badge>
                                                    {post.Price && (
                                                        <span className="fw-bold fs-6 text-white">
                                                            Rs. {(post.Price).toLocaleString('en-PK')}
                                                        </span>
                                                    )}
                                                </div>

                                                <Card.Title style={styles.cardTitle} className="mb-2 text-white text-truncate">
                                                    {post.Name}
                                                </Card.Title>

                                                <Card.Text style={styles.cardText} className="text-secondary line-clamp">
                                                    {post.Description || "No registration description provided for this performance model."}
                                                </Card.Text>
                                            </div>

                                            {/* Bottom Metadata Section */}
                                            <div>
                                                <hr style={{ borderColor: "rgba(255,255,255,0.08)", margin: "0 0 12px 0" }} />

                                                <div className="text-secondary" style={{ fontSize: "12px" }}>
                                                    {/* Proper Responsive Grid for Dates instead of vulnerable Flexbox */}
                                                    <div className="row g-1 mb-2">
                                                        <div className="col-6 text-truncate">
                                                            <span>📅 <strong className="text-light">Start:</strong> {post.Startdate || "N/A"}</span>
                                                        </div>
                                                        <div className="col-6 text-end text-truncate">
                                                            <span>⌛ <strong className="text-light">End:</strong> {post.Enddate || "N/A"}</span>
                                                        </div>
                                                    </div>

                                                    <div className="pt-2 border-top border-secondary border-opacity-25 row g-1" style={{ opacity: 0.85 }}>
                                                        <div className="col-6 text-truncate">
                                                            📍 <strong className="text-light">City:</strong> <span className="font-monospace ">{post.CityID?.Name || "Global"}</span>
                                                        </div>
                                                        <div className="col-6 text-end text-truncate">
                                                            ⚙️ <strong className="text-light">Status:</strong> <span className="font-monospace">{post.StatusID?.Name || "Available"}</span>
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