var Game = function() {
                       //no player, player1, player2
  this.display_values = [];
  this.board_length = 0;

  this.show = function(state) {
    //  document.getElementById(i.toString()).innerHTML = this.display_values[state[i]];
  }

  this.start = function(first_player) {
    var first_player = (typeof first_player !== 'undefined') ? first_player : 2;
    return [ // table goes here
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

    // logic goes here

    // change the player recorded to have played the move
    new_state[state.length-1] = this.get_next_player(state);
    return new_state;
  }

  this.legal_plays = function(state) {
    var legals = [];

    // test legal plays only if there is no winner at this stage
    if (this.winner(state) == -1) {

      // logic goes here

    }
    return legals;
  }

  this.winner = function(state) {
    var winner = -1;

    // logic goes here
    return winner;
  }
}
