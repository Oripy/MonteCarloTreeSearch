window.onload = function() {
  var players = ["Human", "Ai 2"];
  var game = new Game();
  var state = game.start();
  game.show(state);
  var last_move = null;

  if (!["Tic Tac Toe", "Connect Four", "Quarto"].includes(document.getElementById("title").innerHTML)) {
    console.log("Game not detected");
    return;
  }
  if (document.getElementById("title").innerHTML == "Connect Four") {
    for (var a = 0; a < state.length-1; a++) {
      document.getElementById(a.toString()).onmouseover = function() {
        var index = parseInt(this.id);
        var x = index%game.width;
        var y = (index-x)/game.width;
        for (var j = 0; j < game.width; j++) {
          for (var i = 0; i < game.height; i++) {
            index = i*game.width+j;
            if (j == x) {
              document.getElementById(index).className = "highlight";
            } else {
              document.getElementById(index).className = "none";
            }
          }
        }
      }
    }
  }

  var mc = new MonteCarlo(game, state);

  for (var i = 0; i < game.board_length; i++) {
    document.getElementById(i.toString()).onmousedown = function() {
      if (game.winner(state) != -1) {
        state = game.start(Math.floor(Math.random()*2)+1);
        mc = new MonteCarlo(game, state);
        document.getElementById("result").innerHTML = "";
      } else {
        launch = setInterval(function(move) {
          if (players[game.get_next_player(state)-1] == "Human") {
            var new_state = game.next_state(state, move);
            if (new_state != -1) {
              last_move = move;
              state = new_state;
              mc.set_root(state, last_move);
            }
          } else {
            last_move = mc.next();
            state = game.next_state(state, last_move);
            mc.set_root(state, last_move);
          }
          var winner = game.winner(state);
          if (winner != -1) {
            if (winner == 0) {
              var result = "Egalité"
            } else {
              var result = players[winner-1]+" gagne";
            }
            document.getElementById("result").innerHTML = result;
          }
          game.show(state);
          if (game.winner(state) != -1 || players[game.get_next_player(state)-1] == "Human") {
            clearInterval(launch);
          }
        }, 100, parseInt(this.id));
      }
    }
  }
}
