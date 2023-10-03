const snakeElement = document.getElementById('snake');
const foodElement = document.getElementById('food');

const gridSize = 20; // Tamanho do grid
const gridWidth = 15; // Número de células na largura
const gridHeight = 15; // Número de células na altura

let snake = [{ x: 0, y: 0 }];
let snakeXSpeed = 1;
let snakeYSpeed = 0;
let food = { x: 0, y: 0 };

function updateSnakePosition() {
    const newHead = { x: snake[0].x + snakeXSpeed, y: snake[0].y + snakeYSpeed };
    snake.unshift(newHead);

    // Check for collision with food
    if (newHead.x === food.x && newHead.y === food.y) {
        generateFood();
    } else {
        snake.pop();
    }

    // Check for collision with walls
    if (newHead.x < 0 || newHead.x >= gridWidth || newHead.y < 0 || newHead.y >= gridHeight) {
        gameOver();
        return;
    }

    renderSnake();
}

function generateFood() {
    food = {
        x: Math.floor(Math.random() * gridWidth),
        y: Math.floor(Math.random() * gridHeight)
    };

    // Make sure food is not placed on the snake
    for (const segment of snake) {
        if (segment.x === food.x && segment.y === food.y) {
            generateFood();
            return;
        }
    }

    foodElement.style.left = food.x * gridSize + 'px';
    foodElement.style.top = food.y * gridSize + 'px';
}

function renderSnake() {
    snakeElement.innerHTML = ''; // Clear previous snake segments

    for (const segment of snake) {
        const segmentElement = document.createElement('div');
        segmentElement.className = 'snake';
        segmentElement.style.left = segment.x * gridSize + 'px';
        segmentElement.style.top = segment.y * gridSize + 'px';
        snakeElement.appendChild(segmentElement);
    }
}

function gameOver() {
    alert('Game Over');
    snake = [{ x: 0, y: 0 }];
    snakeXSpeed = 1;
    snakeYSpeed = 0;
    generateFood();
    renderSnake();
}

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            if (snakeYSpeed !== 1) {
                snakeXSpeed = 0;
                snakeYSpeed = -1;
            }
            break;
        case 'ArrowDown':
            if (snakeYSpeed !== -1) {
                snakeXSpeed = 0;
                snakeYSpeed = 1;
            }
            break;
        case 'ArrowLeft':
            if (snakeXSpeed !== 1) {
                snakeXSpeed = -1;
                snakeYSpeed = 0;
            }
            break;
        case 'ArrowRight':
            if (snakeXSpeed !== -1) {
                snakeXSpeed = 1;
                snakeYSpeed = 0;
            }
            break;
    }
});

generateFood();
setInterval(updateSnakePosition, 200);
