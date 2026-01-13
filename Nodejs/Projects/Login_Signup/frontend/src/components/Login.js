import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../services/api';
import './Auth.css';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const { email, password } = formData;

  useEffect(() => {
    // Check for saved credentials
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
      setFormData(prev => ({ ...prev, email: savedEmail }));
      setRememberMe(true);
    }
  }, []);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Basic validation
    if (!email || !password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    try {
      const response = await authAPI.login({ email, password });
      
      if (response.data.success) {
        // Save to localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        // Remember email if checked
        if (rememberMe) {
          localStorage.setItem('rememberedEmail', email);
        } else {
          localStorage.removeItem('rememberedEmail');
        }
        
        // Call parent handler
        onLogin(response.data.user, response.data.token);
        
        // Redirect to dashboard
        navigate('/dashboard');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 
                          err.message || 
                          'Login failed. Please try again.';
      setError(errorMessage);
      
      // Clear password field on error
      setFormData(prev => ({ ...prev, password: '' }));
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setFormData({
      email: 'demo@example.com',
      password: 'demo123'
    });
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Welcome Back</h2>
          <p className="auth-subtitle">Sign in to your account</p>
        </div>
        
        {error && (
          <div className="alert alert-error">
            <i className="fas fa-exclamation-circle"></i>
            {error}
          </div>
        )}
        
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-with-icon">
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={onChange}
                required
                placeholder="Enter your email"
                disabled={loading}
                className={error.includes('email') ? 'input-error' : ''}
              />
            </div>
          </div>

          <div className="form-group">
            <div className="password-label">
              <label htmlFor="password">Password</label>
              <Link to="/forgot-password" className="forgot-password">
                Forgot password?
              </Link>
            </div>
            <div className="input-with-icon">
              <i className="fas fa-lock"></i>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={password}
                onChange={onChange}
                required
                placeholder="Enter your password"
                disabled={loading}
                className={error.includes('password') ? 'input-error' : ''}
              />
              <button
                type="button"
                className="show-password-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                <i className={`fas fa-${showPassword ? 'eye-slash' : 'eye'}`}></i>
              </button>
            </div>
          </div>

          <div className="form-options">
            <div className="checkbox-group">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                disabled={loading}
              />
              <label htmlFor="rememberMe">Remember me</label>
            </div>
          </div>

          <button 
            type="submit" 
            className="auth-btn primary-btn"
            disabled={loading}
          >
            {loading ? (
              <>
                <i className="fas fa-spinner fa-spin"></i>
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </button>

          <div className="divider">
            <span>or</span>
          </div>

          <button 
            type="button"
            className="auth-btn demo-btn"
            onClick={handleDemoLogin}
            disabled={loading}
          >
            <i className="fas fa-user-circle"></i>
            Use Demo Account
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Don't have an account?{' '}
            <Link to="/signup" className="auth-link">
              Sign up
            </Link>
          </p>
        </div>

        <div className="security-note">
          <i className="fas fa-shield-alt"></i>
          <span>Your data is securely encrypted</span>
        </div>
      </div>
    </div>
  );
};

export default Login;