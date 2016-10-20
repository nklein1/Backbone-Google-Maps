define([
'underscore',
'backbone',
'StationModel'
], function(_, Backbone, StationModel){
  var StationCollection = Backbone.Collection.extend({
    model: StationModel,

    url: '/js/stations.json',

    success: function (e) {
      console.log('Station data loaded successfully');
    },

    error: function (e) {
      console.log('An error occurred while loading station data');
    },

    parse: function(data) {
      return data;
    },

    initialize: function(model, data) {
      // Nothing really to do here rn
    }
  });
  return StationCollection;
});
