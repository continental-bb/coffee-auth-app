// ✅ HOME AFTER LOGIN: Landing content + 6 expandable coffee farm locations
// Users see this page after successful login

import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './HomeAfterLogin.css';

// ✅ SAMPLE COFFEE FARM DATA (6 locations)
const coffeeLocations = [
  {
    id: 1,
    name: 'Yirgacheffe Valley',
    region: 'Southern Nations',
    altitude: '1,700-2,200m',
    shortDesc: 'Bright, floral coffee with citrus notes',
    fullDesc: 'Yirgacheffe is renowned worldwide for producing some of the most distinctive and sought-after coffees. The high altitude and unique microclimate create beans with bright acidity, floral aromatics, and complex flavor profiles featuring notes of bergamot, jasmine, and lemon.',
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800',
    harvestSeason: 'October - January',
    varieties: 'Heirloom Ethiopian'
  },
  {
    id: 2,
    name: 'Sidamo Highlands',
    region: 'Southern Ethiopia',
    altitude: '1,500-2,200m',
    shortDesc: 'Full-bodied with wine-like acidity',
    fullDesc: 'The Sidamo region produces rich, full-bodied coffees with a distinctive wine-like acidity and complex flavor notes. Traditional farming methods have been preserved here, with many farmers using organic practices passed down through generations.',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800',
    harvestSeason: 'September - December',
    varieties: 'Heirloom, Regional varieties'
  },
  {
    id: 3,
    name: 'Harrar Ancient Lands',
    region: 'Eastern Ethiopia',
    altitude: '1,400-2,000m',
    shortDesc: 'Dry-processed with blueberry notes',
    fullDesc: 'Harrar is one of the oldest coffee-growing regions in the world. The dry-processing method creates unique flavor profiles with pronounced blueberry, chocolate, and spice notes. This ancient coffee land maintains traditional cultivation methods.',
    image: 'https://images.unsplash.com/photo-1524350876685-274059332603?w=800',
    harvestSeason: 'November - February',
    varieties: 'Longberry, Shortberry'
  },
  {
    id: 4,
    name: 'Limu Coffee Forests',
    region: 'Southwestern Ethiopia',
    altitude: '1,400-1,800m',
    shortDesc: 'Balanced with spicy undertones',
    fullDesc: 'The Limu region is known for its forest coffee, where coffee grows wild under the canopy of native trees. This creates a balanced cup with medium body, bright acidity, and subtle spicy undertones with hints of citrus.',
    image: 'https://images.unsplash.com/photo-1611854779393-1b2ae9e9a69e?w=800',
    harvestSeason: 'October - January',
    varieties: 'Forest coffee varieties'
  },
  {
    id: 5,
    name: 'Jimma Coffee Belt',
    region: 'Oromia Region',
    altitude: '1,300-1,900m',
    shortDesc: 'Smooth with chocolate notes',
    fullDesc: 'Jimma is one of Ethiopia\'s largest coffee-producing regions. The coffee here is known for its smooth, mellow character with chocolate and nutty notes. The region\'s fertile volcanic soil contributes to the coffee\'s distinctive flavor.',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800',
    harvestSeason: 'September - December',
    varieties: 'Djimmah, Regional types'
  },
  {
    id: 6,
    name: 'Bench Maji Forest',
    region: 'Southern Nations',
    altitude: '1,200-1,900m',
    shortDesc: 'Wild coffee with fruity complexity',
    fullDesc: 'The Bench Maji zone is home to some of the last remaining wild coffee forests. This biodiversity hotspot produces coffees with incredible complexity, featuring fruity notes, floral aromatics, and a clean, bright finish.',
    image: 'https://images.unsplash.com/photo-1511537632536-b7a426834bb5?w=800',
    harvestSeason: 'October - February',
    varieties: 'Wild forest varieties'
  }
];

const HomeAfterLogin = () => {
  // ✅ STATE: Manage expanded location modal
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // ✅ FUNCTION: Open location detail modal
  const handleViewDetails = (location) => {
    setSelectedLocation(location);
    setShowModal(true);
  };

  // ✅ FUNCTION: Close modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedLocation(null);
  };

  // ✅ FUNCTION: Handle logout
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="home-after-login">
      {/* ✅ HERO SECTION */}
      <section className="hero-welcome">
        <Container className="text-center">
          <h1>Welcome Back, {user?.username}!</h1>
          <p className="lead">Explore Ethiopia's Premium Coffee Harvesting Locations</p>
          <Button onClick={handleLogout} variant="outline-light" className="mt-3">
            <i className="fas fa-sign-out-alt me-2"></i>Logout
          </Button>
        </Container>
      </section>

      {/* ✅ LANDING CONTENT PREVIEW */}
      <section className="content-preview">
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <h2>Discover Ethiopian Coffee Culture</h2>
              <p>Journey to the birthplace of coffee and experience authentic traditions, breathtaking landscapes, and unforgettable hospitality.</p>
            </Col>
            <Col md={6}>
              <div className="preview-image">
                <i className="fas fa-coffee fa-5x text-brown"></i>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ✅ COFFEE LOCATIONS GRID */}
      <section className="locations-section">
        <Container>
          <h2 className="section-title text-center mb-5">Premium Coffee Farm Locations</h2>
          <p className="section-subtitle text-center mb-5">
            Click on any location to view detailed information
          </p>
          
          <Row>
            {coffeeLocations.map((location) => (
              <Col key={location.id} md={6} lg={4} className="mb-4">
                <Card 
                  className="location-card"
                  onClick={() => handleViewDetails(location)}
                >
                  <Card.Body className="text-center">
                    <div className="location-icon">
                      <i className="fas fa-map-marker-alt fa-3x"></i>
                    </div>
                    <Card.Title className="location-title">{location.name}</Card.Title>
                    <Card.Text className="location-region">
                      <i className="fas fa-map-pin me-2"></i>{location.region}
                    </Card.Text>
                    <Card.Text className="location-desc">{location.shortDesc}</Card.Text>
                    <Button variant="primary" size="sm">
                      View Details
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* ✅ LOCATION DETAIL MODAL */}
      <Modal 
        show={showModal} 
        onHide={handleCloseModal}
        size="lg"
        centered
      >
        {selectedLocation && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>{selectedLocation.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <img 
                src={selectedLocation.image} 
                alt={selectedLocation.name}
                className="modal-image w-100 mb-3"
              />
              <p><strong>Region:</strong> {selectedLocation.region}</p>
              <p><strong>Altitude:</strong> {selectedLocation.altitude}</p>
              <p><strong>Harvest Season:</strong> {selectedLocation.harvestSeason}</p>
              <p><strong>Varieties:</strong> {selectedLocation.varieties}</p>
              <p className="mt-3">{selectedLocation.fullDesc}</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Close
              </Button>
              <Button variant="primary" disabled title="Booking coming soon">
                <i className="fas fa-calendar-check me-2"></i>Book to Visit
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>

      {/* ✅ FOOTER */}
      <footer className="home-footer">
        <Container className="text-center">
          <p>&copy; 2025 Ethiopian Coffee & Tourism. All rights reserved.</p>
        </Container>
      </footer>
    </div>
  );
};

export default HomeAfterLogin;