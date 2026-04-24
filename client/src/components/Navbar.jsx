// ✅ NAVBAR COMPONENT: Main navigation for the entire app
// Handles responsive horizontal nav, auth state, and routing

import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const CustomNavbar = () => {
  // ✅ AUTH CONTEXT: Access user login state and logout function
  const { user, logout } = useAuth();
  
  // ✅ LOCATION HOOK: Track current page for active link styling
  const location = useLocation();

  return (
    <Navbar bg="dark" variant="dark" fixed="top" className="custom-navbar">
      <Container fluid>
        {/* ✅ BRAND LOGO: Links to homepage */}
        <Navbar.Brand as={Link} to="/" className="navbar-brand">
          ETHIOPIAN COFFEE TOURISM
        </Navbar.Brand>

        {/* ✅ NAVIGATION LINKS: Horizontal, always visible */}
        <Nav className="ms-auto nav-bars">
          
          {/* ✅ HOME LINK: Always visible */}
          <Nav.Link as={Link} to="/" className={`nav-bar ${location.pathname === '/' ? 'active' : ''}`}>
            Home
          </Nav.Link>
          
          {/* ✅ EXPERIENCE LINK: Scrolls to #experience on landing page */}
          <Nav.Link 
            as="a" 
            href="#experience" 
            className="nav-bar"
            onClick={(e) => {
              // If not on landing page, redirect first
              if (location.pathname !== '/') {
                e.preventDefault();
                window.location.href = '/#experience';
              }
            }}
          >
            Experience
          </Nav.Link>
          
          {/* ✅ ORIGIN LINK: Scrolls to #origin on landing page */}
          <Nav.Link 
            as="a" 
            href="#origin" 
            className="nav-bar"
            onClick={(e) => {
              if (location.pathname !== '/') {
                e.preventDefault();
                window.location.href = '/#origin';
              }
            }}
          >
            Origin
          </Nav.Link>

          {/* ✅ VISUAL DIVIDER: Separates nav links from auth buttons */}
          <div className="nav-divider"></div>

          {/* ✅ AUTH SECTION: Changes based on login state */}
          {user ? (
            // ✅ LOGGED IN: Show Home + Logout
            <>
              <Nav.Link as={Link} to="/home" className={`nav-bar ${location.pathname === '/home' ? 'active' : ''}`}>
                <i className="fas fa-house me-1"></i>Home
              </Nav.Link>
              <Button variant="outline-light" onClick={logout} className="auth-btn">
                <i className="fas fa-sign-out-alt me-1"></i>Logout
              </Button>
            </>
          ) : (
            // ✅ LOGGED OUT: Show Login + Signup
            <>
              <Nav.Link as={Link} to="/login" className={`nav-bar ${location.pathname === '/login' ? 'active' : ''}`}>
                Login
              </Nav.Link>
              <Nav.Link as={Link} to="/signup" className={`nav-bar ${location.pathname === '/signup' ? 'active' : ''}`}>
                Signup
              </Nav.Link>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;