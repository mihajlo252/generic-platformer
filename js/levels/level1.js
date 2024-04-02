function level1(player, platform1) {
    player.gravity();
    platform1.update();
    getPlatform(950, 700).update();
    getPlatform(700, 600).update();
    getPlatform(500, 500).update();
    getPlatform(700, 400).update();
    getPlatform(400, 300).update();
    getPlatform(200, 200).update();
    player.update();
}