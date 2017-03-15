var Game = function() {
                         //no player, player1, player2
  this.display_values = ['<circle cx="50" cy="50" r="40" fill="White" />',
                         '<circle cx="50" cy="50" r="40" fill="Red" />',
                         '<circle cx="50" cy="50" r="40" fill="Yellow" />',];
  this.board_length = 7*6;
  this.width = 7;
  this.height = 6;

  this.show = function(state) {
    for (var i = 0; i < state.length-1; i++) {
      document.getElementById(i.toString()).innerHTML = '<svg width="100" height="100"><rect x="0" y="0" width="100" height="100" fill="Blue" />'+this.display_values[state[i]]+'</svg>';
    }
  }

  this.show_debug = function(state) {
    console.log(state);
  }

  this.start = function() {
    var first_player = (typeof first_player !== 'undefined') ? first_player : 2;
    return [0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            first_player];
  }

  this.get_move = function(state, move) {
    if (move < 0) {
      return -1;
    }
    var j = move%this.width;
    var index = -1;
    var realmove = -1;
    for (var i = this.height-1; i >= 0; i--) {
      index = i*this.width+j;
      if (state[index] == 0) {
        return index;
      }
    }
    if (realmove == -1) {
      return -1;
    }
  }

  this.get_next_player = function(state) {
    return state[state.length-1]%2+1;
  }

  this.get_current_player = function(state) {
    return state[state.length-1];
  }

  this.next_state = function(state, move) {
    var new_state = [];
    var realmove = this.get_move(state, move);
    if (realmove == -1) {
      return -1;
    }

    // copy state
    var i = state.length;
    while (i--) new_state[i] = state[i];
    // new_state = state.slice();

    // record the move
    new_state[realmove] = this.get_next_player(state);
    // change the player recorded to have played the move
    new_state[state.length-1] = this.get_next_player(state);

    return new_state;
  }

  this.legal_plays = function(state) {
    var legals = [];
    // test legal plays only if there is no winner at this stage
    if (this.winner(state) == -1) {
      for (var j = 0; j < this.width; j++) {
        for (var i = this.height-1; i >= 0; i--) {
          if (state[i*this.width+j] == 0) {
            legals.push(i*this.width+j);
            break;
          }
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

    // test horizontal win
    for (var i = 0; i < this.height; i++) {
      for (var j = 0; j < this.width-3; j++) {
        if ((state[i*this.width+j] != 0) &&
            (state[i*this.width+j] == state[i*this.width+j+1]) &&
            (state[i*this.width+j] == state[i*this.width+j+2]) &&
            (state[i*this.width+j] == state[i*this.width+j+3])) {
              winner = this.get_current_player(state);
            }
      }
    }

    // test vertical win
    for (var j = 0; j < this.width; j++) {
      for (var i = 0; i < this.height-3; i++) {
        if ((state[i*this.width+j] != 0) &&
            (state[i*this.width+j] == state[(i+1)*this.width+j]) &&
            (state[i*this.width+j] == state[(i+2)*this.width+j]) &&
            (state[i*this.width+j] == state[(i+3)*this.width+j])) {
              winner = this.get_current_player(state);
            }
      }
    }

    // test / win
    for (var j = 3; j < this.width; j++) {
      for (var i = 0; i < this.height-3; i++) {
        if ((state[i*this.width+j] != 0) &&
            (state[i*this.width+j] == state[(i+1)*this.width+j-1]) &&
            (state[i*this.width+j] == state[(i+2)*this.width+j-2]) &&
            (state[i*this.width+j] == state[(i+3)*this.width+j-3])) {
              winner = this.get_current_player(state);
            }
      }
    }

    // test \ win
    for (var j = 0; j < this.width-3; j++) {
      for (var i = 0; i < this.height-3; i++) {
        if ((state[i*this.width+j] != 0) &&
            (state[i*this.width+j] == state[(i+1)*this.width+j+1]) &&
            (state[i*this.width+j] == state[(i+2)*this.width+j+2]) &&
            (state[i*this.width+j] == state[(i+3)*this.width+j+3])) {
              winner = this.get_current_player(state);
            }
      }
    }
    return winner;
  }
}
