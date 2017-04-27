var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var LoginConstants = require('../constants/LoginConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _user = null;
var baseURL = 'http://localhost:1337/parse';
var appId = '111';


/**
 * register a USER.
 * @param  {string} username
 * @param  {string} password
 */
function register(username, password, callback) {
  // server-side storage.
  var data = {
    "username": username,
    "password": password
  };
  var url = baseURL + '/classes/_User';

  $.ajax({
    url: url,
    //dataType: 'json',
    type: 'POST',
    headers: {
      "X-Parse-Application-Id": appId,
      "X-Parse-Revocable-Session": 1,
      "X-Parse-REST-API-Key": ""
    },
    data: data,
    success: function(data) {
      console.log(data);
      callback(null, data);
      return data;
    }.bind(this),
    error: function(xhr, status, err) {
      console.error(url, status, err.toString());
      callback(status, err);
      return null;
    }.bind(this)
  })
}

/**
 * logout reset session.
 */
function logout(callback) {
  
  var url = baseURL + '/logout';
  $.ajax({
    url: url,
    //dataType: 'json',
    type: 'POST',
    headers: {
      "X-Parse-Application-Id": appId,
      "X-Parse-Revocable-Session": 1,
      "X-Parse-REST-API-Key": ""
    },
    success: function(data) {
      console.log(data);
      callback(null, data);
      return data;
    }.bind(this),
    error: function(xhr, status, err) {
      console.error(url, status, err.toString());
      callback(status, err);
      return null;
    }.bind(this)
  })
}
/**
 * login call to Parse server.
 * @param  {string} username
 * @param  {string} password
 */
function login(username, password, callback) {
  var data = {
    "username": username,
    "password": password
  };
  var url = baseURL + '/login';
  $.ajax({
    url: url,
    type: 'GET',
    headers: {
      "X-Parse-Application-Id": appId,
      "X-Parse-Revocable-Session": 1,
    },
    data: data,
    success: function(data) {
      callback(null, data);
      return data;
    }.bind(this),
    error: function(xhr, status, err) {
      console.error(url, status, err.toString());
      callback(status, err);
      return null;
    }.bind(this)
  })
}

/**
 * retrieving USER info.
 */
function getProfile(sessionToken, callback) {
  if(sessionToken) {
    var url = baseURL + '/users/me';
    $.ajax({
      url: url,
      //dataType: 'json',
      type: 'GET',
      headers: {
        "X-Parse-Application-Id": appId,
        "X-Parse-Revocable-Session": 1,
        "X-Parse-REST-API-Key": "",
        "X-Parse-Session-Token": sessionToken
      },
      success: function(data) {
        callback(null, data);
        return data;
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(url, status, err.toString());
        callback(status, err);
        return null;
      }.bind(this)
    })
  }
  else {
    console.log('need to login first!');
  }
}
/**
 * store USER info in localStorage.
 */
function setUser(user) {
  _user = user;
  localStorage.setItem('user', JSON.stringify(user));
}
/**
 * retrieving USER info in localStorage.
 */
function getUser() {
  return _user || JSON.parse(localStorage.getItem('user'));
}

var LoginStore = assign({}, EventEmitter.prototype, {
	/**
   * Get the entire collection of TODOs.
   * @return {object}
   */
  getCurrentUser: function() {
    _user = getUser();
    console.log(_user);
    return _user;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// Register callback to handle all updates
AppDispatcher.register(function(action) {
  var username, password;

  switch(action.actionType) {
    case LoginConstants.LOGIN_LOGIN:
      username = action.username.trim();
      password = action.password.trim();
      if (username !== '' && password!== '') {
        login(username, password, function(err, user){
          if (!err) {
            setUser(user);
            LoginStore.emitChange();
          }
        });        
      }
      break;
    case LoginConstants.LOGIN_LOGOUT:
      logout(function(err, data){
        if (!err) {
          setUser(null);
          LoginStore.emitChange();
        }
      });
      
      break;
    case LoginConstants.LOGIN_SIGNUP:
      username = action.username.trim();
      password = action.password.trim();
      register(username, password, function(err, data){
        if (!err) {
          getProfile(data.sessionToken, function(err, user){
            if (!err) {
              setUser(user);
              LoginStore.emitChange();
            }
          });          
        }
      });
      break;

    default:
      // no op
  }
});

module.exports = LoginStore;