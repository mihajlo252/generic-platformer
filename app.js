const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1440;
canvas.height = 900;

c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 1;

const player = new Character({
    position: {
        x: 0,
        y: 750,
    },
    velocity: {
        x: 0,
        y: 8,
    },
    color: "red",
});

var platform1 = new Sprite({
    position: {
        x: 340,
        y: 730,
    },
    height: 30,
    width: 1100,
    color: "blue",
});

var platform2 = new Sprite({
    position: {
        x: 950,
        y: 600,
    },
    height: 50,
    width: 150,
    color: "blue",
});

var platform3 = new Sprite({
    position: {
        x: 700,
        y: 500,
    },
    height: 50,
    width: 150,
    color: "blue",
});

var platform4 = new Sprite({
    position: {
        x: 500,
        y: 400,
    },
    height: 50,
    width: 150,
    color: "blue",
});

var platform5 = new Sprite({
    position: {
        x: 700,
        y: 300,
    },
    height: 50,
    width: 150,
    color: "blue",
});

var platform6 = new Sprite({
    position: {
        x: 400,
        y: 200,
    },
    height: 50,
    width: 150,
    color: "transparent",
});

var platform7 = new Sprite({
    position: {
        x: 150,
        y: 100,
    },
    height: 50,
    width: 150,
    color: "green",
});

const keys = {
    a: {
        pressed: false,
    },
    d: {
        pressed: false,
    },
    ArrowLeft: {
        pressed: false,
    },
    ArrowRight: {
        pressed: false,
    },
};

function animate() {
    window.requestAnimationFrame(animate);
    c.fillStyle = "black";
    c.fillRect(0, 0, canvas.width, canvas.height);
    player.update();
    platform1.update();
    platform2.update();
    platform3.update();
    platform4.update();
    platform5.update();
    platform6.update();
    platform7.update();

    player.velocity.x = 0;

    // player movement
    if (keys.a.pressed && player.lastKey === "a") {
        player.velocity.x = -8;
    } else if (keys.d.pressed && player.lastKey === "d") {
        player.velocity.x = 8;
    }
}

animate();

window.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "d":
            keys.d.pressed = true;
            player.lastKey = "d";
            break;
        case "a":
            keys.a.pressed = true;
            player.lastKey = "a";
            break;
        case "w":
            if (player.isFalling && player.velocity.y === 0) {
                player.velocity.y = -20;
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
