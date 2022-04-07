class Sprite {
    constructor({ position, height, width, color }) {
        this.position = position;
        this.height = height;
        this.width = width;
        this.color = color;
    }

    draw() {
        c.fillStyle = this.color;
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    collision() {
        if (
            player.isFalling &&
            player.position.y + player.height >= this.position.y &&
            player.position.y + player.height <= this.position.y + this.height / 1.6 &&
            ((player.position.x + player.width >= this.position.x &&
                player.position.x + player.width <= this.position.x + this.height) ||
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
        if (player.position.x < 250 && player.position.y + player.height <= 150) {
            document.querySelector("p").innerText = "VICTORY";
        }
    }

    update() {
        this.draw();
        this.collision();
    }
}

class Character {
    constructor({ position, velocity, color }) {
        this.position = position;
        this.velocity = velocity;
        this.height = 100;
        this.width = 50;
        this.lastKey;
        this.isFalling = false;
        this.color = color;
    }

    draw() {
        c.fillStyle = this.color;
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    gravity() {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        if (this.velocity.y < 0) {
            this.isFalling = false;
        }
        if (this.position.y + this.height != canvas.height && this.velocity.y > 0) {
            this.isFalling = true;
        }

        if (this.position.y + this.height >= canvas.height) {
            this.position.y = canvas.height - this.height;
            this.velocity.y = 0;
        } else {
            this.velocity.y += gravity;
        }
    }

    update() {
        this.draw();
    }
}
