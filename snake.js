const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const blockSize = 10;
const width = canvas.width / blockSize;
const height = canvas.height / blockSize;

let snake = [{x: width / 2, y: height / 2}];

let direction = 'right';
let food = {x: Math.floor(Math.random() * width), y: Math.floor(Math.random() * height)};

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? 'green' : 'white';
    ctx.fillRect(snake[i].x * blockSize, snake[i].y * blockSize, blockSize, blockSize);
  }
  ctx.fillStyle = 'red';
  ctx.fillRect(food.x * blockSize, food.y * blockSize, blockSize, blockSize);
}

function update() {
  const head = {x: snake[0].x, y: snake[0].y};
  if (direction === 'right') head.x++;
  else if (direction === 'left') head.x--;
  else if (direction === 'up') head.y--;
  else if (direction === 'down') head.y++;
  snake.unshift(head);
  if (head.x === food.x && head.y === food.y) {
    food = {x: Math.floor(Math.random() * width), y: Math.floor(Math.random() * height)};
  } else {
    snake.pop();
  }
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowRight' && direction !== 'left') direction = 'right';
  else if (event.key === 'ArrowLeft' && direction !== 'right') direction = 'left';
  else if (event.key === 'ArrowUp' && direction !== 'down') direction = 'up';
  else if (event.key === 'ArrowDown' && direction !== 'up') direction = 'down';
});

setInterval(() => {
  update();
  draw();
}, 100);