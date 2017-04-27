var Footer = require('./Footer');
var Header = require('./Header');
var MainSection = require('./MainSection');
var React = require('react');
var TodoStore = require('../stores/TodoStore');


/**
 * Retrieve the current TODO data from the TodoStore
 */
function getState() {
  return {
    settings: {}
  };
}

var Setting = React.createClass({
  getInitialState: function() {
    return getState();
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
      <div>
        <h1>Setting</h1>
        <MainSection />
      </div>
    );
  },

  /**
   * Event handler for 'change' events coming from the TodoStore
   */
  _onChange: function() {
    this.setState(getState());
  }

});

module.exports = Setting;