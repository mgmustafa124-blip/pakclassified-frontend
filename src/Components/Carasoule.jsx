import React from 'react';
import { Carousel, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const CarCarousel = () => {
  const slides = [
    {
      id: 1,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeMJhl6DTY10PZXMRRN4JNaqTkRp10yf52wIbsO54fQ0wanvck0XhDpNil&s=10",
      accentTitle: "Hyper",
      mainTitle: "Cars",
      subtitle: "Unleash raw power with a recalibrated V8 twin-turbo.",
      ctaPrimary: "Explore Inventory",
      ctaSecondary: "Build Yours"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1920&q=80",
      accentTitle: "Dark",
      mainTitle: "Edition",
      subtitle: "Aggressive styling meets track-ready aerodynamics.",
      ctaPrimary: "View Gallery",
      ctaSecondary: "Pre-Order"
    },
    {
      id: 3,
      image: "https://wallpapercave.com/wp/wp14723321.png",
      accentTitle: "Redline",
      mainTitle: "Racing",
      subtitle: "Born on the track. Legalized for the streets.",
      ctaPrimary: "Test Drive",
      ctaSecondary: "Locate Dealer"
    }
  ];

  return (
    <>
      {/* Custom CSS injection for Red, Black, and Large Geometric framing */}
      <style>{`
        /* Indicator Overrides */
        .carousel-indicators [data-bs-target] {
          background-color: #dc3545 !important;
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }
        
        /* Navigation Arrows Color Override */
        

        /* Large Master Frame Container wrapping Title, Subtitle, and Buttons */
        .content-master-frame {
          position: relative;
          padding: 30px 60px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          max-width: 600px;
          width: 100%;
        }
        
        /* Expanded Top-Left Corner Angle (Bigger and Thicker) */
        .content-master-frame::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 60px;  /* Increased length */
          height: 60px; /* Increased length */
          border-top: 5px solid #dc3545; /* Thicker border */
          border-left: 5px solid #dc3545;
        }

        /* Expanded Bottom-Right Corner Angle (Positioned past the buttons) */
        .content-master-frame::after {
          content: '';
          position: absolute;
          bottom: 0;
          right: 0;
          width: 60px;  /* Increased length */
          height: 60px; /* Increased length */
          border-bottom: 5px solid #dc3545; /* Thicker border */
          border-right: 5px solid #dc3545;
        }

        /* Custom Hover States for the Dual Buttons */
        .btn-custom-primary:hover {
          background-color: #dc3545 !important;
          color: #000000 !important;
          border-color: #dc3545 !important;
        }
        .btn-custom-secondary:hover {
          background-color: #ffffff !important;
          color: #000000 !important;
          border-color: #ffffff !important;
        }
      `}</style>

      <Carousel fade interval={5000} indicators={true} controls={false} className="bg-black">
        {slides.map((slide) => (
          <Carousel.Item key={slide.id} style={{ height: '66vh', minHeight: '450px' }}>
            
            {/* Premium Black Gradient Overlay */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.8) 100%)',
                zIndex: 1
              }}
            />
            
            <img
              className="d-block w-100 h-100"
              src={slide.image}
              alt={slide.mainTitle}
              style={{ objectFit: 'cover', opacity: '0.7' }}
            />

            <Carousel.Caption 
              className="d-flex flex-column align-items-center justify-content-center"
              style={{ zIndex: 2, bottom: '15%', left: '10%', right: '10%' }}
            >
              
              {/* Master Container: Encloses title, text, and buttons within the large angles */}
              <div className="content-master-frame">
                
                {/* Heading */}
                <h1 className="fw-black text-uppercase display-4 mb-3 tracking-wider text-white">
                  <span style={{ color: '#dc3545' }}>{slide.accentTitle} </span>
                  {slide.mainTitle}
                </h1>
                
                {/* Subtitle */}
                <p className="fs-5 mb-4 text-light opacity-90 text-center fw-light" style={{ maxWidth: '600px' }}>
                  {slide.subtitle}
                </p>
                
                {/* Dual Medium Button Layout (Now positioned inside the bottom frame line) */}
                <div className="d-flex gap-3 justify-content-center w-100 px-3">
                  {/* Primary Button */}
                  <Button 
                    variant="outline-danger" 
                    className="btn-custom-primary fw-bold px-4 py-2 rounded-0 text-uppercase border-2"
                    style={{ 
                      color: '#dc3545', 
                      letterSpacing: '1px',
                      backgroundColor: 'rgba(0,0,0,0.6)',
                      minWidth: '160px'
                    }}
                  >
                    {slide.ctaPrimary}
                  </Button>

                  {/* Secondary Button */}
                  <Button 
                    variant="outline-light" 
                    className="btn-custom-secondary fw-bold px-4 py-2 rounded-0 text-uppercase border-2"
                    style={{ 
                      letterSpacing: '1px',
                      backgroundColor: 'rgba(0,0,0,0.4)',
                      minWidth: '160px'
                    }}
                  >
                    {slide.ctaSecondary}
                  </Button>
                </div>

              </div> {/* End of content-master-frame */}

            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  );
};

export default CarCarousel;