var players = ["Ai", "Ai"];
var game;
var state;

window.onload = function() {
  game = new Game()
  state = game.start()
  game.init();
  game.show(state);
  var last_move = null;

  show_winner = function(game, state) {
    var winner = game.winner(state);
    if (winner != -1) {
      if (winner == 0) {
        var result = "Egalité"
      } else {
        var result = players[winner-1]+" gagne";
      }
      document.getElementById("result").innerHTML = result;
    }
  }

  if (!["Tic Tac Toe", "Connect Four", "Quarto"].includes(document.getElementById("title").innerHTML)) {
    console.log("Game not detected");
    return;
  }

  var mc = new MonteCarlo(game, state);
  var simul = mc.start();

  for (var i = 0; i < game.board_length; i++) {
    document.getElementById(i).onmousedown = function() {
      if (game.winner(state) != -1) {
        state = game.start(Math.floor(Math.random()*2)+1);
        clearInterval(simul);
        mc = new MonteCarlo(game, state);
        simul = mc.start();
        document.getElementById("result").innerHTML = "";
      } else {
        if (players[game.get_next_player(state)-1] == "Human") {
          move = game.get_move(state, parseInt(this.id));
          if (move !== -1) {
          var new_state = game.next_state(state, move);
            if (new_state != -1) {
              last_move = move;
              state = new_state;
              mc.set_root(state, last_move);
              game.show(state);
              show_winner(game, state);
              if (game.winner(state) === -1) {
                setTimeout(function() {
                  if (players[game.get_next_player(state)-1] != "Human") {
                    last_move = mc.next();
                    state = game.next_state(state, last_move);
                    mc.set_root(state, last_move);
                    game.show(state);
                    show_winner(game, state);
                  }
                }, 2000);
              }
            }
          }
        } else {
          last_move = mc.next();
          state = game.next_state(state, last_move);
          mc.set_root(state, last_move);
          game.show(state);
          show_winner(game, state);
        }
      }
    }
  }
}
