var app = (function(_my, window) {
  var _shapes = {
    X: '<i class="fa fa-times" aria-hidden="true"></i>',
    O: '<i class="fa fa-circle-o" aria-hidden="true"></i>',
  };

  function _getRandomSymbol() {
    var symbols = Object.keys(_shapes);
    var index = Math.floor(Math.random() * 2);
    return symbols[index];
  }

  function _generateID() {
    return Math.random().toString(36).substring(7);
  }

  function _alternateSymbol(symbol) {
    if (symbol !== 'X' && symbol !== 'O') {
      return false;
    }
    if (symbol === 'X') {
      return 'O';
    }
    return 'X';
  }

  function _playerFactory() {
    var players = {
      PLAYER_ONE: {
        id: _generateID(),
      },
      PLAYER_TWO: {
        id: _generateID(),
      },
    };
    players.PLAYER_ONE.symbol = _getRandomSymbol();
    players.PLAYER_TWO.symbol = _alternateSymbol(players.PLAYER_ONE.symbol);
    return players;
  }

  function _getHTMLFromSymbol(symbol) {
    if (!_shapes[symbol]) {
      return '';
    }
    return _shapes[symbol];
  }

  function _setSpace(index, symbol) {
    this.spaces[index] = _getHTMLFromSymbol(symbol);
  }

  function _getHashFromParams() {
    var search = window.location.search.slice(1, window.location.search.length);
    if (!search) {
      return null;
    }
    var hash = {};
    var queries = search.split('&');
    for (var i = 0; i < queries.length; i++) {
      var splitQuery = queries[i].split('=');
      hash[splitQuery[0]] = splitQuery[1];
    }
    return hash;
  }

  function _getGameID() {
    var params = _getHashFromParams();
    if (!params || !params.game_id) {
      return null;
    }
    return params.game_id;
  }

  function _isValidID(id) {
    for (var player in _my.schema.players) {
      if (_my.schema.players[player].id === id) {
        return true;
      }
    }
    return false;
  }

  function _getPlayerID() {
    var params = _getHashFromParams();
    if (!params || !params.player_id || !_isValidID(params.player_id)) {
      return null;
    }
    return params.player_id;
  }

  function _getSymbolFromID(id) {
    for (var player in _my.schema.players) {
      if (_my.schema.players[player].id === id) {
        return _my.schema.players[player].symbol;
      }
    }
    return null;
  }
  function _getRandomPlayerID() {
    var players = [];
    for (var player in _my.schema.players) {
      if (_my.schema.players[player]) {
        players.push(_my.schema.players[player]);
      }
    }
    var index = Math.floor(Math.random() * 2);
    return players[index].id;
  }

  function _getAlternateID(id) {
    for (var player in _my.schema.players) {
      if (_my.schema.players[player].id !== id) {
        return _my.schema.players[player].id;
      }
    }
    return null;
  }

  _my.utils = {
    getHTMLFromSymbol: _getHTMLFromSymbol,
    setSpace: _setSpace.bind(_my),
    getHashFromParams: _getHashFromParams,
    getGameID: _getGameID,
    getRandomSymbol: _getRandomSymbol,
    alternateSymbol: _alternateSymbol,
    playerFactory: _playerFactory,
    generateID: _generateID,
    getPlayerID: _getPlayerID,
    getSymbolFromID: _getSymbolFromID,
    getRandomPlayerID: _getRandomPlayerID,
    getAlternateID: _getAlternateID,
  };

  return _my;
}(app || {}, window));
