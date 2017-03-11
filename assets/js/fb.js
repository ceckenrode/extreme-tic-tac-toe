/* global firebase */
var app = (function(_my, firebase) {
  _my.gameID = _my.utils.getGameID();
  var _config = {
    apiKey: 'AIzaSyC6d5prPEjn-eI-66-yTfVWqFlDmD7wtl8',
    authDomain: 'extreme-tic-tac-toe.firebaseapp.com',
    databaseURL: 'https://extreme-tic-tac-toe.firebaseio.com',
    storageBucket: 'extreme-tic-tac-toe.appspot.com',
    messagingSenderId: '265487759978',
  };
  firebase.initializeApp(_config);

  _my.fb = firebase.database();
  var _gamesRef = firebase.database().ref('games/' + _my.gameID);

  _gamesRef.on('value', function(snapshot) {
    if (!snapshot.val()) {
      return false;
    }
    _my.schema = snapshot.val();
    return _my.$view.update();
  });

  if (!_my.gameID) {
    _my.initGame();
  } else {
    _my.fb.ref('games').child(_my.gameID).once('value', function(snapshot) {
      if (!snapshot.val()) {
        return;
      }
      _my.schema = snapshot.val();
      _my.PLAYER_ID = _my.utils.getPlayerID();
      _my.$view.update();
    });
  }

  return _my;
}(app || {}, firebase));
