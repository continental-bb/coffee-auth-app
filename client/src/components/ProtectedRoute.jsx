// Import Navigate component for programmatic redirection
import { Navigate } from 'react-router-dom';

// Import useAuth hook to check authentication status
import { useAuth } from '../context/AuthContext';

// ProtectedRoute component wraps pages that require login
const ProtectedRoute = ({ children }) => {
  // Get token from auth context
  const { token } = useAuth();

  // If no token exists, user is not logged in
  if (!token) {
    // Redirect to login page
    return <Navigate to="/login" replace />;
  }

  // If token exists, render the protected page (children)
  return children;
};

// Export component for use in App.jsx
export default ProtectedRoute;