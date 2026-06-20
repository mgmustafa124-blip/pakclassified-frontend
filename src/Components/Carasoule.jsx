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
      <style>{`
        /* Indicator Overrides */
        .carousel-indicators [data-bs-target] {
          background-color: #dc3545 !important;
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }

        /* Responsive Master Frame Container */
        .content-master-frame {
          position: relative;
          padding: 25px 35px; /* Mobile-friendly initial padding */
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          max-width: 600px;
          width: 100%;
          margin: 0 auto;
        }

        /* Desktop specific padding adjustment */
        @media (min-width: 768px) {
          .content-master-frame {
            padding: 30px 60px;
          }
        }
        
        /* Top-Left Corner Angle */
        .content-master-frame::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 35px; /* Mobile par chota size */
          height: 35px;
          border-top: 4px solid #dc3545;
          border-left: 4px solid #dc3545;
        }

        /* Bottom-Right Corner Angle */
        .content-master-frame::after {
          content: '';
          position: absolute;
          bottom: 0;
          right: 0;
          width: 35px; /* Mobile par chota size */
          height: 35px;
          border-bottom: 4px solid #dc3545;
          border-right: 4px solid #dc3545;
        }

        /* Desktop sizes for geometric frames */
        @media (min-width: 768px) {
          .content-master-frame::before,
          .content-master-frame::after {
            width: 60px;
            height: 60px;
            border-width: 5px;
          }
        }

        /* Custom Hover States */
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

        /* Responsive Typography */
        .responsive-heading {
          font-size: calc(1.5rem + 2vw); /* Screen size ke mutabiq adjust hoga */
        }
        @media (min-width: 1200px) {
          .responsive-heading {
            font-size: 3.5rem; /* display-4 default desktop size */
          }
        }
      `}</style>

      <Carousel fade interval={5000} indicators={true} controls={false} className="bg-black">
        {slides.map((slide) => (
          <Carousel.Item key={slide.id} style={{ height: '66vh', minHeight: '460px' }}>
            
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
              style={{ zIndex: 2, bottom: '12%', left: '5%', right: '5%' }}
            >
              
              <div className="content-master-frame">
                
                {/* Responsive Heading */}
                <h1 className="fw-black text-uppercase responsive-heading mb-2 mb-md-3 tracking-wider text-white">
                  <span style={{ color: '#dc3545' }}>{slide.accentTitle} </span>
                  {slide.mainTitle}
                </h1>
                
                {/* Responsive Subtitle */}
                <p className="fs-6 fs-md-5 mb-3 mb-md-4 text-light opacity-90 text-center fw-light" style={{ maxWidth: '100%' }}>
                  {slide.subtitle}
                </p>
                
                {/* Responsive Button Layout: Mobile par vertical, sm screen se horizontal stack */}
                <div className="d-flex flex-column flex-sm-row gap-2 gap-sm-3 justify-content-center w-100 px-1">
                  <Button 
                    variant="outline-danger" 
                    className="btn-custom-primary fw-bold px-4 py-2 rounded-0 text-uppercase border-2"
                    style={{ 
                      color: '#dc3545', 
                      letterSpacing: '1px',
                      backgroundColor: 'rgba(0,0,0,0.6)',
                      minWidth: '140px'
                    }}
                  >
                    {slide.ctaPrimary}
                  </Button>

                  <Button 
                    variant="outline-light" 
                    className="btn-custom-secondary fw-bold px-4 py-2 rounded-0 text-uppercase border-2"
                    style={{ 
                      letterSpacing: '1px',
                      backgroundColor: 'rgba(0,0,0,0.4)',
                      minWidth: '140px'
                    }}
                  >
                    {slide.ctaSecondary}
                  </Button>
                </div>

              </div>

            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  );
};

export default CarCarousel;