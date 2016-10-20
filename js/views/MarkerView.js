define([
'jquery',
'underscore',
'backbone',
'Vent',
'InfoWindowView'
], function($, _, Backbone, Vent, InfoWindowView) {
  var MarkerView = Backbone.View.extend({

    // Trigger Show InfoWindow event
    showWindow: function(e) {
      Vent.trigger('showInfoWindow', [e, this.model]);
    },

    initialize: function(options) {
      var self = this;
      self.model = options.model;
      self.map = options.map;
      var loc = self.model.get('loc');
      self.marker = new google.maps.Marker({
        map: self.map,
        id : self.model.get('wid'), // Include ID so individual markers can be referenced at some point later
        position: new google.maps.LatLng(loc.lat, loc.lng),
        title: self.model.get('name'),
        animation: google.maps.Animation.DROP,
      });
      google.maps.event.addListener(self.marker, 'click', function(e) {
        self.showWindow(this);
      });
    }

  });
  return MarkerView;
});
