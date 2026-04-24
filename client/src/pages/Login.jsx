// ✅ LOGIN PAGE - Glassmorphism form with labels inside transparent inputs

import React, { useState } from 'react';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

const Login = () => {
  const [loginInput, setLoginInput] = useState('');
  const [password, setPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [generalError, setGeneralError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError('');
    setFieldErrors({});
    setLoading(true);

    const result = await login(loginInput, password);
    
    if (result.success) {
      sessionStorage.setItem('loginSuccess', 'Signed in successfully!');
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
    <div className="login-container">
      <Card className="shadow-lg border-0">
        <Card.Body className="p-5">
          <h2 className="text-center mb-4">Welcome Back</h2>
          
          {generalError && (
            <Alert variant="danger" className="mb-4">
              <i className="fas fa-exclamation-circle me-2"></i>
              {generalError}
            </Alert>
          )}
          
          <Form onSubmit={handleSubmit}>
            {/* ✅ Email/Username/Phone - Label in Placeholder */}
            <Form.Group className="mb-3">
              <Form.Label>Email, Username, or Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Email, Username, or Phone: ......"
                value={loginInput}
                onChange={(e) => {
                  setLoginInput(e.target.value);
                  if (fieldErrors.identifier) setFieldErrors({...fieldErrors, identifier: ''});
                }}
                isInvalid={!!fieldErrors.identifier}
                required
                className="glass-input"
              />
              <Form.Control.Feedback type="invalid">
                {fieldErrors.identifier}
              </Form.Control.Feedback>
            </Form.Group>

            {/* ✅ Password - Label in Placeholder */}
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password: ......"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (fieldErrors.password) setFieldErrors({...fieldErrors, password: ''});
                }}
                isInvalid={!!fieldErrors.password}
                required
                className="glass-input"
              />
              <Form.Control.Feedback type="invalid">
                {fieldErrors.password}
              </Form.Control.Feedback>
            </Form.Group>

            {/* ✅ Submit Button */}
            <Button 
              variant="dark" 
              type="submit" 
              className="w-100 mb-3 glass-btn"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </Button>

            {/* ✅ Navigation Links */}
            <div className="text-center">
              <p className="mb-0">
                Don't have an account? <Link to="/signup">Sign Up</Link>
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

export default Login;