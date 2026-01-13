import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear local storage and redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API methods
export const authAPI = {
  // Register user
  register: (userData) => api.post('/auth/register', userData),
  
  // Login user
  login: (credentials) => api.post('/auth/login', credentials),
  
  // Get current user
  getMe: () => api.get('/auth/me'),
  
  // Logout user
  logout: () => api.get('/auth/logout'),
  
  // Update user details
  updateDetails: (userData) => api.put('/auth/updatedetails', userData),
  
  // Update password
  updatePassword: (passwords) => api.put('/auth/updatepassword', passwords),
  
  // Forgot password
  forgotPassword: (email) => api.post('/auth/forgotpassword', { email }),
  
  // Reset password
  resetPassword: (token, password) => 
    api.put(`/auth/resetpassword/${token}`, { password })
};

export default api;