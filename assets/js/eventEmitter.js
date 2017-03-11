var app = (function(_my) {
  var _events = {};

  function _subscribe(eventName, cb) {
    if (eventName in _events) {
      _events[eventName].push(cb);
    } else {
      _events[eventName] = [cb];
    }
  }

  function _emit(eventName) {
    if (eventName in _events) {
      for (var i = 0; i < _events[eventName]; i++) {
        _events[eventName][i]();
      }
    }
  }

  function _off(eventName) {
    if (eventName in _events) {
      delete _events[eventName];
    }
  }

  _my.emitter = {
    subscribe: _subscribe,
    emit: _emit,
    off: _off,
  };
  return _my;
}(app || {}));
