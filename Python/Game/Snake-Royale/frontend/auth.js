class AuthManager {
    constructor() {
        this.token = localStorage.getItem('snakeToken');
        this.user = JSON.parse(localStorage.getItem('snakeUser') || 'null');
        this.API_URL = 'http://localhost:8000'; // Update with your backend URL
        
        this.bindEvents();
        this.updateUI();
        
        // Auto-login if token exists
        if (this.token) {
            this.validateToken();
        }
    }
    
    bindEvents() {
        // Login/Register form switches
        document.getElementById('showRegister').addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('loginForm').style.display = 'none';
            document.getElementById('registerForm').style.display = 'block';
        });
        
        document.getElementById('showLogin').addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('registerForm').style.display = 'none';
            document.getElementById('loginForm').style.display = 'block';
        });
        
        // Login button
        document.getElementById('submitLogin').addEventListener('click', () => this.login());
        
        // Register button
        document.getElementById('submitRegister').addEventListener('click', () => this.register());
        
        // Logout button
        document.getElementById('logoutBtn').addEventListener('click', () => this.logout());
        
        // Login button in header
        document.getElementById('loginBtn').addEventListener('click', () => {
            document.getElementById('loginForm').style.display = 'block';
            document.getElementById('registerForm').style.display = 'none';
        });
        
        // Enter key support
        ['loginUsername', 'loginPassword', 'registerUsername', 'registerEmail', 'registerPassword', 'registerConfirmPassword']
            .forEach(id => {
                document.getElementById(id).addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        if (id.startsWith('login')) {
                            this.login();
                        } else {
                            this.register();
                        }
                    }
                });
            });
    }
    
    async login() {
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;
        
        if (!username || !password) {
            this.showMessage('Please enter both username and password', 'error');
            return;
        }
        
        try {
            const formData = new URLSearchParams();
            formData.append('username', username);
            formData.append('password', password);
            
            const response = await fetch(`${this.API_URL}/token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formData
            });
            
            if (response.ok) {
                const data = await response.json();
                this.token = data.access_token;
                localStorage.setItem('snakeToken', this.token);
                
                // Get user info
                await this.getUserInfo();
                this.showMessage('Login successful!', 'success');
            } else {
                this.showMessage('Invalid username or password', 'error');
            }
        } catch (error) {
            console.error('Login error:', error);
            this.showMessage('Network error. Please try again.', 'error');
        }
    }
    
    async register() {
        const username = document.getElementById('registerUsername').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('registerConfirmPassword').value;
        
        // Validation
        if (!username || !email || !password || !confirmPassword) {
            this.showMessage('Please fill in all fields', 'error');
            return;
        }
        
        if (password !== confirmPassword) {
            this.showMessage('Passwords do not match', 'error');
            return;
        }
        
        if (password.length < 6) {
            this.showMessage('Password must be at least 6 characters', 'error');
            return;
        }
        
        try {
            const response = await fetch(`${this.API_URL}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    email,
                    password
                })
            });
            
            if (response.ok) {
                this.showMessage('Registration successful! Please login.', 'success');
                // Switch to login form
                document.getElementById('registerForm').style.display = 'none';
                document.getElementById('loginForm').style.display = 'block';
                
                // Clear form
                document.getElementById('registerUsername').value = '';
                document.getElementById('registerEmail').value = '';
                document.getElementById('registerPassword').value = '';
                document.getElementById('registerConfirmPassword').value = '';
            } else {
                const error = await response.json();
                this.showMessage(error.detail || 'Registration failed', 'error');
            }
        } catch (error) {
            console.error('Registration error:', error);
            this.showMessage('Network error. Please try again.', 'error');
        }
    }
    
    async getUserInfo() {
        if (!this.token) return;
        
        try {
            const response = await fetch(`${this.API_URL}/users/me`, {
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            });
            
            if (response.ok) {
                this.user = await response.json();
                localStorage.setItem('snakeUser', JSON.stringify(this.user));
                this.updateUI();
                
                // Load user stats and leaderboard
                if (window.leaderboard) {
                    window.leaderboard.loadUserStats();
                    window.leaderboard.loadLeaderboard();
                }
            } else {
                this.logout();
            }
        } catch (error) {
            console.error('Error fetching user info:', error);
        }
    }
    
    async validateToken() {
        if (!this.token) return;
        
        try {
            const response = await fetch(`${this.API_URL}/users/me`, {
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            });
            
            if (!response.ok) {
                this.logout();
            } else {
                await this.getUserInfo();
            }
        } catch (error) {
            console.error('Token validation error:', error);
        }
    }
    
    logout() {
        this.token = null;
        this.user = null;
        localStorage.removeItem('snakeToken');
        localStorage.removeItem('snakeUser');
        this.updateUI();
        this.showMessage('Logged out successfully', 'success');
        
        // Clear user stats
        if (window.leaderboard) {
            window.leaderboard.clearUserStats();
        }
        
        // Reset to login form
        document.getElementById('loginForm').style.display = 'block';
        document.getElementById('registerForm').style.display = 'none';
    }
    
    updateUI() {
        const userInfo = document.getElementById('userInfo');
        const authForms = document.getElementById('authForms');
        const userStats = document.getElementById('userStats');
        
        if (this.user) {
            // User is logged in
            document.getElementById('usernameDisplay').textContent = this.user.username;
            document.getElementById('loginBtn').style.display = 'none';
            document.getElementById('logoutBtn').style.display = 'inline-block';
            authForms.style.display = 'none';
            userStats.style.display = 'block';
        } else {
            // User is not logged in
            document.getElementById('usernameDisplay').textContent = 'Guest';
            document.getElementById('loginBtn').style.display = 'inline-block';
            document.getElementById('logoutBtn').style.display = 'none';
            authForms.style.display = 'block';
            userStats.style.display = 'none';
        }
    }
    
    showMessage(message, type) {
        // Create message element
        const messageEl = document.createElement('div');
        messageEl.className = `message message-${type}`;
        messageEl.textContent = message;
        messageEl.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 25px;
            background-color: ${type === 'success' ? '#2ecc71' : '#e74c3c'};
            color: white;
            border-radius: 8px;
            z-index: 1000;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            animation: slideIn 0.3s ease;
        `;
        
        // Add animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(messageEl);
        
        // Remove message after 3 seconds
        setTimeout(() => {
            messageEl.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (messageEl.parentNode) {
                    messageEl.parentNode.removeChild(messageEl);
                }
            }, 300);
        }, 3000);
    }
}

// Initialize auth manager when page loads
window.addEventListener('DOMContentLoaded', () => {
    window.auth = new AuthManager();
});