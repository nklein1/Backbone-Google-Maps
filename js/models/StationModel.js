define([
'underscore',
'backbone'
], function(_, Backbone) {
  var Station = Backbone.Model.extend({

    // Returns LatLngLiteral object for this station
    getPosition: function() {
      var position = null;
      if (this.attributes.loc) {
        position = {
          lat: this.attributes.loc.lat,
          lng: this.attributes.loc.lng
        };
      }
      return position;
    },

    parse: function(data) {
      return data;
    },

    initialize: function(attributes, options) {
      // Nothing really to do here rn
    }
  });
  return Station;
});
