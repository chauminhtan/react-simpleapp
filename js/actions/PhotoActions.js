var AppDispatcher = require('../dispatcher/AppDispatcher');
var PhotoConstants = require('../constants/PhotoConstants');

var PhotoActions = {

  /**
   * retrieving all photos
   */
  getAll: function() {
    AppDispatcher.dispatch({
      actionType: PhotoConstants.PHOTO_GETALL
    });
  },

};

module.exports = PhotoActions;