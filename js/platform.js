const getPlatform = (x, y) => {
  const smallPlatform = new Sprite({
    position: {
        x: x,
        y: y,
    },
    height: 50,
    width: 150,
    imgSrc: "assets/Background Pack/forest_tileset_lite/Sprites/Tile/Grass/grass_short.png",
    framesMax: 1,
    scale: 1,
  });
  return smallPlatform
}
const invisPlatform = (x, y) => {
  const invisPlatform = new Sprite({
    position: {
        x: x,
        y: y,
    },
    height: 50,
    width: 150,
    imgSrc: "",
    framesMax: 1,
    scale: 1,
  });
  return invisPlatform
}

const wall = (x) => {
  const wall = new Sprite({
    position: {
      x: x,
      y: 0,
    },
    height: 900,
    width: 50,
    imgSrc: "",
    framesMax: 1,
    scale: 1,
  })
  return wall
}
