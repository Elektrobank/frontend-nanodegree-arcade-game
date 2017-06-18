// Enemies our player must avoid
var Enemy = function (x, y) {
    this.xStart = x;
    this.yStart = y;
    this.x = x;
    this.y = y;
    this.sprite = 'images/enemy-bug.png';
    this.velocity = Math.random() * (500 - 50) + 50;  
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += dt * this.velocity;
    if (this.x > 500) {
        this.x = 0;
    };
    //check for collision
    for (var i = 0; i < allEnemies.length; i++) {
        allEnemies[i].checkForCollision(i);
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function () {
    this.x = 200;
    this.y = 400;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function (d) {
    this.x;
    this.y;
};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.resetPlayer = function () {
    this.x = 200;
    this.y = 400;
    this.update();
};

//detect collision
Enemy.prototype.checkForCollision = function(i) {
    if (this.x < player.x + 70 && this.x + 50 > player.x && this.y < player.y + 70 && 50 + this.y > player.y) {
        alert("OUCH! The bug got you!");
        player.resetPlayer();
    }
};


//handles arrow input to move charachter
Player.prototype.handleInput = (function (key, x, y) {
    var moveX, moveY;
    switch (key) {
        case 'left':
            moveX = -50;
            moveY = 0;
            break;
        case 'up':           
            moveX = 0;
            moveY = -50;
            break;
        case 'right':
            moveX = 50;
            moveY = 0;
            break;
        case 'down':
            moveX = 0;
            moveY = 50;
            break;
        default:
            moveX = 0;
            moveY = 0;          
    }

    this.x += moveX;
    this.y += moveY;

    //Confine player to grid
    if (this.x < 0) {
        this.x = 0;
    }

    if (this.x > 400) {
        this.x = 400;
    }
    //player wins, reset starting position
    if (this.y <= 0) {
        alert("Great job! You MADE IT! Play again?");
        this.x = 200;
        this.y = 400;
        
    }

    if (this.y > 400) {
        this.y = 400;
    }

});

    // Now instantiate your objects.
    // Place all enemy objects in an array called allEnemies
    var allEnemies = [
        new Enemy(0, 65),
        new Enemy(0, 140),
        new Enemy(0, 225),
    ];


    // Place the player object in a variable called player
    var player = new Player();


    // This listens for key presses and sends the keys to your
    // Player.handleInput() method. You don't need to modify this.
    document.addEventListener('keyup', function (e) {
        var allowedKeys = {
            37: 'left',
            38: 'up',
            39: 'right',
            40: 'down'
        };

        player.handleInput(allowedKeys[e.keyCode]);
    });
