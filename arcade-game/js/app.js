// Score panel variables
let lives = 3,
    livesPanel = document.querySelector('.lives'),
    score = 0,
    scorePanel = document.querySelector('.score'),
    highScore = 0,
    highPanel = document.querySelector('.high-score'),
    scoreFinal = document.querySelector('.score-final'),
    highFinal = document.querySelector('.high-final');


// Enemies our player must avoid
const Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    this.x = x;
    this.y = y + 60; // center enemy
    this.speed = speed;
    this.hor = 101;
    this.endMove = this.hor * 5;
    this.startMove = -this.hor;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // If enemy on map
    if(this.x < this.endMove) {
      // Move forward
      this.x += this.speed  * dt;
      // Increment x by (Speed * dt)
    } else {
      // Reset position and randomize speed for next cross
      this.x = this.startMove;
      this.speed = 120 + Math.floor(Math.random() * 500);
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Hero {
    // Constructor
    constructor() {
        this.sprite = 'images/char-boy.png';
        this.hor = 101; // Horizontal movement distance
        this.vert = 83; // Vertical movement distance
        this.startX = this.hor * 2;
        this.startY = (this.vert * 4) + 60;
        this.x = this.startX;
        this.y = this.startY;
        this.isWinner = false;
    }
        // Methods
            // Update position
            update() {
                // Check collision (x and y)
                for (let enemy of allEnemies) {
                  if (this.y === enemy.y && (enemy.x + enemy.hor/1.8 > this.x && enemy.x < this.x + this.hor/1.8)) {
                    lives--;
                    livesPanel.innerHTML = lives;
                    this.reset();
                  }
                }
                // Check win
                if (this.y === -23) {
                  score++;
                  scorePanel.innerHTML = score;
                  if (score > highScore) {
                    highScore = score;
                    highPanel.innerHTML = highScore;
                  }
                  this.reset();
                }
            }
            // render
                // Draw hero on current x and y position
            render() {
                ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
            }
            // Handle keyboard input
            /*
                Update position according to input
                @param {string} input - Direction to move

             */
            handleInput(input) {
              switch (input) {
                case 'left':
                  if (this.x > 0) {
                    this.x -= this.hor;
                  }
                  break;
                case 'up':
                  if (this.y > 0) {
                    this.y -= this.vert;
                  }
                  break;
                case 'right':
                  if (this.x < this.hor * 4) {
                    this.x += this.hor;
                  }
                  break;
                case 'down':
                  if (this.y < this.vert * 4) {
                    this.y += this.vert;
                  }
                  break;
              }
            }
            // Reset position
            reset() {
              this.x = this.startX;
              this.y = this.startY;
            }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// New hero object
const player = new Hero();
const enemy1 = new Enemy(-101, 0, 200);
const enemy2 = new Enemy(-101, 83, 270);
const enemy3 = new Enemy((-101 * 2.5), 83, 270);
const enemy4 = new Enemy((-101 * 2.5), 166, 250);
const enemy5 = new Enemy((-101 * 5), 166, 250);
const allEnemies = [];
allEnemies.push(enemy1, enemy2, enemy3, enemy4, enemy5);

// Init allEnemies array
// For each enemy create and push new Enemy object into array

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
