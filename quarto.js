var Game = function() {
  // 0=black, 1=chocolate
  // 0=plain, 1=hole
  // 0=circle, 1=square
  // 0=big, 1=small
  this.display_values = { "empty": " ",
                          "0000": '<circle cx="50" cy="50" r="40" fill="black" />',
                          "1000": '<circle cx="50" cy="50" r="40" fill="chocolate" />',
                          "0100": '<circle cx="50" cy="50" r="40" fill="black" /><circle cx="50" cy="50" r="20" fill="lightgrey" />',
                          "1100": '<circle cx="50" cy="50" r="40" fill="chocolate" /><circle cx="50" cy="50" r="20" fill="lightgrey" />',
                          "0010": '<rect x="10" y="10" width="80" height="80" fill="black" />',
                          "1010": '<rect x="10" y="10" width="80" height="80" fill="chocolate" />',
                          "0110": '<rect x="10" y="10" width="80" height="80" fill="black" /><circle cx="50" cy="50" r="20" fill="lightgrey" />',
                          "1110": '<rect x="10" y="10" width="80" height="80" fill="chocolate" /><circle cx="50" cy="50" r="20" fill="lightgrey" />',
                          "0001": '<circle cx="50" cy="50" r="30" fill="black" />',
                          "1001": '<circle cx="50" cy="50" r="30" fill="chocolate" />',
                          "0101": '<circle cx="50" cy="50" r="30" fill="black" /><circle cx="50" cy="50" r="20" fill="lightgrey" />',
                          "1101": '<circle cx="50" cy="50" r="30" fill="chocolate" /><circle cx="50" cy="50" r="20" fill="lightgrey" />',
                          "0011": '<rect x="20" y="20" width="60" height="60" fill="black" />',
                          "1011": '<rect x="20" y="20" width="60" height="60" fill="chocolate" />',
                          "0111": '<rect x="20" y="20" width="60" height="60" fill="black" /><circle cx="50" cy="50" r="20" fill="lightgrey" />',
                          "1111": '<rect x="20" y="20" width="60" height="60" fill="chocolate" /><circle cx="50" cy="50" r="20" fill="lightgrey" />' };

  this.default_list = ["0000", "1000", "0100", "1100",
                       "0010", "1010", "0110", "1110",
                       "0001", "1001", "0101", "1101",
                       "0011", "1011", "0111", "1111"];
  this.board_length = 16;

  this.show = function(state) {
    for (var i = 0; i < this.board_length; i++) {
      document.getElementById(i.toString()).innerHTML = '<svg version="1.1" baseProfile="full" width="100" height="100" xmlns="http://www.w3.org/2000/svg">'+this.display_values[state[i]]+'</svg>';
    }
    var available = this.list_available(state);
    for (var i = 0; i < this.board_length; i++) {
      var elem = document.getElementById("p"+i.toString());
      elem.className = "piece";
      if (this.default_list[i] === state[this.board_length]) {
        elem.className = "selected";
      }
      var piece_available = false;
      for (var j = 0; j < available.length; j++) {
        if (available[j] === this.default_list[i]) {
          piece_available = true;
        }
      }
      if (piece_available || this.default_list[i] === state[this.board_length]) {
        elem.innerHTML = '<svg version="1.1" baseProfile="full" width="100" height="100" xmlns="http://www.w3.org/2000/svg">'+this.display_values[this.default_list[i]]+'</svg>';
      } else {
        elem.innerHTML = this.display_values["empty"];
      }
    }
  }

  this.show_debug = function(state) {
    console.log(state);
  }

  this.get_move = function(state, move) {
    return move;
  }

  this.start = function(first_player) {
    var first_player = (typeof first_player !== 'undefined') ? first_player : 2;
    return [0, 0, 0, 0,
            0, 0, 0, 0,
            0, 0, 0, 0,
            0, 0, 0, 0,
            "0000",
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
    // copy state
    i = state.length;
    while (i--) new_state[i] = state[i];
    // new_state = state.slice();

    // record the move
    new_state[move[0]] = state[this.board_length];
    //update next piece
    new_state[this.board_length] = move[1];

    // change the player recorded to have played the move
    new_state[state.length-1] = this.get_next_player(state);

    return new_state;
  }

  this.list_available = function(state) {
    var list = [];
    for (var i = 0; i < this.board_length; i++) {
      var value = this.default_list[i];
      var go = true;
      for (var j = 0; j < this.board_length; j++) {
        if ((state[j] === value) || (state[this.board_length] === value)) {
          go = false;
        }
      }
      if (go) {
        list.push(value);
      }
    }
    return list;
  }

  this.legal_plays = function(state) {
    var legals = [];
    var available = this.list_available(state);
    // test legal plays only if there is no winner at this stage
    if (this.winner(state) == -1) {
      if (available.length != 0) {
        for (var i = 0; i < this.board_length; i++) {
          if (state[i] === 0) {
            for (var j = 0; j < available.length; j++) {
              legals.push([i, available[j]]);
            }
          }
        }
      } else {
        for (var i = 0; i < this.board_length; i++) {
          if (state[i] === 0) {
            legals.push([i, 0]);
          }
        }
      }
    }
    return legals;
  }

  this.winner = function(state) {
    var winner = -1;

    var available = false;
    for (var i = 0; i < this.board_length; i++) {
      if (state[i] === 0) {
        available = true;
        break;
      }
    }
    if (!available) {
      // if no play available, default to draw
      winner = 0;
    }
    // test horizontal win
    for (var i = 0; i < 4; i++) {
      if ((typeof state[i*4] === "string") &&
          (typeof state[i*4+1] === "string") &&
          (typeof state[i*4+2] === "string") &&
          (typeof state[i*4+3] === "string")) {
        for (var j = 0; j < 4; j++) {
          if ((state[i*4].charAt(j) === state[i*4+1].charAt(j)) &&
              (state[i*4].charAt(j) === state[i*4+2].charAt(j)) &&
              (state[i*4].charAt(j) === state[i*4+3].charAt(j))) {
            winner = this.get_current_player(state);
          }
        }
      }
    }
    // test vertical win
    for (var i = 0; i < 4; i++) {
      if ((typeof state[i] === "string") &&
          (typeof state[i+4] === "string") &&
          (typeof state[i+8] === "string") &&
          (typeof state[i+12] === "string")) {
        for (var j = 0; j < 4; j++) {
          if ((state[i].charAt(j) === state[i+4].charAt(j)) &&
              (state[i].charAt(j) === state[i+8].charAt(j)) &&
              (state[i].charAt(j) === state[i+12].charAt(j))) {
            winner = this.get_current_player(state);
          }
        }
      }
    }
    // test \ win
    if ((typeof state[0] === "string") &&
        (typeof state[5] === "string") &&
        (typeof state[10] === "string") &&
        (typeof state[15] === "string")) {
      for (var j = 0; j < 4; j++) {
        if ((state[0].charAt(j) === state[5].charAt(j)) &&
            (state[0].charAt(j) === state[10].charAt(j)) &&
            (state[0].charAt(j) === state[15].charAt(j))) {
          winner = this.get_current_player(state);
        }
      }
    }
    // test / win
    if ((typeof state[3] === "string") &&
        (typeof state[6] === "string") &&
        (typeof state[9] === "string") &&
        (typeof state[12] === "string")) {
      for (var j = 0; j < 4; j++) {
        if ((state[3].charAt(j) === state[6].charAt(j)) &&
            (state[3].charAt(j) === state[9].charAt(j)) &&
            (state[3].charAt(j) === state[12].charAt(j))) {
          winner = this.get_current_player(state);
        }
      }
    }
    return winner;
  }
}
