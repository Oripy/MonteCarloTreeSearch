shuffle = function(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

var Node = function(move, parent_node, game, depth) {
  this.move = move;
  this.parent_node = parent_node;
  this.game = game;
  this.state = null;
  this.children = null;
  this.player = null;
  this.wins = 0;
  this.visits = 0;
  this.depth = depth;
  this.terminal = false;
  this.value = 0;
  this.winner = null;

  this.proven_win = false;
  this.proven_loss = false;
}

Node.prototype.get_state = function() {
  if (this.state == null) {
    this.state = this.game.next_state(this.parent_node.state, this.move);
  }
  return this.state;
}

Node.prototype.get_player = function() {
  if ((this.state == null) && (this.player == null)) {
    this.player = this.game.get_next_player(this.get_state());
  } else if (this.player == null) {
    this.player = this.get_state()[this.get_state().length-1];
  }
  return this.player;
}

Node.prototype.get_opponent = function() {
  return this.get_player()%2+1;
}

Node.prototype.get_children = function() {
  var self = this;
  if (this.children == null) {
    var moves = this.game.legal_plays(this.get_state());
    this.children = moves.map(function(move) { return new Node(move, self, self.game, self.depth+1)});
  }
  if ((!this.terminal) && (this.children.length == 0)) {
    this.terminal = true;
    var current_node = this;
    var all_terminal = true;
    do {
      var all_terminal = true;
      if (current_node.parent_node != undefined) {
        var siblings = current_node.parent_node.get_children();
        for (var i = 0; i < siblings.length; i++) {
          if (!siblings[i].terminal) {
            all_terminal = false;
          }
        }
        if (all_terminal) {
          current_node.parent_node.terminal = true;
          current_node = current_node.parent_node;
        }
      } else {
        all_terminal = false;
      }
    } while (all_terminal);
  }
  return this.children;
}

Node.prototype.get_UCB1 = function() {
  // return (this.wins / this.visits) + Math.sqrt(2 * Math.log(this.parent_node.visits) / this.visits);
  return ((this.wins + 1) / (this.visits+2)) + Math.sqrt(2 * Math.log(this.parent_node.visits) / (this.visits+1));
  // return this.value + Math.sqrt(2 * Math.log(this.parent_node.visits)/(this.visits));
}

Node.prototype.get_winner = function() {
  if (this.proven_win) {
    return this.get_player();
  } else if (this.proven_loss) {
    return this.get_opponent();
  } else {
    var winner;
    if (this.winner == null) {
      winner = this.game.winner(this.get_state());

      if (winner == this.get_player()) {
        this.proven_win = true;
        this.parent_node.proven_loss = true;
      } else
      if (winner == this.get_opponent()) {
        this.proven_loss = true;
        if (this.parent_node != undefined) {
          var all_loss = true;
          var siblings = this.parent_node.get_children();
          for (var i = 0; i < siblings.length; i++) {
            if (!siblings[i].proven_loss) {
              all_loss = false;
            }
          }
          if (all_loss) {
            this.parent_node.proven_win = true;
          }
        }
      }
    }
    this.winner = winner;
    return this.winner;
  }
  // if (this.winner == null) {
  //   this.winner = this.game.winner(this.get_state());
  // }
  // return this.winner;
}

Node.prototype.next_move = function() {
  // return the node with higher UCB1 value
  return this.get_children().sort(node_compare_UCB1)[0];
}

Node.prototype.next_random_move = function() {
  // return random node
  return shuffle(this.get_children())[0];
}

node_compare_UCB1 = function(a, b) {
  // sort with higher value of UCB1 first
  value = b.get_UCB1() - a.get_UCB1();
  if ((a.terminal) && (b.terminal)) {
    value = b.visits - a.visits;
  } else if (a.terminal) {
    value = 1;
  } else if (b.terminal) {
    value = -1;
  }
  return value;
}
