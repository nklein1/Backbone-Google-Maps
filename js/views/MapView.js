define([
'jquery',
'underscore',
'backbone',
'handlebars',
'MarkerView',
'InfoWindowView',
'text!templates/mapView.hbs'
], function($, _, Backbone, handlebars, MarkerView, InfoWindowView, mapView) {
  var MapView = Backbone.View.extend({

    // Initialize Google Map
    initMap: function() {
      var mapOptions = { mapTypeId: google.maps.MapTypeId.ROADMAP };
      this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
      // Initialize InfoWindow view
      this.infoWindowView = new InfoWindowView({ map: self.map });
      // Set default map boundary and zoon to fit marker points
      this.bounds = new google.maps.LatLngBounds();
      this.collection.each(this.createMarker, this);
      this.setZoom();
    },

    // Create a new map marker for an individual point
    createMarker: function(station) {
      var markerView = new MarkerView({ model: station, map: this.map });
    },

    // Get position for an individual point and add to the boundary
    formBoundary: function(point) {
      this.bounds.extend(point.getPosition());
    },

    // Orient/zoom map to fit collection of points
    setZoom: function() {
      this.collection.each(this.formBoundary, this);
      this.map.fitBounds(this.bounds);
    },

    render: function() {
      var source = $(mapView).html();
      var template = Handlebars.compile(source);
      $(this.el).html(template);
      this.initMap(); // Initialize map
      return this;
    },

    initialize: function() {
      this.render();
    }

  });
  return MapView;
});
