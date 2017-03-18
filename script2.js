var game;
var state;

window.onload = function() {
  game = new Game();
  state = game.start();
  game.init();
  game.show(state);
}