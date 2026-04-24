import React, { useState } from 'react';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: ''
  });
  
  const [fieldErrors, setFieldErrors] = useState({});
  const [generalError, setGeneralError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    if (fieldErrors[name]) {
      setFieldErrors({ ...fieldErrors, [name]: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError('');
    setFieldErrors({});
    setLoading(true);

    const result = await signup(formData);
    
    if (result.success) {
      sessionStorage.setItem('signupSuccess', 'Account created successfully!');
      navigate('/home');
    } else {
      setGeneralError(result.message);
      
      const errorsMap = {};
      if (result.errors && Array.isArray(result.errors)) {
        result.errors.forEach(err => {
          const fieldName = err.path || err.param;
          errorsMap[fieldName] = err.msg;
        });
      }
      setFieldErrors(errorsMap);
    }
    
    setLoading(false);
  };

  return (
    <div className="signup-container">
      <Card className="shadow-lg border-0">
        <Card.Body className="p-5">
          <h2 className="text-center mb-4">Create Account</h2>
          
          {generalError && (
            <Alert variant="danger" className="mb-4">
              <i className="fas fa-exclamation-circle me-2"></i>
              {generalError}
            </Alert>
          )}
          
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                placeholder="Choose a username"
                value={formData.username}
                onChange={handleChange}
                isInvalid={!!fieldErrors.username}
                required
              />
              <Form.Control.Feedback type="invalid">
                {fieldErrors.username}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                isInvalid={!!fieldErrors.email}
                required
              />
              <Form.Control.Feedback type="invalid">
                {fieldErrors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="tel"
                name="phone"
                placeholder="+1234567890"
                value={formData.phone}
                onChange={handleChange}
                isInvalid={!!fieldErrors.phone}
                pattern="^\+?[0-9]{10,15}$"
                required
              />
              <Form.Control.Feedback type="invalid">
                {fieldErrors.phone || 'Please enter a valid phone number (numbers only)'}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Create a strong password"
                value={formData.password}
                onChange={handleChange}
                isInvalid={!!fieldErrors.password}
                required
              />
              <Form.Control.Feedback type="invalid">
                {fieldErrors.password}
              </Form.Control.Feedback>
              {/* ✅ REMOVED: Password requirements checklist */}
            </Form.Group>

            <Button 
              variant="dark" 
              type="submit" 
              className="w-100 mb-3"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Creating account...
                </>
              ) : (
                'Sign Up'
              )}
            </Button>

            <div className="text-center">
              <p className="mb-0">
                Already have an account? <Link to="/login">Login</Link>
              </p>
              <p className="mt-2 mb-0">
                <Link to="/">← Back to Home</Link>
              </p>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Signup;