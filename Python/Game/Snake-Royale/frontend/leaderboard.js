class LeaderboardManager {
    constructor() {
        this.API_URL = 'http://localhost:8000'; // Update with your backend URL
        this.currentFilter = 'global';
        
        this.bindEvents();
        this.loadLeaderboard();
    }
    
    bindEvents() {
        // Refresh button
        document.getElementById('refreshLeaderboard').addEventListener('click', () => {
            this.loadLeaderboard();
        });
        
        // Filter change
        document.getElementById('leaderboardFilter').addEventListener('change', (e) => {
            this.currentFilter = e.target.value;
            this.loadLeaderboard();
        });
    }
    
    async loadLeaderboard() {
        const leaderboardList = document.getElementById('leaderboardList');
        leaderboardList.innerHTML = '<div class="leaderboard-loading">Loading leaderboard...</div>';
        
        try {
            let url;
            if (this.currentFilter === 'personal' && window.auth && window.auth.user) {
                url = `${this.API_URL}/leaderboard/user/${window.auth.user.username}`;
            } else {
                url = `${this.API_URL}/leaderboard?limit=20`;
            }
            
            const response = await fetch(url);
            
            if (response.ok) {
                const entries = await response.json();
                this.displayLeaderboard(entries);
                
                // If showing global leaderboard and user is logged in, also load user stats
                if (this.currentFilter === 'global' && window.auth && window.auth.user) {
                    this.loadUserStats();
                }
            } else {
                leaderboardList.innerHTML = '<div class="leaderboard-error">Failed to load leaderboard</div>';
            }
        } catch (error) {
            console.error('Error loading leaderboard:', error);
            leaderboardList.innerHTML = '<div class="leaderboard-error">Network error loading leaderboard</div>';
        }
    }
    
    async loadUserStats() {
        if (!window.auth || !window.auth.user) return;
        
        try {
            // Load user's personal best scores
            const response = await fetch(`${this.API_URL}/leaderboard/user/${window.auth.user.username}?limit=1`);
            
            if (response.ok) {
                const entries = await response.json();
                const bestScore = entries.length > 0 ? entries[0].score : 0;
                
                // Update user stats in the UI
                document.getElementById('statGames').textContent = window.auth.user.games_played || 0;
                document.getElementById('statTotalScore').textContent = window.auth.user.total_score || 0;
                
                const avgScore = window.auth.user.games_played > 0 
                    ? Math.round(window.auth.user.total_score / window.auth.user.games_played) 
                    : 0;
                document.getElementById('statAvgScore').textContent = avgScore;
                document.getElementById('statBestScore').textContent = bestScore;
            }
        } catch (error) {
            console.error('Error loading user stats:', error);
        }
    }
    
    clearUserStats() {
        document.getElementById('statGames').textContent = '0';
        document.getElementById('statTotalScore').textContent = '0';
        document.getElementById('statAvgScore').textContent = '0';
        document.getElementById('statBestScore').textContent = '0';
    }
    
    displayLeaderboard(entries) {
        const leaderboardList = document.getElementById('leaderboardList');
        
        if (entries.length === 0) {
            leaderboardList.innerHTML = '<div class="leaderboard-empty">No scores yet. Be the first!</div>';
            return;
        }
        
        let html = '';
        const currentUsername = window.auth && window.auth.user ? window.auth.user.username : null;
        
        entries.forEach((entry, index) => {
            const isCurrentUser = entry.username === currentUsername;
            const date = new Date(entry.date);
            const formattedDate = date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric'
            });
            
            html += `
                <div class="leaderboard-entry ${isCurrentUser ? 'current-user' : ''}">
                    <div class="leaderboard-rank">#${index + 1}</div>
                    <div class="leaderboard-info">
                        <div class="leaderboard-username">
                            ${entry.username}
                            ${isCurrentUser ? ' <i class="fas fa-user"></i>' : ''}
                        </div>
                        <div class="leaderboard-score">
                            Score: <span>${entry.score}</span> | 
                            Length: <span>${entry.snake_length}</span> | 
                            Level: <span>${entry.level}</span>
                        </div>
                        <div class="leaderboard-date">${formattedDate}</div>
                    </div>
                </div>
            `;
        });
        
        leaderboardList.innerHTML = html;
    }
}

// Initialize leaderboard manager when page loads
window.addEventListener('DOMContentLoaded', () => {
    window.leaderboard = new LeaderboardManager();
});