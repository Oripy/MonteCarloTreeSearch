var Game = function() {
                       //no player, player1, player2
  this.display_values = [" ",       "❌",    "⭕"];
  // ✗ ○
  this.board_length = 9;

  this.show = function(state) {
    for (var i = 0; i < state.length-1; i++) {
      document.getElementById(i.toString()).innerHTML = this.display_values[state[i]];
    }
  }

  this.get_move = function(state, move) {
    return move;
  }

  this.start = function(first_player) {
    var first_player = (typeof first_player !== 'undefined') ? first_player : 2;
    return [0, 0, 0,
            0, 0, 0,
            0, 0, 0,
            first_player];
  }

  this.get_next_player = function(state) {
    return state[state.length-1]%2+1;
  }

  this.get_current_player = function(state) {
    return state[state.length-1];
  }

  this.next_state = function(state, move) {
    var new_state = [];
    var legals = this.legal_plays(state);
    var found = false;
    for (var i = 0; i < legals.length; i++) {
      if (legals[i] === move) {
        found = true;
      }
    }
    if (!found) {
      return -1;
    }
    // copy state
    i = state.length;
    while (i--) new_state[i] = state[i];
    // new_state = state.slice();

    // record the move
    new_state[move] = this.get_next_player(state);
    // change the player recorded to have played the move
    new_state[state.length-1] = this.get_next_player(state);
    return new_state;
  }

  this.legal_plays = function(state) {
    var legals = [];

    // test legal plays only if there is no winner at this stage
    if (this.winner(state) == -1) {
      for (var i = 0; i < state.length; i++) {
        if (state[i] == 0) {
          legals.push(i);
        }
      }
    }
    return legals;
  }

  this.winner = function(state) {
    var winner = -1;

    var available = false;
    for (var i = 0; i < state.length; i++) {
      if (state[i] == 0) {
        available = true;
      }
    }
    if (!available) {
      // if no play available, default to draw
      winner = 0;
    }
    for (var i = 0; i < 3; i++) {
      if ((state[i] != 0) && (state[i] == state[i+3]) && (state[i] == state[i+6])) {
        winner = state[i];
      }
      if ((state[i*3] != 0) && (state[i*3] == state[i*3+1]) && (state[i*3] == state[i*3+2])) {
        winner = state[i*3];
      }
    }
    if ((state[0] != 0) && (state[0] == state[4]) && (state[0] == state[8])) {
      winner = state[0];
    }
    if ((state[2] != 0) && (state[2] == state[4]) && (state[2] == state[6])) {
      winner = state[2];
    }
    return winner;
  }
}
