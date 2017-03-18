function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

var Game = function() {
                       //no player, player1, player2
  this.colors = ["white", "blue", "green", "red", "black"];
                         //w,bl, g, r,bk,cl,vp
  this.card_list_1     = [[0, 3, 0, 0, 0, 0, 0],
                          [0, 0, 0, 2, 1, 0, 0],
                          [0, 1, 1, 1, 1, 0, 0],
                          [0, 2, 0, 0, 2, 0, 0],
                          [0, 0, 4, 0, 0, 0, 1],
                          [0, 1, 2, 1, 1, 0, 0],
                          [0, 2, 2, 0, 1, 0, 0],
                          [3, 1, 0, 0, 1, 0, 0],
                          [1, 0, 0, 0, 2, 1, 0],
                          [0, 0, 0, 0, 3, 1, 0],
                          [1, 0, 1, 1, 1, 1, 0],
                          [0, 0, 2, 0, 2, 1, 0],
                          [0, 0, 0, 4, 0, 1, 1],
                          [1, 0, 1, 2, 1, 1, 0],
                          [1, 0, 2, 2, 0, 1, 0],
                          [0, 1, 3, 1, 0, 1, 0],
                          [2, 1, 0, 0, 0, 2, 0],
                          [0, 0, 0, 3, 0, 2, 0],
                          [1, 1, 0, 1, 1, 2, 0],
                          [0, 2, 0, 2, 0, 2, 0],
                          [0, 0, 0, 0, 4, 2, 1],
                          [1, 1, 0, 1, 2, 2, 0],
                          [0, 1, 0, 2, 2, 2, 0],
                          [1, 3, 1, 0, 0, 2, 0],
                          [0, 2, 1, 0, 0, 3, 0],
                          [3, 0, 0, 0, 0, 3, 0],
                          [1, 1, 1, 0, 1, 3, 0],
                          [2, 0, 0, 2, 0, 3, 0],
                          [4, 0, 0, 0, 0, 3, 1],
                          [2, 1, 1, 0, 1, 3, 0],
                          [2, 0, 1, 0, 2, 3, 0],
                          [1, 0, 0, 1, 3, 3, 0],
                          [0, 0, 2, 1, 0, 4, 0],
                          [0, 0, 3, 0, 0, 4, 0],
                          [1, 1, 1, 1, 0, 4, 0],
                          [2, 0, 2, 0, 0, 4, 0],
                          [0, 4, 0, 0, 0, 4, 1],
                          [1, 2, 1, 1, 0, 4, 0],
                          [2, 2, 0, 1, 0, 4, 0],
                          [0, 0, 1, 3, 1, 4, 0]];
  this.card_list_2     = [[0, 0, 0, 5, 0, 0, 2],
                          [6, 0, 0, 0, 0, 0, 3],
                          [0, 0, 3, 2, 2, 0, 1],
                          [0, 0, 1, 4, 2, 0, 2],
                          [2, 3, 0, 3, 0, 0, 1],
                          [0, 0, 0, 5, 3, 0, 2],
                          [0, 5, 0, 0, 0, 1, 2],
                          [0, 6, 0, 0, 0, 1, 3],
                          [0, 2, 2, 3, 0, 1, 1],
                          [2, 0, 0, 1, 4, 1, 2],
                          [0, 2, 3, 0, 3, 1, 1],
                          [5, 3, 0, 0, 0, 1, 2],
                          [0, 0, 5, 0, 0, 2, 2],
                          [0, 0, 6, 0, 0, 2, 3],
                          [2, 3, 0, 0, 2, 2, 1],
                          [3, 0, 2, 3, 0, 2, 1],
                          [4, 2, 0, 0, 1, 2, 2],
                          [0, 5, 3, 0, 0, 2, 2],
                          [0, 0, 0, 0, 5, 3, 2],
                          [0, 0, 0, 6, 0, 3, 3],
                          [2, 0, 0, 2, 3, 3, 1],
                          [1, 4, 2, 0, 0, 3, 2],
                          [0, 3, 0, 2, 3, 3, 1],
                          [3, 0, 0, 0, 5, 3, 2],
                          [5, 0, 0, 0, 0, 4, 2],
                          [0, 0, 0, 0, 6, 4, 3],
                          [3, 2, 2, 0, 0, 4, 1],
                          [0, 1, 4, 2, 0, 4, 2],
                          [3, 0, 3, 0, 2, 4, 1],
                          [0, 0, 5, 3, 0, 4, 2]];
  this.card_list_3     = [[0, 0, 0, 0, 7, 0, 4],
                          [3, 0, 0, 0, 7, 0, 5],
                          [3, 0, 0, 3, 6, 0, 4],
                          [0, 3, 3, 5, 3, 0, 3],
                          [7, 0, 0, 0, 0, 1, 4],
                          [7, 3, 0, 0, 0, 1, 5],
                          [6, 3, 0, 0, 3, 1, 4],
                          [3, 0, 3, 3, 5, 1, 3],
                          [0, 7, 0, 0, 0, 2, 4],
                          [0, 7, 3, 0, 0, 2, 5],
                          [3, 6, 3, 0, 0, 2, 4],
                          [5, 3, 0, 3, 3, 2, 3],
                          [0, 0, 7, 0, 0, 3, 4],
                          [0, 0, 7, 3, 0, 3, 5],
                          [0, 3, 6, 3, 0, 3, 4],
                          [3, 5, 3, 0, 3, 3, 3],
                          [0, 0, 0, 7, 0, 4, 4],
                          [0, 0, 0, 7, 3, 4, 5],
                          [0, 0, 3, 6, 3, 4, 4],
                          [3, 3, 5, 3, 0, 4, 3]];
  this.card_list_noble = [[3, 3, 0, 0, 3, -1, 3],
                          [0, 3, 3, 3, 0, -1, 3],
                          [3, 0, 0, 3, 3, -1, 3],
                          [0, 0, 4, 4, 0, -1, 3],
                          [0, 4, 4, 0, 0, -1, 3],
                          [0, 0, 0, 4, 4, -1, 3],
                          [4, 0, 0, 0, 4, -1, 3],
                          [3, 3, 3, 0, 0, -1, 3],
                          [0, 0, 3, 3, 3, -1, 3],
                          [4, 4, 0, 0, 0, -1, 3]];

  this.board_length = 12;

  this.card = function(value, small, id) {
    if (!small) var small = false;
    var svg = "";
    var vp = value[6];
    if (vp == 0) {
      vp = "";
    }
    var cost = [];
    var cost_colors = [];
    j = 0;
    for (var i = 0; i < 5; i++) {
      if (value[i] != 0) {
        cost[j] = value[i];
        cost_colors[j] = this.colors[i];
        j++;
      }
    }

    if (value[5] == -1) { //noble
      svg =  '<svg class="noble" width="160" height="140" xmlns="http://www.w3.org/2000/svg" version="1.1"> \
              <!-- Tile --> \
              <rect x="5" y="5" rx="15" ry="15" width="150" height="130" style="fill: white; stroke: none;" /> \
              <rect x="5" y="5" rx="15" ry="15" width="150" height="130" style="stroke: none; opacity:0.5" /> \
              <rect x="5" y="5" width="40" height="130" style="stroke: none; fill:white; opacity:0.5" /> \
              <rect x="5" y="5" rx="15" ry="15" width="150" height="130" style="stroke: black; fill: none;" /> \
              <!-- Victory points --> \
              <text x="14" y="37" class="ctxt vp">'+vp+'</text> \
              <g class="m">';
      for (var i = 0; i < cost.length; i++) {
        svg += '<rect class="'+cost_colors[i]+'" x="16" y="'+(101-i*30)+'" rx="5" ry="5" width="18" height="28" style="stroke: black;" /> \
                <text x="18" y="'+(122-i*30)+'" class="ctxt cost">'+cost[i]+'</text>';
      }
      svg += '</g> \
              </svg>';
    } else { //other
      card_color = this.colors[value[5]];
      if (small) {
        svg = '<svg id="'+id+'" viewBox="0 0 124 186" class="card '+card_color+'" width="73" height="110" xmlns="http://www.w3.org/2000/svg" version="1.1">';
      } else {
        svg = '<svg class="card '+card_color+'" width="124" height="186" xmlns="http://www.w3.org/2000/svg" version="1.1">';
      }

      svg += '<!-- Card --> \
              <rect x="5" y="5" rx="15" ry="15" width="114" height="176" style="fill: white; stroke: none;" /> \
              <rect x="5" y="5" rx="15" ry="15" width="114" height="176" style="stroke: none; opacity:0.5;" /> \
              <rect x="5" y="5" width="114" height="40" style="stroke: none; fill: white; opacity:0.5" /> \
              <rect x="5" y="5" rx="15" ry="15" width="114" height="176" style="stroke: black; fill: none;" /> \
              <!-- Gem --> \
              <polygon points="80,10 90,9 100,10 110,18 90,40 70,18" style="stroke: black;" class="j"/> \
              <g class="line"> \
                <polyline points="70,18 82,17 98,17 110,18" /> \
                <polyline points="80,10 82,17 90,9 98,17 100,10" /> \
                <polyline points="82,17 90,40 98,17" /> \
              </g> \
              <!-- Victory points --> \
              <text x="14" y="37" class="ctxt vp">'+vp+'</text> \
              <!-- Costs --> \
              <g class="m">';
      for (var i = 0; i < cost.length; i++) {
        svg += '<circle id="cc3" cx="21" cy="'+(158-28*i)+'" r="12" class="'+cost_colors[i]+'" /> \
                <text id="c3" x="14" y="'+(166-28*i)+'" class="ctxt cost">'+cost[i]+'</text>';
      }
      svg += '</g> \
              </svg>';
    }
    return svg;
  }

  this.show = function(state) {
    for (var i = 0; i < 4; i++) { // cards
      document.getElementById("1"+i).innerHTML = this.card(this.card_list_1[state[i]]);
      document.getElementById("2"+i).innerHTML = this.card(this.card_list_2[state[i+4]]);
      document.getElementById("3"+i).innerHTML = this.card(this.card_list_3[state[i+8]]);
    }
    for (var i = 0; i < 3; i++) { // nobles
      document.getElementById("n"+i).innerHTML = this.card(this.card_list_noble[state[i+12]]);
    }
    for (var i = 0; i < 5; i++) { // coin reserve
      document.getElementById("m"+i).innerHTML = state[15+i];
    }
    document.getElementById("m5").innerHTML = state[20]; // gold reserve

    for (var j = 0; j < 2; j++) { // player data
      document.getElementById("p"+(j+1)+"_score").innerHTML = state[32+(j*13)];
      document.getElementById("p"+(j+1)+"_gold").innerHTML = state[26+(j*13)];
      for (var i = 0; i < 5; i++) {
        document.getElementById("p"+(j+1)+"_"+this.colors[i]+"_coins").innerHTML = state[21+i+(j*13)];
        document.getElementById("p"+(j+1)+"_"+this.colors[i]+"_cards").innerHTML = state[27+i+(j*13)];
      }
      document.getElementById("p"+(j+1)+"_reserved").innerHTML = "";
      for (var i = 0; i < state[33+(j*13)].length; i++) {
        var stack = Math.floor(state[33+(j*13)][i]/100);
        var id = state[33+(j*13)][i] - 100*stack;
        if (stack == 1) {
          document.getElementById("p"+(j+1)+"_reserved").innerHTML += this.card(this.card_list_1[id], true, "p"+(j+1)+"_reserved_"+i);
        } else if (stack == 2) {
          document.getElementById("p"+(j+1)+"_reserved").innerHTML += this.card(this.card_list_2[id], true, "p"+(j+1)+"_reserved_"+i);
        } else {
          document.getElementById("p"+(j+1)+"_reserved").innerHTML += this.card(this.card_list_3[id], true, "p"+(j+1)+"_reserved_"+i);
        }
      }
    }
  }

  this.show_debug = function(state) {
    console.log(state);
  }

  this.get_move = function(state, move) {

  }

  this.init = function() {

  }

  this.start = function(first_player) {
    var first_player = (typeof first_player !== 'undefined') ? first_player : 2;
    var list1 = [];
    var list2 = [];
    var list3 = [];
    var listnoble = [];
    for (var i = 0; i < this.card_list_1.length; i++) {
      list1.push(i);
      if (i < this.card_list_2.length) {
        list2.push(i);
      }
      if (i < this.card_list_3.length) {
        list3.push(i);
      }
      if (i < this.card_list_noble.length) {
        listnoble.push(i);
      }
    }
    list1 = shuffle(list1);
    list2 = shuffle(list2);
    list3 = shuffle(list3);
    listnoble = shuffle(listnoble);

    var cards = list1.slice(0, 4);
    list1.splice(0, 4);
    Array.prototype.push.apply(cards, list2.slice(0, 4));
    list2.splice(0, 4);
    Array.prototype.push.apply(cards, list3.slice(0, 4));
    list3.splice(0, 4);
    Array.prototype.push.apply(cards, listnoble.slice(0, 3));
    listnoble.splice(0, 3);

    return Array.prototype.concat(cards,
            [4, 4, 4, 4, 4, 5, // number of coins available (colors then gold)
            0, 0, 0, 0, 0, 0, // first player coins
            0, 0, 0, 0, 0, // first player cards
            0,             // first player score
            [],            // first player pocket cards
            0, 0, 0, 0, 0, 0, // second player coins
            0, 0, 0, 0, 0, // second player cards
            0,             // second player score
            [],            // second player pocket cards
            list1,
            list2,
            list3,
            first_player]);
  }

  this.get_next_player = function(state) {
    return state[state.length-1]%2+1;
  }

  this.get_current_player = function(state) {
    return state[state.length-1];
  }

  this.get_card_fromID = function(state, coordinates) {
    if (coordinates.charAt(0) == 1) {
      var id = parseInt(coordinates.charAt(1)); // get card ID
      return this.card_list_1[state[id]]; // load the card from the list
    } else if (coordinates.charAt(0) == 2) {
      var id = 4+parseInt(coordinates.charAt(1));
      return this.card_list_2[state[id]];
    } else {
      var id = 8+parseInt(coordinates.charAt(1));
      return this.card_list_3[state[id]];
    }
  }

  this.next_state = function(state, move) {
    var new_state = [];

    // copy state
    for (var i = 0; i < 33; i++) {  // 0 -> 11 cards ; 12->14 nobles ; 15->20 coins ; 21->33 first player
      new_state[i] = state[i];
    }
    new_state[33] = state[33].slice(); // 33 first player reserved cards
    for (var i = 34; i < 46; i++) {  // 34->46 second player
      new_state[i] = state[i];
    }
    for (var i = 46; i < 50; i++) { // 46 second player reserved cards ; 47 -> 49 cards stacks
      new_state[i] = state[i].slice();
    }
    // change the player recorded to have played the move
    var offset = (this.get_next_player(state)-1)*13;
    new_state[50] = this.get_next_player(state);

    // process the move
    if (move[0] == "coins") {       // ["coins", 1, 0, 1, 1, 0]
      for (var i = 0; i < 5; i++) {
        new_state[21+i+offset] += move[i+1];
        new_state[15+i] -= move[i+1];
      }
    } else if (move[0] == "card") { // ["card", "31"]
      if (move[1].charAt(0) == '1') {
        var id = parseInt(move[1].charAt(1)); // get card ID
        var card = this.card_list_1[state[id]]; // load the card from the list
        new_state[id] = new_state[47][0]; // draw a new card
        new_state[47].splice(0, 1); // remove this card from the stack
      } else if (move[1].charAt(0) == '2') {
        var id = 4+parseInt(move[1].charAt(1));
        var card = this.card_list_2[state[id]];
        new_state[id] = new_state[48][0];
        new_state[48].splice(0, 1);
      } else {
        var id = 8+parseInt(move[1].charAt(1));
        var card = this.card_list_3[state[id]];
        new_state[id] = new_state[49][0];
        new_state[49].splice(0, 1);
      }

      for (var i = 0; i < 5; i++) { // deal with the card cost
        var color_cost = Math.max(card[i]-new_state[27+i+offset], 0);
        var player_color_coins = new_state[21+i+offset];
        var player_gold = new_state[26+offset];
        var gold_cost = Math.max(color_cost-player_color_coins, 0);
        if (gold_cost > 0) {
          color_cost = player_color_coins;
        }
        new_state[21+i+offset] -= color_cost;
        new_state[15+i] += color_cost;
        new_state[26+offset] -= gold_cost;
        new_state[20] += gold_cost;
      }
      new_state[27+card[5]+offset] += 1; // update the owned cards count
      new_state[32+offset] += card[6]; // update the player score
    } else if (move[0] == "reserve") {  // ["reserve", "31"]
      // reserve the card
      id = parseInt(move[1].charAt(1))+4*(parseInt(move[1].charAt(0))-1);
      new_state[33+offset].push(move[1].charAt(0)*100 + state[id]);
      console.log(new_state[33+offset]);

      if (new_state[20] > 0) {
        new_state[26+offset] += 1; // add one gold
        new_state[20] -= 1; // remove a gold from the pile
      }

      new_state[id] = new_state[47+(parseInt(move[1].charAt(0))-1)][0]; // draw a new card
      new_state[47+(parseInt(move[1].charAt(0))-1)].splice(0, 1); // remove this card from the stack
    } else if (move[0] == "draw") { // ["draw", "p3"]
      new_state[33+offset].push(move[1].charAt(1)*100 + new_state[47+(move[1].charAt(1)-1)][0]); //reserve the new card
      new_state[47+(move[1].charAt(1)-1)].splice(0, 1); // remove this card from the stack

      if (new_state[20] > 0) {
        new_state[26+offset] += 1; // add one gold
        new_state[20] -= 1; // remove a gold from the pile
      }
    }
    return new_state;
  }

  this.legal_plays = function(state) {
    var legals = [];
    var offset = (this.get_next_player(state)-1)*13;

    // test legal plays only if there is no winner at this stage
    if (this.winner(state) == -1) {
      for (var j = 1; j < 4; j++) {
        // draw card
        legals.push(["draw", "p"+j]);
        for (var i = 0; i < 4; i++) {
          var id = j.toString()+i.toString();

          // reserve card
          legals.push(["reserve", id]);

          // buy card
          var card = this.get_card_fromID(state, id);
          var can_buy = true;
          var gold = state[26+offset];
          for (var k = 0; k < 5; k++) {
            var color_cost = Math.max(card[k]-state[27+k+offset], 0);
            var player_color_coins = state[21+k+offset];
            if (player_color_coins - color_cost < 0) {
              if (player_color_coins + gold - color_cost < 0) {
                can_buy = false;
                break;
              } else {
                gold -= color_cost - player_color_coins;
              }
            }
          }
          if (can_buy) {
            legals.push(["card", id]);
          }
        }
      }

    }

    // take 2 coins of the same color
    for (var i = 0; i < 5; i++) {
      if (state[15+i] >= 4) {
        legals.push(["coins", (i == 0) ? 2 : 0, (i == 1) ? 2 : 0, (i == 2) ? 2 : 0, (i == 3) ? 2 : 0, (i == 4) ? 2 : 0]);
      }
    }

    // take 3 different coins
    for (var i = 0; i < 3; i++) {
      for (var j = i+1; j < 4; j++) {
        for (var k = j+1; k < 5; k++) {
          if (i != j && i != k && j != k &&
              state[15+i] >= 1 && state[15+j] >= 1 && state[15+k] >= 1) {
                legals.push(["coins", (i == 0) ? 1 : 0,
                             (i == 1 || j == 1) ? 1 : 0,
                             (i == 2 || j == 2 || k == 2) ? 1 : 0,
                             (j == 3 || k == 3) ? 1 : 0,
                             (k == 4) ? 1 : 0]);
          }
        }
      }
    }
    return legals;
  }

  this.winner = function(state) {
    var winner = -1;
    if ((state[32] >= 15 || state[45] >= 15) && state[50] == 2) {
      if (state[32] > state[45]) {
        winner = 1;
      } else if (state[32] < state[45]) {
        winner = 2;
      } else {
        winner = 0;
      }
    }
    return winner;
  }
}
