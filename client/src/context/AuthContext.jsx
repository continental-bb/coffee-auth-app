// Import React hooks for state management and context
import { createContext, useState, useContext, useEffect } from 'react';

// Import axios for making HTTP requests to backend
import axios from 'axios';

// Create a context to share auth state globally across components
const AuthContext = createContext();

// AuthProvider component wraps the app and provides auth state
export const AuthProvider = ({ children }) => {
  // State to store current user information
  const [user, setUser] = useState(null);
  
  // State to store JWT token (get from localStorage on load)
  const [token, setToken] = useState(localStorage.getItem('token'));

  // Effect runs when token changes (e.g., on page load or login)
  useEffect(() => {
    if (token) {
      // Set Authorization header for all axios requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // Set user state (in real app, fetch user profile here)
      setUser({ token });
    }
  }, [token]); // Re-run when token changes

  // Login function: sends credentials to backend
  const login = async (loginInput, password) => {
    // POST request to backend signin endpoint
    const res = await axios.post('http://localhost:5000/api/auth/signin', { loginInput, password });
    // Save token to browser localStorage (persists across refreshes)
    localStorage.setItem('token', res.data.token);
    // Update token state
    setToken(res.data.token);
    // Update user state
    setUser(res.data.user);
  };

  // Signup function: sends registration data to backend
  const signup = async (userData) => {
    // POST request to backend signup endpoint
    const res = await axios.post('http://localhost:5000/api/auth/signup', userData);
    // Save token to localStorage
    localStorage.setItem('token', res.data.token);
    // Update token state
    setToken(res.data.token);
    // Update user state
    setUser(res.data.user);
  };

  // Logout function: clears auth state
  const logout = () => {
    // Remove token from localStorage
    localStorage.removeItem('token');
    // Clear token state
    setToken(null);
    // Clear user state
    setUser(null);
  };

  // Provide auth state and functions to all child components
  return (
    <AuthContext.Provider value={{ user, token, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to easily access auth context in any component
export const useAuth = () => useContext(AuthContext);