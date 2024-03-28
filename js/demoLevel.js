function demoLevel(player, platform1, platform2, platform3, platform4, platform5, platform6, platform7) {
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