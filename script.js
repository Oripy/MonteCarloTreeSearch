var game;
var state;
var mc;

window.onload = function() {
  game = new Game()
  state = game.start()
  game.init();
  game.show(state);
  var last_move = null;
  
  if (!!window.Worker) {
    mc = new Worker("montecarlo.js");
    mc.postMessage(["load", document.getElementById("title").innerHTML]);
    mc.postMessage(["start", 1, 0]);
  } else {
    console.log("Web workers not available!")
  }

  get_players = function() {
    var players = ["Human", "Human"];
    if (document.getElementById("j1").checked) {
      players[0] = "Ai";
    }
    if (document.getElementById("j2").checked) {
      players[1] = "Ai";
    }
    return players;
  }

  show_winner = function(game, state) {
    var winner = game.winner(state);
    var result = "";
    if (winner != -1) {
      if (winner == 0) {
        result = "Egalité"
      } else {
        result = "J"+winner+" gagne";
      }
    }
    document.getElementById("result").innerHTML = result;
  }

  mc.onmessage = function(e) {
    state = game.next_state(state, e.data);
    game.show(state);
    show_winner(game, state);
  }
  
  play = function(move) {
    if (game.winner(state) != -1) {
      // reboot the game
      var first_player = Math.floor(Math.random()*2)+1;
      state = game.start(first_player);
      mc.postMessage(["start", first_player, 0]);
      game.show(state);
      show_winner(game, state);
    } else {
      if (typeof move === 'undefined') {
        // play a Ai move
        mc.postMessage("get");
        if (game.winner(state) === -1) {
          setTimeout(function() {
            if (get_players()[game.get_next_player(state)-1] != "Human") {
              play();
            }
          }, 2000);
        }
      } else {
        // play the given move
        move = game.get_move(state, move);
        if (move !== -1) {
          var new_state = game.next_state(state, move);
          if (new_state != -1) {
            last_move = move;
            state = new_state;
            mc.postMessage(move);
            game.show(state);
            show_winner(game, state);
            if (game.winner(state) === -1) {
              setTimeout(function() {
                if (get_players()[game.get_next_player(state)-1] != "Human") {
                  play();
                }
              }, 2000);
            }
          }
        }
      }
    }
  }

  for (var i = 0; i < game.board_length; i++) {
    document.getElementById(i).onmousedown = function() {
      if (get_players()[game.get_next_player(state)-1] == "Human") {
        play(parseInt(this.id));
      } else {
        play();
      }
    }
  }
}
