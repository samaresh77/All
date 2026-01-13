import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

// Initialize FontAwesome if needed
if (!document.querySelector('#font-awesome')) {
  const link = document.createElement('link');
  link.id = 'font-awesome';
  link.rel = 'stylesheet';
  link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
  link.integrity = 'sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==';
  link.crossOrigin = 'anonymous';
  link.referrerPolicy = 'no-referrer';
  document.head.appendChild(link);
}

const root = ReactDOM.createRoot(document.getElementById('root'));

// Error Boundary
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Application error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '20px'
        }}>
          <div style={{
            background: 'white',
            padding: '40px',
            borderRadius: '20px',
            maxWidth: '500px',
            textAlign: 'center',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
          }}>
            <h2 style={{ color: '#333', marginBottom: '20px' }}>
              <i className="fas fa-exclamation-triangle" style={{ color: '#ff6b6b', marginRight: '10px' }}></i>
              Something went wrong
            </h2>
            <p style={{ color: '#666', marginBottom: '30px' }}>
              The application encountered an error. Please try refreshing the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '10px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
            >
              <i className="fas fa-redo" style={{ marginRight: '8px' }}></i>
              Refresh Page
            </button>
            <p style={{ marginTop: '20px', fontSize: '12px', color: '#999' }}>
              Error: {this.state.error?.toString()}
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);