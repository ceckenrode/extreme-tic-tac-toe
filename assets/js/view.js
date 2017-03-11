var app = (function(_my) {
  var _$board = {};

  function _cachDOM() {
    _$board = {
      grid: document.querySelector('#grid'),
      spaces: document.querySelectorAll('#grid .col'),
    };
    _addEventListeners();
    return _$board;
  }

  function _updateView() {
    _$board.spaces.forEach(function(col, i) {
      var symbol = _my.utils.getSymbolFromID(_my.schema.spaces[i]);
      col.innerHTML = _my.utils.getHTMLFromSymbol(symbol);
    });
  }

  function _addEventListeners() {
    _$board.spaces.forEach(function(col, i) {
      col.addEventListener('click', _handleSpaceClick.bind(col, i));
    });

    function _handleSpaceClick(i) {
      if (_my.utils.getPlayerID() !== _my.schema.whosTurn) {
        return false;
      }
      var playerID = _my.utils.getPlayerID();
      var symbol = _my.utils.getSymbolFromID(playerID);
      this.innerHTML = _my.utils.getHTMLFromSymbol(symbol);
      return _my.controller.makeMove(i, playerID);
    }
  }

  _my.$view = {
    update: _updateView,
    board: _cachDOM(),
  };
  return _my;
}(app || {}, window));
