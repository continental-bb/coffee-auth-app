// ✅ AUTH CONTEXT - Manages user authentication state
// Provides login, signup, logout functions to entire app

import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ LOGIN FUNCTION
  const login = async (identifier, password) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ identifier, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
        return { success: true, user: data.user };
      } else {
        return { success: false, message: data.message || 'Login failed', errors: data.errors };
      }
    } catch (error) {
      return { success: false, message: 'Network error. Please try again.', errors: [] };
    }
  };

  // ✅ SIGNUP FUNCTION
  const signup = async (userData) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
        return { success: true, user: data.user };
      } else {
        return { success: false, message: data.message || 'Signup failed', errors: data.errors };
      }
    } catch (error) {
      return { success: false, message: 'Network error. Please try again.', errors: [] };
    }
  };

  // ✅ LOGOUT FUNCTION
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  // ✅ CHECK IF USER IS LOGGED IN ON LOAD
  React.useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};