class SnakeGame {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.overlay = document.getElementById('gameOverlay');
        this.scoreElement = document.getElementById('score');
        this.levelElement = document.getElementById('level');
        this.lengthElement = document.getElementById('length');
        this.highScoreElement = document.getElementById('highScore');
        
        // Game state
        this.gridSize = 20;
        this.snake = [];
        this.food = {};
        this.direction = 'right';
        this.nextDirection = 'right';
        this.gameSpeed = 150;
        this.score = 0;
        this.level = 1;
        this.highScore = localStorage.getItem('snakeHighScore') || 0;
        this.gameRunning = false;
        this.gamePaused = false;
        this.gameLoop = null;
        this.foodEaten = 0;
        this.gameStartTime = null;
        
        // Initialize
        this.init();
        this.bindEvents();
        this.updateHighScore();
        this.showStartScreen();
    }
    
    init() {
        // Set canvas dimensions
        this.canvas.width = 600;
        this.canvas.height = 600;
        
        // Calculate grid
        this.gridWidth = Math.floor(this.canvas.width / this.gridSize);
        this.gridHeight = Math.floor(this.canvas.height / this.gridSize);
        
        // Initialize snake
        this.resetGame();
    }
    
    resetGame() {
        // Clear any existing game loop
        if (this.gameLoop) {
            clearInterval(this.gameLoop);
        }
        
        // Reset snake
        const startX = Math.floor(this.gridWidth / 4);
        const startY = Math.floor(this.gridHeight / 2);
        this.snake = [
            {x: startX, y: startY},
            {x: startX - 1, y: startY},
            {x: startX - 2, y: startY}
        ];
        
        // Reset game state
        this.direction = 'right';
        this.nextDirection = 'right';
        this.score = 0;
        this.level = 1;
        this.foodEaten = 0;
        this.gameRunning = false;
        this.gamePaused = false;
        
        // Generate first food
        this.generateFood();
        
        // Update UI
        this.updateScore();
        this.updateLevel();
        this.updateLength();
        
        // Draw initial state
        this.draw();
    }
    
    startGame() {
        if (this.gameRunning) return;
        
        this.gameRunning = true;
        this.gameStartTime = Date.now();
        this.overlay.style.display = 'none';
        
        // Start game loop
        this.gameLoop = setInterval(() => this.update(), this.gameSpeed);
        
        // Update button states
        document.getElementById('startBtn').disabled = true;
        document.getElementById('pauseBtn').disabled = false;
        document.getElementById('overlayAction').textContent = 'RESUME GAME';
    }
    
    pauseGame() {
        if (!this.gameRunning) return;
        
        this.gamePaused = !this.gamePaused;
        
        if (this.gamePaused) {
            clearInterval(this.gameLoop);
            this.showPauseScreen();
            document.getElementById('pauseBtn').innerHTML = '<i class="fas fa-play"></i> RESUME';
        } else {
            this.gameLoop = setInterval(() => this.update(), this.gameSpeed);
            this.overlay.style.display = 'none';
            document.getElementById('pauseBtn').innerHTML = '<i class="fas fa-pause"></i> PAUSE';
        }
    }
    
    update() {
        // Update direction
        this.direction = this.nextDirection;
        
        // Calculate new head position
        const head = {...this.snake[0]};
        
        switch (this.direction) {
            case 'up': head.y--; break;
            case 'down': head.y++; break;
            case 'left': head.x--; break;
            case 'right': head.x++; break;
        }
        
        // Check wall collision
        if (head.x < 0 || head.x >= this.gridWidth || head.y < 0 || head.y >= this.gridHeight) {
            this.gameOver();
            return;
        }
        
        // Check self collision
        if (this.snake.some(segment => segment.x === head.x && segment.y === head.y)) {
            this.gameOver();
            return;
        }
        
        // Add new head
        this.snake.unshift(head);
        
        // Check food collision
        if (head.x === this.food.x && head.y === this.food.y) {
            this.score += 10 * this.level;
            this.foodEaten++;
            
            // Level up every 5 foods
            if (this.foodEaten % 5 === 0) {
                this.level++;
                this.updateLevel();
                
                // Increase speed (cap at 40ms)
                if (this.gameSpeed > 40) {
                    this.gameSpeed -= 10;
                    clearInterval(this.gameLoop);
                    this.gameLoop = setInterval(() => this.update(), this.gameSpeed);
                }
            }
            
            this.generateFood();
            this.updateScore();
            this.updateLength();
            
            // Update UI
            document.getElementById('overlayAction').textContent = 'RESUME GAME';
        } else {
            // Remove tail if no food eaten
            this.snake.pop();
        }
        
        // Draw updated game state
        this.draw();
    }
    
    draw() {
        // Clear canvas
        this.ctx.fillStyle = '#0d1930';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw grid
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
        this.ctx.lineWidth = 1;
        
        for (let x = 0; x <= this.gridWidth; x++) {
            this.ctx.beginPath();
            this.ctx.moveTo(x * this.gridSize, 0);
            this.ctx.lineTo(x * this.gridSize, this.canvas.height);
            this.ctx.stroke();
        }
        
        for (let y = 0; y <= this.gridHeight; y++) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y * this.gridSize);
            this.ctx.lineTo(this.canvas.width, y * this.gridSize);
            this.ctx.stroke();
        }
        
        // Draw snake
        this.snake.forEach((segment, index) => {
            const gradient = this.ctx.createLinearGradient(
                segment.x * this.gridSize,
                segment.y * this.gridSize,
                (segment.x + 1) * this.gridSize,
                (segment.y + 1) * this.gridSize
            );
            
            if (index === 0) {
                // Head
                gradient.addColorStop(0, '#2ecc71');
                gradient.addColorStop(1, '#27ae60');
            } else {
                // Body
                const intensity = 1 - (index / this.snake.length) * 0.5;
                gradient.addColorStop(0, `rgba(46, 204, 113, ${intensity})`);
                gradient.addColorStop(1, `rgba(39, 174, 96, ${intensity})`);
            }
            
            this.ctx.fillStyle = gradient;
            this.ctx.fillRect(
                segment.x * this.gridSize + 1,
                segment.y * this.gridSize + 1,
                this.gridSize - 2,
                this.gridSize - 2
            );
            
            // Draw eyes on head
            if (index === 0) {
                this.ctx.fillStyle = '#ffffff';
                const eyeSize = this.gridSize / 5;
                
                // Calculate eye positions based on direction
                let leftEyeX, leftEyeY, rightEyeX, rightEyeY;
                
                switch (this.direction) {
                    case 'right':
                        leftEyeX = (segment.x + 0.7) * this.gridSize;
                        leftEyeY = (segment.y + 0.3) * this.gridSize;
                        rightEyeX = (segment.x + 0.7) * this.gridSize;
                        rightEyeY = (segment.y + 0.7) * this.gridSize;
                        break;
                    case 'left':
                        leftEyeX = (segment.x + 0.3) * this.gridSize;
                        leftEyeY = (segment.y + 0.3) * this.gridSize;
                        rightEyeX = (segment.x + 0.3) * this.gridSize;
                        rightEyeY = (segment.y + 0.7) * this.gridSize;
                        break;
                    case 'up':
                        leftEyeX = (segment.x + 0.3) * this.gridSize;
                        leftEyeY = (segment.y + 0.3) * this.gridSize;
                        rightEyeX = (segment.x + 0.7) * this.gridSize;
                        rightEyeY = (segment.y + 0.3) * this.gridSize;
                        break;
                    case 'down':
                        leftEyeX = (segment.x + 0.3) * this.gridSize;
                        leftEyeY = (segment.y + 0.7) * this.gridSize;
                        rightEyeX = (segment.x + 0.7) * this.gridSize;
                        rightEyeY = (segment.y + 0.7) * this.gridSize;
                        break;
                }
                
                this.ctx.beginPath();
                this.ctx.arc(leftEyeX, leftEyeY, eyeSize, 0, Math.PI * 2);
                this.ctx.fill();
                
                this.ctx.beginPath();
                this.ctx.arc(rightEyeX, rightEyeY, eyeSize, 0, Math.PI * 2);
                this.ctx.fill();
            }
        });
        
        // Draw food
        this.ctx.fillStyle = '#e74c3c';
        this.ctx.beginPath();
        this.ctx.arc(
            (this.food.x + 0.5) * this.gridSize,
            (this.food.y + 0.5) * this.gridSize,
            this.gridSize / 2 - 2,
            0,
            Math.PI * 2
        );
        this.ctx.fill();
        
        // Draw food shine
        this.ctx.fillStyle = '#ffffff';
        this.ctx.beginPath();
        this.ctx.arc(
            (this.food.x + 0.3) * this.gridSize,
            (this.food.y + 0.3) * this.gridSize,
            this.gridSize / 6,
            0,
            Math.PI * 2
        );
        this.ctx.fill();
    }
    
    generateFood() {
        let newFood;
        let foodOnSnake;
        
        do {
            foodOnSnake = false;
            newFood = {
                x: Math.floor(Math.random() * this.gridWidth),
                y: Math.floor(Math.random() * this.gridHeight)
            };
            
            // Check if food would spawn on snake
            for (const segment of this.snake) {
                if (segment.x === newFood.x && segment.y === newFood.y) {
                    foodOnSnake = true;
                    break;
                }
            }
        } while (foodOnSnake);
        
        this.food = newFood;
    }
    
    updateScore() {
        this.scoreElement.textContent = this.score;
        
        if (this.score > this.highScore) {
            this.highScore = this.score;
            localStorage.setItem('snakeHighScore', this.highScore);
            this.updateHighScore();
        }
    }
    
    updateLevel() {
        this.levelElement.textContent = this.level;
    }
    
    updateLength() {
        this.lengthElement.textContent = this.snake.length;
    }
    
    updateHighScore() {
        this.highScoreElement.textContent = this.highScore;
    }
    
    showStartScreen() {
        this.overlay.style.display = 'flex';
        document.getElementById('overlayTitle').textContent = 'SNAKE ROYALE';
        document.getElementById('overlayText').textContent = 'Use arrow keys to move. Eat the food to grow and score points!';
        document.getElementById('overlayAction').textContent = 'START GAME';
        document.getElementById('overlayAction').onclick = () => this.startGame();
    }
    
    showPauseScreen() {
        this.overlay.style.display = 'flex';
        document.getElementById('overlayTitle').textContent = 'GAME PAUSED';
        document.getElementById('overlayText').textContent = 'Press space or click resume to continue playing.';
        document.getElementById('overlayAction').textContent = 'RESUME GAME';
        document.getElementById('overlayAction').onclick = () => this.pauseGame();
    }
    
    gameOver() {
        this.gameRunning = false;
        clearInterval(this.gameLoop);
        
        // Calculate game duration
        const duration = this.gameStartTime ? Math.floor((Date.now() - this.gameStartTime) / 1000) : 0;
        
        // Show game over modal
        document.getElementById('finalScore').textContent = this.score;
        document.getElementById('finalLength').textContent = this.snake.length;
        document.getElementById('finalLevel').textContent = this.level;
        
        // Game over message based on score
        let message = 'Better luck next time!';
        if (this.score > 500) message = 'Incredible! You\'re a snake master!';
        else if (this.score > 200) message = 'Great job! Keep going!';
        else if (this.score > 100) message = 'Good effort! Try again!';
        
        document.getElementById('gameOverMessage').textContent = message;
        document.getElementById('gameOverModal').style.display = 'flex';
        
        // Save score if user is logged in
        if (window.auth && window.auth.token) {
            this.saveScore(duration);
        }
        
        // Update button states
        document.getElementById('startBtn').disabled = false;
        document.getElementById('pauseBtn').disabled = true;
        document.getElementById('pauseBtn').innerHTML = '<i class="fas fa-pause"></i> PAUSE';
    }
    
    async saveScore(duration) {
        try {
            const response = await fetch(`${window.API_URL}/game/save`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${window.auth.token}`
                },
                body: JSON.stringify({
                    score: this.score,
                    level: this.level,
                    snake_length: this.snake.length,
                    duration: duration
                })
            });
            
            if (response.ok) {
                console.log('Score saved successfully');
                // Refresh leaderboard
                if (window.leaderboard) {
                    window.leaderboard.loadLeaderboard();
                }
            }
        } catch (error) {
            console.error('Error saving score:', error);
        }
    }
    
    bindEvents() {
        // Keyboard controls
        document.addEventListener('keydown', (e) => {
            if (!this.gameRunning && e.key === ' ') {
                this.startGame();
                return;
            }
            
            if (e.key === ' ' && this.gameRunning) {
                this.pauseGame();
                return;
            }
            
            if (e.key === 'r' || e.key === 'R') {
                this.resetGame();
                if (!this.gameRunning) {
                    this.showStartScreen();
                }
                return;
            }
            
            if (!this.gameRunning || this.gamePaused) return;
            
            // Prevent reverse direction
            switch (e.key) {
                case 'ArrowUp':
                    if (this.direction !== 'down') this.nextDirection = 'up';
                    break;
                case 'ArrowDown':
                    if (this.direction !== 'up') this.nextDirection = 'down';
                    break;
                case 'ArrowLeft':
                    if (this.direction !== 'right') this.nextDirection = 'left';
                    break;
                case 'ArrowRight':
                    if (this.direction !== 'left') this.nextDirection = 'right';
                    break;
            }
        });
        
        // Button events
        document.getElementById('startBtn').addEventListener('click', () => {
            if (!this.gameRunning) {
                this.startGame();
            }
        });
        
        document.getElementById('pauseBtn').addEventListener('click', () => {
            if (this.gameRunning) {
                this.pauseGame();
            }
        });
        
        document.getElementById('resetBtn').addEventListener('click', () => {
            this.resetGame();
            if (!this.gameRunning) {
                this.showStartScreen();
            }
        });
        
        document.getElementById('playAgainBtn').addEventListener('click', () => {
            document.getElementById('gameOverModal').style.display = 'none';
            this.resetGame();
            this.startGame();
        });
        
        document.getElementById('closeModalBtn').addEventListener('click', () => {
            document.getElementById('gameOverModal').style.display = 'none';
            this.resetGame();
            this.showStartScreen();
        });
        
        // Difficulty buttons
        document.querySelectorAll('.difficulty-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.difficulty-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                this.gameSpeed = parseInt(btn.dataset.speed);
                
                // Restart game loop with new speed if game is running
                if (this.gameRunning && !this.gamePaused) {
                    clearInterval(this.gameLoop);
                    this.gameLoop = setInterval(() => this.update(), this.gameSpeed);
                }
            });
        });
        
        // Touch controls for mobile
        let touchStartX = 0;
        let touchStartY = 0;
        
        this.canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        }, { passive: false });
        
        this.canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
        }, { passive: false });
        
        this.canvas.addEventListener('touchend', (e) => {
            e.preventDefault();
            if (!this.gameRunning || this.gamePaused) return;
            
            const touchEndX = e.changedTouches[0].clientX;
            const touchEndY = e.changedTouches[0].clientY;
            
            const dx = touchEndX - touchStartX;
            const dy = touchEndY - touchStartY;
            
            // Determine swipe direction
            if (Math.abs(dx) > Math.abs(dy)) {
                // Horizontal swipe
                if (dx > 0 && this.direction !== 'left') {
                    this.nextDirection = 'right';
                } else if (dx < 0 && this.direction !== 'right') {
                    this.nextDirection = 'left';
                }
            } else {
                // Vertical swipe
                if (dy > 0 && this.direction !== 'up') {
                    this.nextDirection = 'down';
                } else if (dy < 0 && this.direction !== 'down') {
                    this.nextDirection = 'up';
                }
            }
        }, { passive: false });
    }
}

// Initialize game when page loads
window.addEventListener('DOMContentLoaded', () => {
    window.game = new SnakeGame();
});