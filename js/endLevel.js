function endLevel(player, platform1) {
  player.gravity();
  platform1.update();
  player.hitboxToggle();
  player.update();
}