// ✅ APP COMPONENT: Defines all routes and app structure
// ❌ NO <Router> here - it's already in main.jsx

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'; // ✅ Only Routes/Route, NO Router
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import HomeAfterLogin from './pages/HomeAfterLogin';
import './App.css';

// ✅ PROTECTED ROUTE: Redirects unauthenticated users to login
const ProtectedRoute = ({ children }) => {
  // Check for auth token in localStorage
  const token = localStorage.getItem('token');
  
  // If no token, redirect to login page
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  // If token exists, render the protected component
  return children;
};

function App() {
  return (
    <AuthProvider>
      {/* ✅ NO <Router> here - already wrapped in main.jsx */}
      
      {/* ✅ Navbar: Always visible, handles auth state */}
      <Navbar />
      
      {/* ✅ Routes: Define all app pages */}
      <Routes>
        {/* ✅ PUBLIC ROUTES: No auth required */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* ✅ PROTECTED ROUTE: Requires authentication */}
        <Route 
          path="/home" 
          element={
            <ProtectedRoute>
              <HomeAfterLogin />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;