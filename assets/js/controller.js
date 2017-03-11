var app = (function(_my) {
  var _winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  function _updateSchema() {
    _my.fb.ref('games').child(_my.gameID).set(_my.schema);
    console.log(_didWin(_my.PLAYER_ID));
  }

  function _makeMove(i, id) {
    _my.schema.spaces[i] = id;
    _my.schema.whosTurn = _my.utils.getAlternateID(id);
    _my.schema.moves.push(_my.schema.spaces);
    _updateSchema();
  }

  function _didWin(id) {
    for (var i = 0; i < _winningCombinations.length; i++) {
      for (var j = 0; j < _winningCombinations[i].length; j++) {
        var count = 0;
        if (_my.schema.spaces[_winningCombinations[i][j]] !== id) {
          break;
        }
        count++;
        if (count === 3) {
          return true;
        }
      }
    }
    return false;
  }

  _my.controller = {
    makeMove: _makeMove,
  };

  return _my;
}(app || {}));
