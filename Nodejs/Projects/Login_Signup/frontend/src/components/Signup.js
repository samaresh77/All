import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../services/api';
import './Auth.css';

const Signup = ({ onSignup }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const { name, email, password, confirmPassword } = formData;

  const validateForm = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = 'Name is required';
    } else if (name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    } else if (!/(?=.*[A-Za-z])(?=.*\d)/.test(password)) {
      newErrors.password = 'Password must contain at least one letter and one number';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    return newErrors;
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    
    // Clear error for this field when user starts typing
    if (errors[e.target.name]) {
      setErrors(prev => ({ ...prev, [e.target.name]: '' }));
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const response = await authAPI.register({
        name,
        email,
        password
      });

      if (response.data.success) {
        setSuccess(true);
        
        // Auto login after successful registration
        setTimeout(async () => {
          try {
            const loginResponse = await authAPI.login({ email, password });
            
            if (loginResponse.data.success) {
              localStorage.setItem('token', loginResponse.data.token);
              localStorage.setItem('user', JSON.stringify(loginResponse.data.user));
              onSignup(loginResponse.data.user, loginResponse.data.token);
              navigate('/dashboard');
            }
          } catch (loginError) {
            navigate('/login');
          }
        }, 2000);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 
                          err.message || 
                          'Registration failed. Please try again.';
      
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      } else {
        setErrors({ general: errorMessage });
      }
    } finally {
      setLoading(false);
    }
  };

  const passwordStrength = () => {
    if (!password) return { score: 0, text: '' };
    
    let score = 0;
    if (password.length >= 6) score++;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    
    const strength = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
    const colors = ['#ff4757', '#ff6348', '#ffa502', '#2ed573', '#1e90ff', '#3742fa'];
    
    return {
      score,
      text: strength[score],
      color: colors[score],
      width: `${(score / 5) * 100}%`
    };
  };

  const strength = passwordStrength();

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Create Account</h2>
          <p className="auth-subtitle">Join our community today</p>
        </div>

        {success ? (
          <div className="success-message">
            <div className="success-icon">
              <i className="fas fa-check-circle"></i>
            </div>
            <h3>Registration Successful!</h3>
            <p>Your account has been created. Redirecting to dashboard...</p>
            <div className="loading-spinner"></div>
          </div>
        ) : (
          <>
            {errors.general && (
              <div className="alert alert-error">
                <i className="fas fa-exclamation-circle"></i>
                {errors.general}
              </div>
            )}

            <form onSubmit={onSubmit}>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <div className="input-with-icon">
                  <i className="fas fa-user"></i>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={onChange}
                    placeholder="Enter your full name"
                    disabled={loading}
                    className={errors.name ? 'input-error' : ''}
                  />
                </div>
                {errors.name && <div className="error-message">{errors.name}</div>}
              </div>

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
                    placeholder="Enter your email"
                    disabled={loading}
                    className={errors.email ? 'input-error' : ''}
                  />
                </div>
                {errors.email && <div className="error-message">{errors.email}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="input-with-icon">
                  <i className="fas fa-lock"></i>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={password}
                    onChange={onChange}
                    placeholder="Create a strong password"
                    disabled={loading}
                    className={errors.password ? 'input-error' : ''}
                  />
                  <button
                    type="button"
                    className="show-password-btn"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <i className={`fas fa-${showPassword ? 'eye-slash' : 'eye'}`}></i>
                  </button>
                </div>
                
                {password && (
                  <div className="password-strength">
                    <div className="strength-bar">
                      <div 
                        className="strength-fill"
                        style={{
                          width: strength.width,
                          backgroundColor: strength.color
                        }}
                      ></div>
                    </div>
                    <span className="strength-text">
                      Strength: <strong style={{ color: strength.color }}>{strength.text}</strong>
                    </span>
                  </div>
                )}
                {errors.password && <div className="error-message">{errors.password}</div>}
                
                <div className="password-requirements">
                  <p>Password must contain:</p>
                  <ul>
                    <li className={password.length >= 6 ? 'met' : ''}>
                      <i className={`fas fa-${password.length >= 6 ? 'check' : 'times'}`}></i>
                      At least 6 characters
                    </li>
                    <li className={/[A-Za-z]/.test(password) && /\d/.test(password) ? 'met' : ''}>
                      <i className={`fas fa-${/[A-Za-z]/.test(password) && /\d/.test(password) ? 'check' : 'times'}`}></i>
                      Letters and numbers
                    </li>
                  </ul>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div className="input-with-icon">
                  <i className="fas fa-lock"></i>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={onChange}
                    placeholder="Confirm your password"
                    disabled={loading}
                    className={errors.confirmPassword ? 'input-error' : ''}
                  />
                  <button
                    type="button"
                    className="show-password-btn"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    <i className={`fas fa-${showConfirmPassword ? 'eye-slash' : 'eye'}`}></i>
                  </button>
                </div>
                {errors.confirmPassword && (
                  <div className="error-message">{errors.confirmPassword}</div>
                )}
              </div>

              <div className="terms-agreement">
                <input
                  type="checkbox"
                  id="terms"
                  required
                  disabled={loading}
                />
                <label htmlFor="terms">
                  I agree to the <Link to="/terms">Terms of Service</Link> and <Link to="/privacy">Privacy Policy</Link>
                </label>
              </div>

              <button 
                type="submit" 
                className="auth-btn primary-btn"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i>
                    Creating Account...
                  </>
                ) : (
                  'Create Account'
                )}
              </button>
            </form>

            <div className="auth-footer">
              <p>
                Already have an account?{' '}
                <Link to="/login" className="auth-link">
                  Sign in
                </Link>
              </p>
            </div>
          </>
        )}

        <div className="security-note">
          <i className="fas fa-shield-alt"></i>
          <span>We use industry-standard encryption to protect your data</span>
        </div>
      </div>
    </div>
  );
};

export default Signup;