import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';
import './Dashboard.css';

const Dashboard = ({ user, onLogout }) => {
  const [stats, setStats] = useState({
    lastLogin: null,
    accountAge: 0,
    loginCount: 0
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Simulate API call for dashboard data
      setTimeout(() => {
        setStats({
          lastLogin: new Date().toLocaleDateString(),
          accountAge: Math.floor(Math.random() * 30) + 1,
          loginCount: Math.floor(Math.random() * 50) + 1
        });
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoading(false);
    }
  };

  const handleUpdateProfile = () => {
    navigate('/profile');
  };

  const handleChangePassword = async () => {
    // Implement password change modal
    alert('Password change feature coming soon!');
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>
          <i className="fas fa-tachometer-alt"></i>
          Dashboard
        </h1>
        <p>Welcome back, {user?.name}! Here's your account overview.</p>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-grid">
          {/* User Info Card */}
          <div className="dashboard-card user-card">
            <div className="card-header">
              <h3>
                <i className="fas fa-user-circle"></i>
                Account Information
              </h3>
              <button 
                className="edit-btn"
                onClick={handleUpdateProfile}
              >
                <i className="fas fa-edit"></i>
                Edit
              </button>
            </div>
            <div className="card-content">
              <div className="user-avatar">
                <div className="avatar-initials">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
              </div>
              <div className="user-details">
                <div className="detail-item">
                  <span className="label">
                    <i className="fas fa-user"></i>
                    Name:
                  </span>
                  <span className="value">{user?.name}</span>
                </div>
                <div className="detail-item">
                  <span className="label">
                    <i className="fas fa-envelope"></i>
                    Email:
                  </span>
                  <span className="value">{user?.email}</span>
                </div>
                <div className="detail-item">
                  <span className="label">
                    <i className="fas fa-user-tag"></i>
                    Role:
                  </span>
                  <span className="value badge">{user?.role || 'User'}</span>
                </div>
                <div className="detail-item">
                  <span className="label">
                    <i className="fas fa-check-circle"></i>
                    Status:
                  </span>
                  <span className="value verified">
                    <i className="fas fa-check"></i>
                    Verified
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Card */}
          <div className="dashboard-card stats-card">
            <div className="card-header">
              <h3>
                <i className="fas fa-chart-line"></i>
                Account Statistics
              </h3>
            </div>
            <div className="card-content">
              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-icon">
                    <i className="fas fa-calendar-check"></i>
                  </div>
                  <div className="stat-info">
                    <span className="stat-value">{stats.accountAge}</span>
                    <span className="stat-label">Account Age (days)</span>
                  </div>
                </div>
                <div className="stat-item">
                  <div className="stat-icon">
                    <i className="fas fa-sign-in-alt"></i>
                  </div>
                  <div className="stat-info">
                    <span className="stat-value">{stats.loginCount}</span>
                    <span className="stat-label">Total Logins</span>
                  </div>
                </div>
                <div className="stat-item">
                  <div className="stat-icon">
                    <i className="fas fa-clock"></i>
                  </div>
                  <div className="stat-info">
                    <span className="stat-value">{stats.lastLogin}</span>
                    <span className="stat-label">Last Login</span>
                  </div>
                </div>
                <div className="stat-item">
                  <div className="stat-icon">
                    <i className="fas fa-shield-alt"></i>
                  </div>
                  <div className="stat-info">
                    <span className="stat-value">100%</span>
                    <span className="stat-label">Security Score</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions Card */}
          <div className="dashboard-card actions-card">
            <div className="card-header">
              <h3>
                <i className="fas fa-bolt"></i>
                Quick Actions
              </h3>
            </div>
            <div className="card-content">
              <div className="actions-grid">
                <button className="action-btn" onClick={handleUpdateProfile}>
                  <i className="fas fa-user-edit"></i>
                  Update Profile
                </button>
                <button className="action-btn" onClick={handleChangePassword}>
                  <i className="fas fa-key"></i>
                  Change Password
                </button>
                <button className="action-btn">
                  <i className="fas fa-cog"></i>
                  Settings
                </button>
                <button className="action-btn" onClick={onLogout}>
                  <i className="fas fa-sign-out-alt"></i>
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Security Card */}
          <div className="dashboard-card security-card">
            <div className="card-header">
              <h3>
                <i className="fas fa-shield-alt"></i>
                Security Status
              </h3>
            </div>
            <div className="card-content">
              <div className="security-status">
                <div className="status-item secure">
                  <i className="fas fa-check-circle"></i>
                  <div>
                    <h4>Password Strength</h4>
                    <p>Your password is strong</p>
                  </div>
                </div>
                <div className="status-item secure">
                  <i className="fas fa-check-circle"></i>
                  <div>
                    <h4>Email Verified</h4>
                    <p>Your email is confirmed</p>
                  </div>
                </div>
                <div className="status-item warning">
                  <i className="fas fa-exclamation-triangle"></i>
                  <div>
                    <h4>Two-Factor Auth</h4>
                    <p>Enable for extra security</p>
                  </div>
                </div>
                <div className="status-item secure">
                  <i className="fas fa-check-circle"></i>
                  <div>
                    <h4>Recent Activity</h4>
                    <p>No suspicious activity</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="dashboard-card activity-card">
          <div className="card-header">
            <h3>
              <i className="fas fa-history"></i>
              Recent Activity
            </h3>
          </div>
          <div className="card-content">
            <div className="activity-list">
              <div className="activity-item">
                <div className="activity-icon success">
                  <i className="fas fa-sign-in-alt"></i>
                </div>
                <div className="activity-details">
                  <h4>Successful Login</h4>
                  <p>Just now • From Chrome, Windows</p>
                </div>
                <span className="activity-time">Now</span>
              </div>
              <div className="activity-item">
                <div className="activity-icon info">
                  <i className="fas fa-user-edit"></i>
                </div>
                <div className="activity-details">
                  <h4>Profile Updated</h4>
                  <p>2 days ago • Changed profile picture</p>
                </div>
                <span className="activity-time">2d</span>
              </div>
              <div className="activity-item">
                <div className="activity-icon success">
                  <i className="fas fa-key"></i>
                </div>
                <div className="activity-details">
                  <h4>Password Changed</h4>
                  <p>1 week ago • Password was updated</p>
                </div>
                <span className="activity-time">1w</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-footer">
        <p>
          <i className="fas fa-info-circle"></i>
          Your data is securely stored in MongoDB Atlas. Last sync: {new Date().toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
};

export default Dashboard;