var Footer = require('./Footer');
var Header = require('./Header');
//var Breadcrumb = require('./Breadcrumb');
var Login = require('./Login');
var React = require('react');
var LoginStore = require('../stores/LoginStore');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;


/**
 * Retrieve the current TODO data from the LoginStore
 */
function getState() {
  var user = LoginStore.getCurrentUser();
  console.log(user);
  return {
    data: user
  };
}

var Main = React.createClass({
  getInitialState: function() {
    return getState();
  },

  componentDidMount: function() {
    LoginStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    LoginStore.removeChangeListener(this._onChange);
  },
  /**
   * @return {object}
   */
  render: function() {
    console.log(this.state.data);
    if (!!this.state.data && this.state.data.sessionToken) {
      return (
        <div>
          <Header userinfo={this.state.data.username} />
          <section>
            <div className="container">
              {this.props.children}
            </div>
          </section>
          <Footer />
        </div>
      );
    }

    return (
      <Login />
    );
  },

  /**
   * Event handler for 'change' events coming from the LoginStore
   */
  _onChange: function() {
    this.setState(getState());
  }

});

module.exports = Main;