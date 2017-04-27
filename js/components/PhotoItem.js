var React = require('react');


var PhotoItem = React.createClass({

  getInitialState: function() {
    return {
      photo: null
    };
  },

  /**
   * @return {object}
   */
  render: function() {
    var photo = this.props.photo;

    return (
      <li
        className="item"
        key={photo.objectId}>
        <img src={photo.URL} alt={photo.title} /><br />
        <span>{photo.title}</span>
      </li>
    );
  },

});

module.exports = PhotoItem;