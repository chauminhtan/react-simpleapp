var Footer = require('./Footer');
var Header = require('./Header');
var React = require('react');
var PhotoStore = require('../stores/PhotoStore');
var PhotoActions = require('../actions/PhotoActions');
var PhotoItem = require('./PhotoItem');

/**
 * Retrieve the current TODO data from the TodoStore
 */
function getState() {
  var photos = PhotoStore.getPhotos();
  return {
    photos: photos
  };
}

var Photo = React.createClass({
  getInitialState: function() {
    return getState();
  },
  componentWillMount: function() {
    PhotoStore.addChangeListener(this._onChange);
  },
  componentDidMount: function() {
    PhotoActions.getAll();
  },
  componentWillUnmount: function() {
    PhotoStore.removeChangeListener(this._onChange);
  },

  /**
   * @return {object}
   */
  render: function() {
    var allPhotos = this.state.photos;
    var photos = [];

    for (var key in allPhotos) {
      photos.push(<PhotoItem key={key} photo={allPhotos[key]} />);
    }
    return (
      <div>
        <h1>Photo</h1>
        <ul id="photo-list" className="gallery">
          {photos}
        </ul>
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

module.exports = Photo;