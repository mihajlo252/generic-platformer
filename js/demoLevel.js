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


function demoLevel(player, platform1) {
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
}