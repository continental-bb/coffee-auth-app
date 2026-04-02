// Import Routes and Route from React Router for navigation
import { Routes, Route } from 'react-router-dom';

// Import AuthProvider to make auth state available globally
import { AuthProvider } from './context/AuthContext';

// Import ProtectedRoute component for securing routes
import ProtectedRoute from './components/ProtectedRoute';

// Import page components
import Login from './pages/Login';
import Signup from './pages/Signup';
import Menu from './pages/Menu';

// Main App component function
function App() {
  return (
    // Wrap entire app in AuthProvider for global auth state
    <AuthProvider>
      {/* Define all routes for the application */}
      <Routes>
        {/* Public route: Login page */}
        <Route path="/login" element={<Login />} />
        
        {/* Public route: Signup page */}
        <Route path="/signup" element={<Signup />} />
        
        {/* Protected route: Menu page (requires login) */}
        <Route 
          path="/menu" 
          element={
            // ProtectedRoute checks if user is logged in before showing Menu
            <ProtectedRoute> 
              <Menu /> 
            </ProtectedRoute>
          } 
        />
        
        {/* Default route: Redirect to login */}
        <Route path="/" element={<Login />} />
      </Routes>
    </AuthProvider>
  );
}

// Export App component for use in main.jsx
export default App;