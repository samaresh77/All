import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, Link } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import { authAPI } from './services/api';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await authAPI.getMe();
        if (response.data.success) {
          setIsAuthenticated(true);
          setUser(response.data.data);
        } else {
          clearAuth();
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      clearAuth();
    } finally {
      setLoading(false);
    }
  };

  const clearAuth = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
  };

  const handleLogin = (userData, token) => {
    setIsAuthenticated(true);
    setUser(userData);
    navigate('/dashboard');
  };

  const handleLogout = async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      clearAuth();
      navigate('/login');
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading application...</p>
      </div>
    );
  }

  return (
    <div className="App">
      <nav className="navbar">
        <div className="container">
          <div className="navbar-brand">
            <Link to="/" className="logo">
              <i className="fas fa-shield-alt"></i>
              <span>MERN Auth</span>
            </Link>
          </div>
          
          <div className="navbar-menu">
            {isAuthenticated ? (
              <div className="navbar-items">
                <span className="welcome-user">
                  <i className="fas fa-user-circle"></i>
                  Welcome, {user?.name}
                </span>
                <button onClick={handleLogout} className="logout-btn">
                  <i className="fas fa-sign-out-alt"></i>
                  Logout
                </button>
              </div>
            ) : (
              <div className="navbar-items">
                <Link to="/login" className="nav-link">
                  <i className="fas fa-sign-in-alt"></i>
                  Login
                </Link>
                <Link to="/signup" className="nav-link primary">
                  <i className="fas fa-user-plus"></i>
                  Sign Up
                </Link>
              </div>
            )}
          </div>
          
          <button className="mobile-menu-btn">
            <i className="fas fa-bars"></i>
          </button>
        </div>
      </nav>

      <main>
        <Routes>
          <Route 
            path="/" 
            element={
              <div className="hero">
                <div className="container">
                  <h1>Secure Authentication System</h1>
                  <p>Built with MERN Stack & MongoDB Atlas</p>
                  <div className="hero-buttons">
                    {isAuthenticated ? (
                      <Link to="/dashboard" className="btn primary">
                        Go to Dashboard
                      </Link>
                    ) : (
                      <>
                        <Link to="/login" className="btn primary">
                          Get Started
                        </Link>
                        <Link to="/signup" className="btn secondary">
                          Sign Up Free
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </div>
            } 
          />
          
          <Route 
            path="/login" 
            element={
              !isAuthenticated ? (
                <Login onLogin={handleLogin} />
              ) : (
                <Navigate to="/dashboard" />
              )
            } 
          />
          
          <Route 
            path="/signup" 
            element={
              !isAuthenticated ? (
                <Signup onSignup={handleLogin} />
              ) : (
                <Navigate to="/dashboard" />
              )
            } 
          />
          
          <Route 
            path="/dashboard" 
            element={
              isAuthenticated ? (
                <Dashboard user={user} onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" />
              )
            } 
          />
          
          <Route 
            path="/profile" 
            element={
              isAuthenticated ? (
                <div className="profile-page">
                  <h2>Profile</h2>
                  {/* Add profile component here */}
                </div>
              ) : (
                <Navigate to="/login" />
              )
            } 
          />
          
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>MERN Auth</h3>
              <p>A secure authentication system built with modern technologies.</p>
            </div>
            <div className="footer-section">
              <h4>Technologies</h4>
              <ul>
                <li>MongoDB Atlas</li>
                <li>Express.js</li>
                <li>React.js</li>
                <li>Node.js</li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Features</h4>
              <ul>
                <li>JWT Authentication</li>
                <li>Password Encryption</li>
                <li>Role-based Access</li>
                <li>Secure API</li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} MERN Auth System. All rights reserved.</p>
            <div className="footer-links">
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms of Service</Link>
              <Link to="/contact">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;