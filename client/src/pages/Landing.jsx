// ✅ LANDING PAGE - Ethiopian Coffee & Tourism
// All images imported from: client/src/assets/images/
// Hero: hero.jpg | Content: backcoffee.jpg | Glassmorphism text boxes

import React, { useEffect, useState, useRef } from 'react';
import { Container, Row, Col, Alert, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Landing.css';

// ✅ ALL IMAGE IMPORTS - From src/assets/images/
import heroImage from '../assets/images/hero.jpg';
import coffeeImage from '../assets/images/coffee.jpg';
import ethiopiaImage from '../assets/images/ethiopia.jpg';

// ✅ COFFEE FARM IMAGES - Also from src/assets/images/
import yirgaImage from '../assets/images/yirgacoffee.jpg';
import sidamoImage from '../assets/images/sidamocoffee.jpg';
import hararImage from '../assets/images/hararcoffee.jpg';

// ✅ COFFEE FARMS DATA - Using imported image variables
const coffeeFarms = [
  {
    id: 1,
    name: 'Yirgacheffe Coffee Farms',
    location: 'Southern Ethiopia',
    description: 'Famous for bright, floral notes with citrus undertones. High altitude farms producing some of the world\'s finest coffee.',
    altitude: '1,700-2,200m',
    image: yirgaImage  // ✅ Uses imported variable
  },
  {
    id: 2,
    name: 'Sidamo Coffee Region',
    location: 'Southern Nations',
    description: 'Rich, full-bodied coffee with wine-like acidity. Traditional farming methods passed down through generations.',
    altitude: '1,500-2,200m',
    image: sidamoImage  // ✅ Uses imported variable
  },
  {
    id: 3,
    name: 'Harrar Coffee Highlands',
    location: 'Eastern Ethiopia',
    description: 'Ancient coffee lands producing dry-processed coffee with blueberry and chocolate notes. Unique wild coffee varieties.',
    altitude: '1,400-2,000m',
    image: hararImage  // ✅ Uses imported variable
  }
];

const Landing = () => {
  const [successMessage, setSuccessMessage] = useState('');
  const experienceRef = useRef(null);

  useEffect(() => {
    const loginSuccess = sessionStorage.getItem('loginSuccess');
    const signupSuccess = sessionStorage.getItem('signupSuccess');
    
    if (loginSuccess) {
      setSuccessMessage(loginSuccess);
      sessionStorage.removeItem('loginSuccess');
    } else if (signupSuccess) {
      setSuccessMessage(signupSuccess);
      sessionStorage.removeItem('signupSuccess');
    }

    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  // ✅ HANDLE "BEGIN YOUR JOURNEY" CLICK WITH ZOOM TRANSITION
  const handleBeginJourney = (e) => {
    e.preventDefault();
    
    // Create ripple effect at click position
    const ripple = document.createElement('div');
    ripple.className = 'zoom-ripple';
    ripple.style.left = `${e.clientX}px`;
    ripple.style.top = `${e.clientY}px`;
    document.body.appendChild(ripple);
    
    // Remove ripple after animation
    setTimeout(() => ripple.remove(), 1500);
    
    // Get target section and apply zoom
    const targetSection = document.getElementById('experience');
    
    if (targetSection) {
      targetSection.classList.add('zoom-transition');
      targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      
      // Remove animation class after completion
      setTimeout(() => {
        targetSection.classList.remove('zoom-transition');
      }, 1200);
    }
  };

  return (
    <div className="landing-page">
      
      {/* ✅ SUCCESS ALERT - Shows after login/signup */}
      {successMessage && (
        <Container className="mt-4">
          <Alert variant="success" className="text-center" onClose={() => setSuccessMessage('')} dismissible>
            <i className="fas fa-check-circle me-2"></i>
            {successMessage}
          </Alert>
        </Container>
      )}

      {/* ✅ HERO SECTION - Uses hero.jpg */}
      <section id="home" className="hero-section">
        <div className="hero-bg" style={{ backgroundImage: `url(${heroImage})` }}></div>
        <div className="hero-overlay"></div>
        <Container className="hero-content">
          <h1 className="animate-fade-in">Discover Ethiopian Coffee Culture</h1>
          <p className="lead animate-fade-in-delay">Journey to the birthplace of coffee and experience authentic traditions, breathtaking landscapes, and unforgettable hospitality.</p>
          <a 
            href="#experience" 
            className="btn btn-light btn-lg animate-fade-in-delay-2"
            onClick={handleBeginJourney}
          >
            <i className="fas fa-coffee me-2"></i>Begin Your Journey
          </a>
        </Container>
      </section>

      {/* ✅ EXPERIENCE SECTION - backcoffee.jpg background */}
      <section id="experience" className="content-section" ref={experienceRef}>
        <Container fluid className="px-0">
          <Row className="align-items-center mx-0">
            <Col lg={6} className="image-col px-2">
              <div className="image-frame">
                <img src={coffeeImage} className="section-image" alt="Ethiopian Coffee Ceremony" />
              </div>
            </Col>
            <Col lg={6} className="text-col px-2">
              <div className="text-content">
                <h2>The Birthplace of Coffee</h2>
                <p className="lead-text">Coffee in Ethiopia is more than a drink — it is an experience of connection.</p>
                <p>Through the traditional ceremony, every step, from roasting to pouring, is shared with care and intention. The aroma of fresh-roasted beans fills the air as stories are exchanged and bonds are formed.</p>
                <p>Visitors are welcomed not just as guests, but as part of the moment, where stories are told and time slows down over a simple cup of coffee. This is the heart of Ethiopian hospitality.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ✅ ORIGIN SECTION - backcoffee.jpg background */}
      <section id="origin" className="content-section">
        <Container fluid className="px-0">
          <Row className="align-items-center mx-0">
            <Col lg={6} className="text-col px-2">
              <div className="text-content">
                <h2>From Bean to Journey</h2>
                <p className="lead-text">Every cup of coffee begins its journey in Ethiopia's highlands, where nature and tradition grow side by side.</p>
                <p>Here, coffee is cultivated with care, shaped by the land, and passed through generations. The misty mountains, rich soil, and perfect climate create beans with unparalleled flavor and character.</p>
                <p>Travelers can explore these origins, walking through the fields and discovering the story behind every bean — a journey that connects the earth to the cup. Experience where it all began.</p>
              </div>
            </Col>
            <Col lg={6} className="image-col px-2">
              <div className="image-frame">
                <img src={ethiopiaImage} className="section-image" alt="Ethiopian Highlands" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ✅ COFFEE FARMS SECTION - backcoffee.jpg background */}
      <section id="coffee-farms" className="coffee-farms-section">
        <Container>
          <h2 className="section-title text-center mb-5">Premium Coffee Harvesting Regions</h2>
          <p className="section-subtitle text-center mb-5">
            Explore Ethiopia's most renowned coffee-growing areas
          </p>
          
          <Row>
            {coffeeFarms.map((farm) => (
              <Col key={farm.id} md={4} className="mb-4">
                <Card className="farm-card h-100">
                  <Card.Img 
                    variant="top" 
                    src={farm.image} 
                    alt={farm.name}
                    className="farm-image"
                    onError={(e) => {
                      // ✅ Fallback if image not found
                      e.target.src = 'https://via.placeholder.com/400x200?text=Coffee+Farm';
                    }}
                  />
                  <Card.Body>
                    <Card.Title className="farm-title">{farm.name}</Card.Title>
                    <Card.Text className="farm-location">
                      <i className="fas fa-map-marker-alt me-2"></i>
                      {farm.location}
                    </Card.Text>
                    <Card.Text className="farm-altitude">
                      <i className="fas fa-mountain me-2"></i>
                      Altitude: {farm.altitude}
                    </Card.Text>
                    <Card.Text>{farm.description}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          {/* ✅ UPDATED CTA - Centered + Bold Links */}
          <div className="cta-section text-center mt-5 pt-5">
            <div className="cta-content mx-auto" style={{ maxWidth: '600px' }}>
              <h3 className="cta-title mb-3">
                <i className="fas fa-map-marked-alt me-2"></i>
                Want to Discover More Coffee Farm Locations?
              </h3>
              <p className="cta-text mb-4">

                  Sign in or create an account
                
                to explore all coffee harvesting regions across Ethiopia
              </p>
              <div className="cta-buttons d-flex gap-3 justify-content-center flex-wrap">
                <Link to="/login" className="btn btn-primary btn-lg cta-btn">
                  <i className="fas fa-sign-in-alt me-2"></i>Login to Explore
                </Link>
                <Link to="/signup" className="btn btn-outline-light btn-lg cta-btn">
                  <i className="fas fa-user-plus me-2"></i>Create Account
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ✅ FOOTER */}
      <footer className="footer-section">
        <Container>
          <p>&copy; 2025 Ethiopian Coffee & Tourism. All rights reserved.</p>
          <p className="mt-2" style={{ fontSize: '0.85rem', opacity: 0.8 }}>
            <i className="fas fa-map-marker-alt me-2"></i>
            Sharing Ethiopia's Coffee Heritage with the World
          </p>
        </Container>
      </footer>
    </div>
  );
};

export default Landing;