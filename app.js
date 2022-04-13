const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
let hitbox = 0;

canvas.width = 1440;
canvas.height = 900;

c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 1;

const background = new Sprite({
    position: {
        x: 0,
        y: 0,
    },
    imgSrc: "assets/Background Pack/forest_tileset_lite/Sprites/Background/background_1.png",
    framesMax: 1,
    scale: 1,
});

const player = new Character({
    position: {
        x: 200,
        y: 400,
    },
    velocity: {
        x: 0,
        y: 8,
    },
    imgSrc: "assets/Medieval Warrior Pack 2/Sprites/Idle.png",
    framesMax: 8,
    scale: 2.4,
    offset: {
        x: 148,
        y: 129,
    },
    sprites: {
        idleRight: {
            imgSrc: "assets/Medieval Warrior Pack 2/Sprites/Idle_right.png",
            framesMax: 8,
        },
        idleLeft: {
            imgSrc: "assets/Medieval Warrior Pack 2/Sprites/Idle_left.png",
            framesMax: 8,
        },
        runRight: {
            imgSrc: "assets/Medieval Warrior Pack 2/Sprites/Run_right.png",
            framesMax: 8,
        },
        runLeft: {
            imgSrc: "assets/Medieval Warrior Pack 2/Sprites/Run_left.png",
            framesMax: 8,
        },
        jumpRight: {
            imgSrc: "assets/Medieval Warrior Pack 2/Sprites/Jump_right.png",
            framesMax: 2,
        },
        jumpLeft: {
            imgSrc: "assets/Medieval Warrior Pack 2/Sprites/Jump_left.png",
            framesMax: 2,
        },
        fallRight: {
            imgSrc: "assets/Medieval Warrior Pack 2/Sprites/Fall_right.png",
            framesMax: 2,
        },
        fallLeft: {
            imgSrc: "assets/Medieval Warrior Pack 2/Sprites/Fall_left.png",
            framesMax: 2,
        },
    },
});

const platform1 = new Sprite({
    position: {
        x: 0,
        y: 850,
    },
    height: 50,
    width: 1440,
    imgSrc: "assets/Background Pack/forest_tileset_lite/Sprites/Tile/Grass/grass_long.png",
    framesMax: 1,
    scale: 1,
});

const platform2 = new Sprite({
    position: {
        x: 950,
        y: 700,
    },
    height: 50,
    width: 150,
    imgSrc: "assets/Background Pack/forest_tileset_lite/Sprites/Tile/Grass/grass_short.png",
    framesMax: 1,
    scale: 1,
});

const platform3 = new Sprite({
    position: {
        x: 700,
        y: 600,
    },
    height: 50,
    width: 150,
    imgSrc: "assets/Background Pack/forest_tileset_lite/Sprites/Tile/Grass/grass_short.png",
    framesMax: 1,
    scale: 1,
});

const platform4 = new Sprite({
    position: {
        x: 500,
        y: 500,
    },
    height: 50,
    width: 150,
    imgSrc: "assets/Background Pack/forest_tileset_lite/Sprites/Tile/Grass/grass_short.png",
    framesMax: 1,
    scale: 1,
});

const platform5 = new Sprite({
    position: {
        x: 700,
        y: 400,
    },
    height: 50,
    width: 150,
    imgSrc: "assets/Background Pack/forest_tileset_lite/Sprites/Tile/Grass/grass_short.png",
    framesMax: 1,
    scale: 1,
});

const platform6 = new Sprite({
    position: {
        x: 400,
        y: 300,
    },
    height: 50,
    width: 150,
    imgSrc: "assets/Background Pack/forest_tileset_lite/Sprites/Tile/Grass/grass_short.png",
    framesMax: 1,
    scale: 1,
});

const platform7 = new Sprite({
    position: {
        x: 150,
        y: 200,
    },
    height: 50,
    width: 150,
    imgSrc: "assets/Background Pack/forest_tileset_lite/Sprites/Tile/Grass/grass_short.png",
    framesMax: 1,
    scale: 1,
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
    background.update();
    c.fillStyle = "rgba(255, 255, 255, 0.2)";
    c.fillRect(0, 0, canvas.width, canvas.height);
    player.gravity();
    platform1.update();
    platform2.update();
    platform3.update();
    platform4.update();
    platform5.update();
    platform6.update();
    platform7.update();
    player.hitboxToggle();
    player.update();

    player.velocity.x = 0;

    // player movement

    if (keys.a.pressed && player.lastKey === "a") {
        player.velocity.x = -8;
        player.switchSprite("runLeft");
    } else if (keys.d.pressed && player.lastKey === "d") {
        player.velocity.x = 8;
        player.switchSprite("runRight");
    } else {
        if (player.lastKey === "a") {
            player.switchSprite("idleLeft");
        } else if (player.lastKey === "d") {
            player.switchSprite("idleRight");
        }
    }

    if (player.velocity.y < 0) {
        if (player.lastKey === "a") {
            player.switchSprite("jumpLeft");
        } else if (player.lastKey === "d") {
            player.switchSprite("jumpRight");
        }
    } else if (player.velocity.y > 0) {
        if (player.lastKey === "a") {
            player.switchSprite("fallLeft");
        } else if (player.lastKey === "d") {
            player.switchSprite("fallRight");
        }
    }
}

animate();
const buttonA = document.querySelector("#buttonA");
const buttonD = document.querySelector("#buttonD");
const buttonW = document.querySelector("#buttonW");

window.addEventListener("load", () => {
    player.lastKey = "d";
});

buttonA.addEventListener("touchstart", () => {
    window.dispatchEvent(
        new KeyboardEvent("keydown", {
            key: "a",
        })
    );
});
buttonA.addEventListener("touchend", () => {
    window.dispatchEvent(
        new KeyboardEvent("keyup", {
            key: "a",
        })
    );
});
buttonD.addEventListener("touchstart", () => {
    window.dispatchEvent(
        new KeyboardEvent("keydown", {
            key: "d",
        })
    );
});
buttonD.addEventListener("touchend", () => {
    window.dispatchEvent(
        new KeyboardEvent("keyup", {
            key: "d",
        })
    );
});
buttonW.addEventListener("touchstart", () => {
    window.dispatchEvent(
        new KeyboardEvent("keydown", {
            key: "w",
        })
    );
});
buttonW.addEventListener("touchend", () => {
    window.dispatchEvent(
        new KeyboardEvent("keyup", {
            key: "w",
        })
    );
});

window.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "d":
            keys.d.pressed = true;
            player.lastKey = "d";
            console.log(player.lastKey);
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
