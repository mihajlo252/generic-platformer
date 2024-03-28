const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

const socket = new WebSocket("ws://localhost:8080/ws");

const character_id = "player" + Math.floor(Math.random() * 1000);

const handleMove = () => {
	const character = {
		character_id: character_id,
		x: player.position.x,
		y: player.position.y,
	};

	socket.send(JSON.stringify(character));
};

socket.onmessage = (event) => {
	const data = JSON.parse(event.data);
	console.log(data);
	player.position.x = data.x;
	player.position.y = data.y;
};

canvas.width = 1440;
canvas.height = 900;

c.fillRect(0, 0, canvas.width, canvas.height);

var gravity = 1;

class Sprite {
	constructor({ position, velocity }) {
		this.position = position;
		this.velocity = velocity;
		this.height = 100;
		this.width = 50;
	}

	draw() {
		c.fillStyle = "red";
		c.fillRect(this.position.x, this.position.y, this.width, this.height);
	}

	update() {
		this.draw();

		this.position.x += this.velocity.x;
		this.position.y += this.velocity.y;
		if (this.velocity.y > 0) {
			if (this.position.y + this.height === canvas.height) {
				gravity = 0;
				this.velocity.y = 0;
			}
		}

		if (this.position.y + this.height + this.velocity.y >= canvas.height) {
			this.velocity.y = 0;
		} else this.velocity.y += gravity;
	}
}

const player = new Sprite({
	position: {
		x: 0,
		y: 0,
	},
	velocity: {
		x: 0,
		y: 8,
	},
});

// const enemy = new Sprite({
//     position: {
//         x: 400,
//         y: 0,
//     },
//     velocity: {
//         x: 0,
//         y: 8,
//     },
// });

console.log(player);

const keys = {
	a: {
		pressed: false,
	},
	d: {
		pressed: false,
	},
};

let lastKey;

let frameRate = 1000 / 90;

function animate() {
	setTimeout(() => {
		window.requestAnimationFrame(animate);
	}, frameRate);
	c.fillStyle = "black";
	c.fillRect(0, 0, canvas.width, canvas.height);
	player.update();
	// enemy.update();

	player.velocity.x = 0;

	if (keys.a.pressed && lastKey === "a") {
		player.velocity.x = -8;
		handleMove();
	} else if (keys.d.pressed && lastKey === "d") {
		player.velocity.x = 8;
		handleMove();
	}
    if (
        player.position.y + player.height >= canvas.height
    ) {
        handleMove()
    }
}

animate();

window.addEventListener("keydown", (event) => {
	if (player.position.x >= 968) {
		document.querySelector("p").innerText = "VICTORY";
	}
	switch (event.key) {
		case "d":
			lastKey = "d";
			keys.d.pressed = true;
			break;
		case "a":
			keys.a.pressed = true;
			lastKey = "a";
			break;
		case "w":
			if (
				player.position.y + player.height >= canvas.height ||
				player.position.y + player.height === canvas.height - player.height
			) {
				gravity = 1;
				player.velocity.y = -22;
			}

			break;
	}
});

window.addEventListener("keyup", (event) => {
	switch (event.key) {
		case "d":
			keys.d.pressed = false;
			break;
		case "a":
			keys.a.pressed = false;
			break;
	}
});
