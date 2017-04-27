var Footer = require('./Footer');
var Header = require('./Header');
var LoginActions = require('../actions/LoginActions');
var React = require('react');

var ENTER_KEY_CODE = 13;
/**
 * init USER data
 */
function getUserState() {
  return {
    username: '',
    password: ''
  };
}

var Login = React.createClass({

  getInitialState: function() {
    return {
      username: '',
      password: '',
      error: null,
      signup: false
    }
  },

  componentDidMount: function() {
    
  },

  componentWillUnmount: function() {
    
  },

  /**
   * @return {object}
   */
  render: function() {
    return (
      <div className="login-wrap">
          <div className="panel">
              <div className="panel-heading">
                  <h3 className="panel-title">Sign In</h3>
              </div>
              <div className="panel-body">
                {
                  this.state.error && !this.state.signup ?
                  <div className='alert alert-danger' role="alert">
                    {this.state.error}
                  </div> : null
                }
                <form className="loginForm">
                    <div className="form-group">
                        <input type="text" className="form-control" id="username" value={this.state.username} onChange={this.handleUsername} placeholder="Enter username" />
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" id="password" value={this.state.password} onChange={this.handlePassdword} placeholder="Password" />
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={this.login}>Login</button>
                </form>
              </div>
          </div>
          <div className="panel">
              <div className="panel-heading">
                  <h3 className="panel-title">Sign Up</h3>
              </div>
              <div className="panel-body">
                  {
                    this.state.error && this.state.signup ?
                    <div className='alert alert-danger' role="alert">
                      {this.state.error}
                    </div> : null
                  }
                  <form className="signupForm">
                      <div className="form-group">
                          <input type="text" className="form-control" id="username" ref="username" placeholder="Enter username" />
                      </div>
                      <div className="form-group">
                          <input type="password" className="form-control" id="password" ref="password" placeholder="Password" />
                      </div>
                      <button type="submit" className="btn btn-primary" onClick={this.signup}>Sign Up</button>
                  </form>
              </div>
          </div>
      </div>
    );
  },
  handleUsername: function(event) {
    this.setState({username: event.target.value});
  },
  handlePassdword: function(event) {
    this.setState({password: event.target.value});
  },
  /**
   * Event handler for 'login' events
   */
  login: function(e) {
    e.preventDefault();
    var username = this.state.username;
    var password = this.state.password;
    console.log(username + ' / ' + password);
    this._markSignup(false);
    if (username.length && password.length) {
      LoginActions.login(username, password);
    }
    else {
      this.setState({
        error: 'Please enter all fields'
      });
    }
  },
  signup: function(e) {
    e.preventDefault();
    var username = this.refs.username.value;
    var password = this.refs.password.value;
    console.log(username + ' / ' + password);
    this._markSignup(true);
    if (username.length && password.length) {
      LoginActions.signup(username, password);
    }
    else {
      this.setState({
        error: 'Please enter all fields'
      });
    }
  },
  _markSignup: function(isSignup) {
    this.setState({signup: isSignup});
  }
});

module.exports = Login;