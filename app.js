const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1440;
canvas.height = 900;

c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 1;

const player = new Character({
    position: {
        x: 0,
        y: 400,
    },
    velocity: {
        x: 0,
        y: 8,
    },
    color: "red",
    imgSrc: "assets/Medieval Warrior Pack 2/Sprites/Idle.png",
    framesMax: 8,
    scale: 3,
    offset: {
        x: 185,
        y: 161.5,
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
        x: 340,
        y: 730,
    },
    height: 50,
    width: 1100,
    color: "blue",
});

const platform2 = new Sprite({
    position: {
        x: 950,
        y: 600,
    },
    height: 50,
    width: 150,
    color: "blue",
});

const platform3 = new Sprite({
    position: {
        x: 700,
        y: 500,
    },
    height: 50,
    width: 150,
    color: "blue",
});

const platform4 = new Sprite({
    position: {
        x: 500,
        y: 400,
    },
    height: 50,
    width: 150,
    color: "blue",
});

const platform5 = new Sprite({
    position: {
        x: 700,
        y: 300,
    },
    height: 50,
    width: 150,
    color: "blue",
});

const platform6 = new Sprite({
    position: {
        x: 400,
        y: 200,
    },
    height: 50,
    width: 150,
    color: "transparent",
});

const platform7 = new Sprite({
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
    player.gravity();
    platform1.update();
    platform2.update();
    platform3.update();
    platform4.update();
    platform5.update();
    platform6.update();
    platform7.update();
    player.update();

    player.velocity.x = 0;

    // player movement

    if (keys.a.pressed && player.lastKey === "a") {
        player.velocity.x = -8;
        player.switchSprite("runLeft")
    } else if (keys.d.pressed && player.lastKey === "d") {
        player.velocity.x = 8;
        player.switchSprite("runRight")
    } else {
        if (player.lastKey === "a") {
            player.switchSprite("idleLeft")
        } else if (player.lastKey === "d") {
            player.switchSprite("idleRight")
        }   
    }

    if (player.velocity.y < 0) {
        if (player.lastKey === "a"){
            player.switchSprite("jumpLeft")
        } else if (player.lastKey === "d") {
            player.switchSprite("jumpRight")
        }
    } else if (player.velocity.y > 0) {
        if (player.lastKey === "a"){
            player.switchSprite("fallLeft")
        } else if (player.lastKey === "d") {
            player.switchSprite("fallRight")
        }
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
