class Hero {
    constructor() {
        this.sprite = 'images/char-boy.png';
        this.xJump = 101; // horizontal movement
        this.yJump = 83; // vertical movement
        this.x = 0;
        this.y = 0;
        // The starting position coordinates for the hero
        this.startX = this.xJump * 2;
        this.startY = (this.yJump * 5) - 20; // The subtracting 20 adds some padding for the hero
        this.x = this.startX;
        this.y = this.startY;
    }

    // Creating hero on the starting position
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    // Updating the hero's x and y position based on input
    // The if statements create the boundaries for the game stage
    handleInput(input) {
        switch(input) {
            case 'left':
                if (this.x > 0) {
                    this.x -= this.xJump;
                }
                break;
            case 'up':
                if (this.y > 0) {
                    this.y -= this.yJump;
                }
                break;
            case 'right':
                if (this.x < this.xJump * 4) {
                    this.x += this.xJump;
                }
                break;
            case 'down':
                if (this.y < this.yJump * 4) {
                    this.y += this.yJump;
                }
                break;
        }
    }
}

// Enemies our player must avoid
let Enemy = function(x, y, speed) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y + 60; // Centering the enemy to the tile
    this.speed = speed;
    this.xJump = 101;
    this.outOfBounds = this.xJump * 5;
    this.resetPosition = -this.xJump;
};

// Initialize the player and enemy objects
const player = new Hero(),
    bug1 = new Enemy(-101, 0, 200),
    bug2 = new Enemy(-101, 83, 85),
    bug3 = new Enemy((-101*3.5), 83, 350),
    bug4 = new Enemy((-101* 2.3), (83*2), 233),
    bug5 = new Enemy(-101, 0, 300),
    bug6 = new Enemy((-101*2), (83*2), 175),
    allEnemies = [];
allEnemies.push(bug1, bug2, bug3, bug4, bug5, bug6);

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // If enemy is not passed boundary
    if(this.x < this.outOfBounds) {
        // Move forward
        // Increment x by speed * dt (delta time)
        this.x += this.speed * dt;
    }
    else {
        // Reset position to start
        this.x = this.resetPosition;
    }
        
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
