import React, { useState, useEffect } from 'react';
import { LogIn, UserPlus, LogOut, BarChart3, Users, Activity, TrendingUp } from 'lucide-react';

const API_URL = 'http://localhost:5000/api';

function App() {
  const [view, setView] = useState('login');
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUser(token);
    }
  }, []);

  const fetchUser = async (token) => {
    try {
      const res = await fetch(`${API_URL}/auth/me`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data);
        setView('dashboard');
      } else {
        localStorage.removeItem('token');
      }
    } catch (err) {
      console.error('Auth check failed:', err);
    }
  };

  const handleSubmit = async () => {
    setError('');
    setLoading(true);

    const endpoint = view === 'login' ? '/auth/login' : '/auth/signup';
    const body = view === 'login' 
      ? { email: formData.email, password: formData.password }
      : formData;

    try {
      const res = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        setUser(data.user);
        setView('dashboard');
        setFormData({ name: '', email: '', password: '' });
      } else {
        setError(data.message || 'Authentication failed');
      }
    } catch (err) {
      setError('Server connection failed. Using demo mode.');
      // Demo mode fallback
      const demoUser = { name: formData.name || 'Demo User', email: formData.email };
      setUser(demoUser);
      setView('dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setView('login');
    setFormData({ name: '', email: '', password: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (view === 'dashboard' && user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
        <nav className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <Activity className="w-8 h-8 text-indigo-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">Dashboard</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-700">Welcome, <span className="font-semibold">{user.name || user.email}</span></span>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Overview</h1>
            <p className="text-gray-600 mt-1">Welcome back! Here's what's happening today.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">2,543</p>
                  <p className="text-sm text-green-600 mt-2">+12% from last month</p>
                </div>
                <Users className="w-12 h-12 text-indigo-600" />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Revenue</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">$45,231</p>
                  <p className="text-sm text-green-600 mt-2">+8% from last month</p>
                </div>
                <TrendingUp className="w-12 h-12 text-green-600" />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Projects</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">127</p>
                  <p className="text-sm text-blue-600 mt-2">23 new this week</p>
                </div>
                <BarChart3 className="w-12 h-12 text-blue-600" />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Performance</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">98.2%</p>
                  <p className="text-sm text-green-600 mt-2">+2.1% improvement</p>
                </div>
                <Activity className="w-12 h-12 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {[
                  { action: 'New user registration', time: '5 minutes ago', type: 'user' },
                  { action: 'Project milestone completed', time: '1 hour ago', type: 'project' },
                  { action: 'System update deployed', time: '3 hours ago', type: 'system' },
                  { action: 'New feature released', time: '1 day ago', type: 'feature' }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{item.action}</p>
                      <p className="text-xs text-gray-500 mt-1">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Create Project', color: 'indigo' },
                  { label: 'Add User', color: 'green' },
                  { label: 'View Reports', color: 'blue' },
                  { label: 'Settings', color: 'purple' }
                ].map((action, i) => (
                  <button
                    key={i}
                    className={`p-4 rounded-lg border-2 border-${action.color}-200 bg-${action.color}-50 hover:bg-${action.color}-100 transition-colors text-${action.color}-700 font-medium text-sm`}
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              {view === 'login' ? (
                <LogIn className="w-8 h-8 text-indigo-600" />
              ) : (
                <UserPlus className="w-8 h-8 text-indigo-600" />
              )}
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              {view === 'login' ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-gray-600 mt-2">
              {view === 'login' ? 'Sign in to your account' : 'Sign up to get started'}
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <div className="space-y-4">
            {view === 'signup' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                  placeholder="John Doe"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                placeholder="john@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Processing...' : view === 'login' ? 'Sign In' : 'Sign Up'}
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {view === 'login' ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => {
                  setView(view === 'login' ? 'signup' : 'login');
                  setError('');
                  setFormData({ name: '', email: '', password: '' });
                }}
                className="text-indigo-600 font-semibold hover:text-indigo-700 transition-colors"
              >
                {view === 'login' ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>
        </div>

        <p className="text-center text-white text-sm mt-6">
          Demo mode: Try any credentials to see the dashboard
        </p>
      </div>
    </div>
  );
}

export default App;