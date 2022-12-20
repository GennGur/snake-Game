const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

let grid = [];
let blockSize = 30;
let blockRow = 20;
let blockColumn = 10;

// Initialiser le tableau de grille avec des valeurs nulles
for (let i = 0; i < blockRow; i++) {
  grid[i] = [];
  for (let j = 0; j < blockColumn; j++) {
    grid[i][j] = null;
  }
}

// Dessiner le canvas gris
context.fillStyle = '#cccccc';
context.fillRect(0, 0, blockColumn * blockSize, blockRow * blockSize);

// Dessiner les lignes de la grille
context.strokeStyle = '#333333';
context.lineWidth = 2;
for (let i = 1; i < blockColumn; i++) {
  context.beginPath();
  context.moveTo(i * blockSize, 0);
  context.lineTo(i * blockSize, blockRow * blockSize);
  context.stroke();
}
for (let i = 1; i < blockRow; i++) {
  context.beginPath();
  context.moveTo(0, i * blockSize);
  context.lineTo(blockColumn * blockSize, i * blockSize);
  context.stroke();
}

// Définir les couleurs possibles pour les blocs
const blockColors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#00ffff', '#ff00ff'];

// Créer un objet de bloc
class Block {
  constructor(color) {
    this.color = color;
    this.x = 0;
    this.y = 0;
  }

  // Dessiner le bloc sur le canvas
  draw() {
    context.fillStyle = this.color;
    context.fillRect(this.x * blockSize, this.y * blockSize, blockSize, blockSize);
  }
}

// Créer un objet de forme de Tetris
class Tetromino {
  constructor(color) {
    this.color = color;
    this.blocks = [new Block(color), new Block(color), new Block(color), new Block(color)];
    this.rotation = 0;
  }

  // Déplacer la forme vers le bas
  moveDown() {
    for (const block of this.blocks) {
      block.y += 1;
    }
  }

  // Déplacer la forme vers la gauche
  moveLeft() {
    for (const block of this.blocks) {
      block.x -= 1;
    }
  }

  // Déplacer la forme vers la droite
  moveRight() {
    for (const block of this.blocks) {
      block.x += 1;
    }
  }

   // Faire pivoter la forme
   rotate() {
    this.rotation = (this.rotation + 1) % 4;
    const center = this.blocks[1];
    const offsets = [      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0]
    ];
    switch (this.rotation) {
      case 0:
        offsets[0][0] = -1;
        offsets[0][1] = -1;
        offsets[2][0] = 1;
        offsets[2][1] = 1;
        offsets[3][0] = 2;
        break;
      case 1:
        offsets[0][0] = 1;
        offsets[0][1] = -1;
        offsets[2][0] = -1;
        offsets[2][1] = 1;
        offsets[3][1] = 2;
        break;
      case 2:
        offsets[0][0] = 1;
        offsets[0][1] = 1;
        offsets[2][0] = -1;
        offsets[2][1] = -1;
        offsets[3][0] = -2;
        break;
      case 3:
        offsets[0][0] = -1;
        offsets[0][1] = 1;
        offsets[2][0] = 1;
        offsets[2][1] = -1;
        offsets[3][1] = -2;
        break;
    }
    for (let i = 0; i < this.blocks.length; i++) {
      this.blocks[i].x = center.x + offsets[i][0];
      this.blocks[i].y = center.y + offsets[i][1];
    }
  }

  // Dessiner la forme sur le canvas
  draw() {
    for (const block of this.blocks) {
      block.draw();
    }
  }
}

// Créer un tableau de formes aléatoires
const tetrominos = [];
for (let i = 0; i < blockColors.length; i++) {
  tetrominos.push(new Tetromino(blockColors[i]));
}

// Sélectionner une forme aléatoire
let currentTetromino = tetrominos[Math.floor(Math.random() * tetrominos.length)];

// Dessiner la forme sur le canvas
currentTetromino.draw();

// Définir la vitesse de descente de la forme (en millisecondes)
const dropSpeed = 500;

// Créer une fonction pour faire descendre la forme toutes les x millisecondes
const moveTetrominoDown = () => {
  currentTetromino.moveDown();
  currentTetromino.draw();
  setTimeout(moveTetrominoDown, dropSpeed);
};

// Démarrer la descente de la forme
moveTetrominoDown();

// Définir les contrôles de mouvement de la forme
document.addEventListener('keydown', event => {
  if (event.keyCode === 37) {
    currentTetromino.moveLeft();
  } else if (event.keyCode === 39) {
    currentTetromino.moveRight();
  } else if (event.keyCode === 38) {
    currentTetromino.rotate();
  }
  currentTetromino.draw();
});