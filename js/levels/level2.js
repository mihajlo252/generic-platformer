
function level2(player, platform1) {
    player.gravity();
    platform1.update();
    getPlatform(950, 700).update();
    getPlatform(800, 700).update();
    getPlatform(650, 700).update();
    getPlatform(500, 700).update();
    getPlatform(650, 450).update();
    invisPlatform(800, 500).update();
    getPlatform(650, 200).update();
    invisPlatform(500, 250).update();
    player.update();
}
