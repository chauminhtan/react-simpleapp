var AppDispatcher = require('../dispatcher/AppDispatcher');
var LoginConstants = require('../constants/LoginConstants');

var LoginActions = {

  /**
   * @param  {string} username, {string} password
   */
  login: function(username, password) {
    AppDispatcher.dispatch({
      actionType: LoginConstants.LOGIN_LOGIN,
      username: username,
      password: password
    });
  },
  /**
   * @param  {string} username, {string} password
   */
  logout: function() {
    AppDispatcher.dispatch({
      actionType: LoginConstants.LOGIN_LOGOUT
    });
  },
  /**
   * @param  {string} id The ID of the ToDo item
   * @param  {string} text
   */
  signup: function(username, password) {
    AppDispatcher.dispatch({
      actionType: LoginConstants.LOGIN_SIGNUP,
      username: username,
      password: password
    });
  }

};

module.exports = LoginActions;