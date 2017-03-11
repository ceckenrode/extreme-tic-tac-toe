var app = (function(_my) {
  var _spaces = [];
  var _winner = '';
  var _gameId = '';
  var _whosTurn = '';

  var _players = _my.utils.playerFactory();

  for (var i = 0; i < 10; i++) {
    _spaces.push('');
  }

  function getSpaces() {
    return _spaces;
  }

  function getGameId() {
    return _gameId;
  }

  function getWinner() {
    return _winner;
  }

  function getWhosTurn() {
    return _whosTurn;
  }

  function getPlayers() {
    return _players;
  }

  _my.schema = {
    gameId: getGameId(),
    spaces: getSpaces(),
    players: getPlayers(),
    winner: getWinner(),
    whosTurn: getWhosTurn(),
    moves: [_spaces],
  };

  return _my;
}(app || {}));
