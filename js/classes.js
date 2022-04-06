class Sprite {
    constructor({ position, height, width }) {
        this.position = position;
        this.height = height;
        this.width = width;
    }

    draw() {
        c.fillStyle = "blue";
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        this.draw();

        if (
            player.isFalling &&
            player.position.y + player.height >= this.position.y &&
            player.position.y + player.height <= this.position.y + 15 &&
            ((player.position.x + player.width >= this.position.x &&
                player.position.x + player.width <= this.position.x + this.width) ||
                (player.position.x >= this.position.x &&
                    player.position.x <= this.position.x + this.width))
        ) {
            player.velocity.y = 0;
            player.position.y =
                player.position.y -
                (player.position.y - this.position.y) -
                player.height;
        }

        if (
            player.position.x + player.width >= this.position.x &&
            player.position.x + player.width <= this.position.x + 15 &&
            player.position.y < this.position.y + this.height &&
            player.position.y + player.height > this.position.y
        ) {
            player.velocity.x = 0;
            player.position.x =
                player.position.x -
                (player.position.x - this.position.x) -
                player.width;
        }

        if (
            player.position.x <= this.position.x + this.width &&
            player.position.x >= this.position.x + this.width - 15 &&
            player.position.y < this.position.y + this.height &&
            player.position.y + player.height > this.position.y
        ) {
            player.velocity.x = 0;
            player.position.x = this.position.x + this.width;
        }
    }
}

class Character {
    constructor({ position, velocity }) {
        this.position = position;
        this.velocity = velocity;
        this.height = 100;
        this.width = 50;
        this.lastKey;
        this.isFalling = false;
    }

    draw() {
        c.fillStyle = "red";
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        this.draw();

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        if (this.velocity.y < 0) {
            this.isFalling = false;
        }
        if (this.position.y + this.height != canvas.height && this.velocity.y > 0) {
            this.isFalling = true;
        }

        if (this.position.y + this.height >= canvas.height) {
            this.velocity.y = 0;
        } else {
            this.velocity.y += gravity;
        }
    }
}
