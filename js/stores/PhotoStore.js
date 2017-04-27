var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var PhotoConstants = require('../constants/PhotoConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _photos = {};
var baseURL = 'http://localhost:1337/parse';
var appId = '111';


/**
 * retrieving all PHOTOS.
 */
function getAll(callback) {
  var url = baseURL + '/classes/Photo';
  $.ajax({
    url: url,
    //dataType: 'json',
    type: 'GET',
    headers: {
      "X-Parse-Application-Id": appId,
      "X-Parse-REST-API-Key": "",
      //"X-Parse-Session-Token": sessionToken
    },
    success: function(data) {
      callback(null, data.results);
      return _photos;
    }.bind(this),
    error: function(xhr, status, err) {
      console.error(url, status, err.toString());
      callback(status, err);
      return null;
    }.bind(this)
  })
}

function setPhotos (photos) {
  _photos = photos;
}

var PhotoStore = assign({}, EventEmitter.prototype, {
	/**
   * Get the entire collection of PHOTOs.
   * @return {object}
   */
  getPhotos: function() {
    return _photos;   
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

  switch(action.actionType) {
    case PhotoConstants.PHOTO_GETALL:
      getAll(function(err, data){
        if (!err) {
          setPhotos(data);
          PhotoStore.emitChange();          
        }
      });
      break;

    default:
      // no op
  }
});

module.exports = PhotoStore;