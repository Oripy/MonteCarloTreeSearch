var MonteCarlo = function(game, state) {
  this.game = game;
  this.root_node = new Node(null, undefined, this.game, 0);
  this.root_node.state = state;
  this.root_node.get_player();
  this.nb_simul = 0;

  this.start = function() {
    // var self = this;
    return setInterval(this.simul.bind(this), 0);
  }

  this.simul = function() {
    if (!this.root_node.terminal) {
      // INIT
      var current_node = this.root_node;
      this.root_node.visits++;
      while ((current_node.visits > 1) && (current_node.get_children().length != 0)) {
        // SELECTION + EXPANSION
        current_node = current_node.next_move();
        // current_node = current_node.next_random_move();
        current_node.minimax = null;
        current_node.visits++;
      }

      while (current_node.get_children().length != 0) {
        // SIMULATION
        current_node = current_node.next_random_move();
        current_node.minimax = null;
        current_node.visits++;
      }

      // BACKPROPAGATION
      var winner = current_node.get_winner();
      do {
        if (winner == 0) {
         current_node.value += 0;
        } else if (current_node.get_player() == winner) {
          current_node.wins++;
          current_node.value += 1;
        } else if (current_node.get_opponent() == winner) {
          current_node.value -= 1;
        }
        current_node.get_minimax();
        current_node = current_node.parent_node;
      } while (current_node.parent_node !== undefined);
      this.nb_simul++;
      if (this.nb_simul % 1000 == 0) {
        console.log(this.nb_simul, this.root_node.visits);
      }
    }
  }

  this.next = function() {
    var children = this.root_node.get_children().sort(node_compare_success);
    if (this.root_node.get_opponent() == 1) {
      var best_value = -1000;
      // console.log("maximizing");
      // console.log(this.root_node);
      for (var i = 0; i < children.length; i++) {
        node_value = children[i].get_minimax();
        // this.game.show_debug(children[i].get_state());
        // console.log(i, "maximizing", children[i].move, node_value);
        // this.game.show_debug(children[i].get_state());
        // console.log(this.game.display_values[children[i].get_player()],
                    // "move:",
                    // children[i].move,
                    // "score:",
                    // node_value,
                    // "visits:",
                    // children[i].visits,
                    // "ratio:",
                    // Math.round(100*children[i].wins/children[i].visits));
        // console.log("---");
        if (node_value > best_value) {
          best_value = node_value;
          selected_node = children[i];
        }
      }
    } else {
      var best_value = 1000;
      // console.log("minimizing");
      // console.log(this.root_node);
      for (var i = 0; i < children.length; i++) {
        node_value = children[i].get_minimax();
        // this.game.show_debug(children[i].get_state());
        // console.log(i, "minimizing", children[i].move, node_value);
        // this.game.show_debug(children[i].get_state());
        // console.log(this.game.display_values[children[i].get_player()],
                    // "move:",
                    // children[i].move,
                    // "score:",
                    // node_value,
                    // "visits:",
                    // children[i].visits,
                    // "ratio:",
                    // Math.round(100*children[i].wins/children[i].visits));
        // console.log("---");
        if (node_value < best_value) {
          best_value = node_value;
          selected_node = children[i];
        }
      }
    }

    // var selected_node = this.root_node.get_children().sort(node_compare_success)[0];
    // var selected_node = this.root_node.get_children().sort(node_compare_values)[0];

    // console.log("-----");
    console.log("num simul:",this.nb_simul);
    // console.log(this.root_node);
    // list_nodes = this.root_node.get_children().sort(node_compare_success);
    // for (var i = 0; i < this.root_node.get_children().length; i++) {
    //   console.log(list_nodes[i].move,
    //               list_nodes[i].value,
    //               Math.round(100*list_nodes[i].wins/list_nodes[i].visits),
    //               list_nodes[i].wins, "/", list_nodes[i].visits);
    // }
    // console.log("terminal: ", this.root_node.terminal);
    // console.log(this.game.display_values[selected_node.get_player()],
                                         // selected_node.move,
                                         // best_value//,
                                         // selected_node.wins,
                                         // "/",
                                         // selected_node.visits
                                         // );
    // if (selected_node.proven_loss) {
    //   console.log("perdu");
    // }
    // if (selected_node.proven_win) {
    //   console.log("gagné");
    // }
    return selected_node.move;
  }

  this.set_root = function(state, move) {
    if (this.root_node !== undefined) {
      children_list = this.root_node.get_children();
      for (var i=0; i < children_list.length; i++) {
        if (equal_moves(children_list[i].move, move)) {
          this.root_node = children_list[i];
          this.root_node.get_children();
          this.root_node.parent_node = undefined;
        } else {
          delete children_list[i];
        }
      }
      return;
    }
    console.log(this.root_node, state, move);
    console.log("childnode not found, new root created");
    this.root_node = new Node(null, undefined, this.game, 0);
    this.root_node.state = state;
    this.root_node.get_player();
  }
}

equal_moves = function(move1, move2) {
  if ((move1.constructor === Array) && (move1.constructor === Array)) {
    if(move1.length !== move2.length)
      return false;
    for(var i = move1.length; i--;) {
      if(move1[i] !== move2[i])
        return false;
    }
    return true;
  } else {
    return (move1 === move2);
  }
}


node_compare_values = function(a, b) {
  value = b.value - a.value;
  if ((a.proven_loss) && (b.proven_loss)) {
    value = b.visits - a.visits;
  } else if (a.proven_loss) {
    value = 1;
  } else if (b.proven_loss) {
    value = -1;
  }
  return value;
}

node_compare_success = function(a, b) {
  // sort with higher success rate
  if ((a.visits != 0) && (b.visits != 0)) {
    value = b.wins/b.visits - a.wins/a.visits; // maximize wins
  } else {
    value = b.visits - a.visits;
  }
  if ((a.proven_loss) && (b.proven_loss)) {
    value = b.visits - a.visits;
  } else if (a.proven_loss) {
    value = 1;
  } else if (b.proven_loss) {
    value = -1;
  }
  return value;
}
