class Img {
	constructor({ position, imgSrc, scale = 1, framesMax = 1, offset = { x: 0, y: 0 } }) {
		this.position = position;
		this.image = new Image();
		this.image.src = imgSrc;
		this.scale = scale;
		this.framesMax = framesMax;
		this.framesCurrent = 0;
		this.framesElapsed = 0;
		this.framesHold = 7;
		this.offset = offset;
	}

	draw() {
		c.drawImage(
			this.image,
			this.framesCurrent * (this.image.width / this.framesMax),
			0,
			this.image.width / this.framesMax,
			this.image.height,
			this.position.x - this.offset.x,
			this.position.y - this.offset.y,
			(this.image.width / this.framesMax) * this.scale,
			this.image.height * this.scale
		);
	}

	update() {
		this.draw();
		this.framesElapsed++;

		if (this.framesElapsed % this.framesHold === 0) {
			if (this.framesCurrent < this.framesMax - 1) {
				this.framesCurrent++;
			} else {
				this.framesCurrent = 0;
			}
		}
	}
}

class Sprite extends Img {
	constructor({ position, height, width, imgSrc, scale = 1, framesMax = 1, offset = { x: 0, y: 0 } }) {
		super({
			position,
			imgSrc,
			scale,
			framesMax,
			offset,
		});
		this.height = height * this.scale;
		this.width = width * this.scale;
		this.framesCurrent = 0;
		this.framesElapsed = 0;
		this.framesHold = 7;
	}

	async collision() {
		if (
			player.isFalling &&
			player.position.y + player.height >= this.position.y &&
			player.position.y + player.height <= this.position.y + this.height / 1.6 &&
			((player.position.x + player.width >= this.position.x &&
				player.position.x + player.width <= this.position.x + this.width) ||
				(player.position.x >= this.position.x && player.position.x <= this.position.x + this.width))
		) {
			player.velocity.y = 0;
			player.position.y = player.position.y - (player.position.y - this.position.y) - player.height;
		}

		if (
			player.position.x + player.width >= this.position.x &&
			player.position.x + player.width <= this.position.x + 15 &&
			player.position.y < this.position.y + this.height &&
			player.position.y + player.height > this.position.y
		) {
			player.velocity.x = 0;
			player.position.x = player.position.x - (player.position.x - this.position.x) - player.width;
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

		if (player.position.x < 250 && player.position.y + player.height <= 200) {
			document.querySelector("#goal-text").innerText = "Level 2!";
			document.querySelector(".ui").dataset.level = "level2";
		}

		if (player.position.x + player.width > 650 && player.position.y + player.height <= 200 && ui.dataset.level == "level2") {
            document.querySelector("#goal-text").innerText = "";
			ui.dataset.level = "end";
            if (ui.dataset.level === "end") {
                credits = await getHtmlFromFile("./components/credits.html");
                ui.insertAdjacentHTML("beforeend", credits);
            }
			
		}

		if (player.position.x < 250 && player.position.y + player.height >= 600 && ui.dataset.level !== "end") {
			document.querySelector("#controls").style.display = "block";
		} else document.querySelector("#controls").style.display = "none";
	}

	update() {
		this.draw();
		this.collision();
	}
}

class Character extends Img {
	constructor({ position, velocity, imgSrc, scale = 1, framesMax = 1, offset = { x: 0, y: 0 }, sprites }) {
		super({
			position,
			imgSrc,
			scale,
			framesMax,
			offset,
		});
		this.velocity = velocity;
		this.height = 41 * this.scale;
		this.width = 27 * this.scale;
		this.lastKey;
		this.isFalling = false;
		this.framesCurrent = 0;
		this.framesElapsed = 0;
		this.framesHold = 7;
		this.sprites = sprites;

		for (const sprite in this.sprites) {
			sprites[sprite].image = new Image();
			sprites[sprite].image.src = sprites[sprite].imgSrc;
		}
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

	switchSprite(sprite) {
		switch (sprite) {
			case "idleRight":
				if (this.image !== this.sprites.idleRight.image) {
					this.image = this.sprites.idleRight.image;
					this.framesMax = this.sprites.idleRight.framesMax;
				}
				break;
			case "idleLeft":
				if (this.image !== this.sprites.idleLeft.image) {
					this.image = this.sprites.idleLeft.image;
					this.framesMax = this.sprites.idleLeft.framesMax;
				}
				break;
			case "runRight":
				if (this.image !== this.sprites.runRight.image) {
					this.image = this.sprites.runRight.image;
					this.framesMax = this.sprites.runRight.framesMax;
				}
				break;
			case "runLeft":
				if (this.image !== this.sprites.runLeft.image) {
					this.image = this.sprites.runLeft.image;
					this.framesMax = this.sprites.runLeft.framesMax;
				}
				break;
			case "jumpRight":
				if (this.image !== this.sprites.jumpRight.image) {
					this.image = this.sprites.jumpRight.image;
					this.framesMax = this.sprites.jumpRight.framesMax;
					this.framesCurrent = 0;
				}
				break;
			case "jumpLeft":
				if (this.image !== this.sprites.jumpLeft.image) {
					this.image = this.sprites.jumpLeft.image;
					this.framesMax = this.sprites.jumpLeft.framesMax;
					this.framesCurrent = 0;
				}
				break;
			case "fallRight":
				if (this.image !== this.sprites.fallRight.image) {
					this.image = this.sprites.fallRight.image;
					this.framesMax = this.sprites.fallRight.framesMax;
					this.framesCurrent = 0;
				}
				break;
			case "fallLeft":
				if (this.image !== this.sprites.fallLeft.image) {
					this.image = this.sprites.fallLeft.image;
					this.framesMax = this.sprites.fallLeft.framesMax;
					this.framesCurrent = 0;
				}
				break;
		}
	}

	hitboxToggle() {
		if (hitbox) {
			c.fillStyle = "red";
			c.fillRect(this.position.x, this.position.y, this.width, this.height);
		}
	}
}
