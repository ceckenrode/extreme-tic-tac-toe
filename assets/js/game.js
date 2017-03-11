var app = (function(_my) {
  function initGame() {
    console.log(_my)
    _my.fb
      .ref('games')
      .push({
        spaces: _my.schema.spaces,
        players: _my.schema.players,
        winner: _my.schema.winner,
        whosTurn: _my.utils.getRandomPlayerID(),
        moves: _my.schema.moves,
      })
      .then(function(snapshot) {
        window.location.search = '?game_id=' +
          snapshot.key +
          '&player_id=' +
          _my.schema.players.PLAYER_ONE.id;
      });
  }
  _my.initGame = initGame;
  return _my;
}(app || {}, window));
