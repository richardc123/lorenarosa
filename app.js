document.addEventListener('DOMContentLoaded', () => {
    /* --- Gallery Logic --- */
    const mainPhoto = document.getElementById('main-photo');
    const photoCaption = document.getElementById('photo-caption');
    const thumbnails = document.querySelectorAll('.thumbnail');

    if (mainPhoto) { // Check if gallery elements exist
        thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', () => {
                document.querySelector('.thumbnail.active').classList.remove('active');
                thumbnail.classList.add('active');
                const newSrc = thumbnail.src;
                const newCaption = thumbnail.dataset.caption;

                mainPhoto.style.opacity = 0;
                photoCaption.style.opacity = 0;

                setTimeout(() => {
                    mainPhoto.src = newSrc;
                    mainPhoto.alt = `Luciana Rosa, a mulher mais linda do mundo - ${thumbnail.alt.split(' ').pop()}`;
                    photoCaption.textContent = newCaption;
                    mainPhoto.style.opacity = 1;
                    photoCaption.style.opacity = 1;
                }, 400);
            });
        });
    }

    /* --- Snake Game Logic --- */
    const playGameBtn = document.getElementById('play-game-btn');
    const closeGameBtn = document.getElementById('close-game-btn');
    const restartGameBtn = document.getElementById('restart-game-btn');
    const gameOverlay = document.getElementById('game-overlay');
    const gameOverScreen = document.getElementById('game-over-screen');
    const finalScoreEl = document.getElementById('final-score');
    const canvas = document.getElementById('game-canvas');
    const ctx = canvas.getContext('2d');

    const gridSize = 20;
    let canvasSize = 400;
    canvas.width = canvas.height = canvasSize;

    let snake, food, score, direction, gameInterval, gameOver;

    function startGame() {
        snake = [{ x: 10, y: 10 }];
        food = {};
        score = 0;
        direction = 'right';
        gameOver = false;

        gameOverScreen.style.display = 'none';
        canvas.style.display = 'block';
        
        generateFood();
        if (gameInterval) clearInterval(gameInterval);
        gameInterval = setInterval(gameLoop, 120); // Game speed
    }

    function gameLoop() {
        if (gameOver) {
            clearInterval(gameInterval);
            showGameOver();
            return;
        }
        update();
        draw();
    }

    function update() {
        const head = { ...snake[0] };
        switch (direction) {
            case 'up': head.y--; break;
            case 'down': head.y++; break;
            case 'left': head.x--; break;
            case 'right': head.x++; break;
        }

        // Wall collision
        if (head.x < 0 || head.x >= canvasSize / gridSize || head.y < 0 || head.y >= canvasSize / gridSize) {
            gameOver = true;
            return;
        }

        // Self collision
        for (let i = 1; i < snake.length; i++) {
            if (head.x === snake[i].x && head.y === snake[i].y) {
                gameOver = true;
                return;
            }
        }

        snake.unshift(head);

        // Food collision
        if (head.x === food.x && head.y === food.y) {
            score++;
            generateFood();
        } else {
            snake.pop();
        }
    }

    function draw() {
        // Clear canvas
        ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw snake
        ctx.fillStyle = '#00ff00'; // Green snake
        snake.forEach(segment => {
            ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2);
        });

        // Draw food
        ctx.fillStyle = '#ffffff'; // White food
        ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);

        // Draw score
        ctx.fillStyle = '#ffd700';
        ctx.font = '20px Montserrat';
        ctx.fillText(`Pontuação: ${score}`, 10, 25);
    }

    function generateFood() {
        while (true) {
            food = {
                x: Math.floor(Math.random() * (canvasSize / gridSize)),
                y: Math.floor(Math.random() * (canvasSize / gridSize))
            };
            // Ensure food doesn't spawn on the snake
            let onSnake = snake.some(segment => segment.x === food.x && segment.y === food.y);
            if (!onSnake) break;
        }
    }

    function showGameOver() {
        finalScoreEl.textContent = score;
        canvas.style.display = 'none';
        gameOverScreen.style.display = 'flex';
    }

    function changeDirection(e) {
        const key = e.key;
        if ((key === 'ArrowUp' || key === 'w') && direction !== 'down') direction = 'up';
        if ((key === 'ArrowDown' || key === 's') && direction !== 'up') direction = 'down';
        if ((key === 'ArrowLeft' || key === 'a') && direction !== 'right') direction = 'left';
        if ((key === 'ArrowRight' || key === 'd') && direction !== 'left') direction = 'right';
    }

    playGameBtn.addEventListener('click', () => {
        gameOverlay.style.display = 'flex';
        startGame();
    });

    closeGameBtn.addEventListener('click', () => {
        gameOverlay.style.display = 'none';
        clearInterval(gameInterval);
    });

    restartGameBtn.addEventListener('click', startGame);

    document.addEventListener('keydown', changeDirection);

    // Mobile controls listeners
    document.getElementById('up-btn').addEventListener('click', () => changeDirection({ key: 'ArrowUp' }));
    document.getElementById('down-btn').addEventListener('click', () => changeDirection({ key: 'ArrowDown' }));
    document.getElementById('left-btn').addEventListener('click', () => changeDirection({ key: 'ArrowLeft' }));
    document.getElementById('right-btn').addEventListener('click', () => changeDirection({ key: 'ArrowRight' }));
});
