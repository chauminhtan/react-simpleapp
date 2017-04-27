var Footer = require('./Footer');
var Header = require('./Header');
var MainSection = require('./MainSection');
var React = require('react');
var TodoStore = require('../stores/TodoStore');


/**
 * Retrieve the current TODO data from the TodoStore
 */
function getTodoState() {
  return {
    allTodos: {},
    areAllComplete: {}
  };
}

var TodoApp = React.createClass({
  title: function() {
    return 'Setting';
  },
  getInitialState: function() {
    return getTodoState();
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
        <h1>Home</h1>
        <MainSection />
      </div>
    );
  },

  /**
   * Event handler for 'change' events coming from the TodoStore
   */
  _onChange: function() {
    this.setState(getTodoState());
  }

});

module.exports = TodoApp;