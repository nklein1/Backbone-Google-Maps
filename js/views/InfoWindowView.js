define([
'jquery',
'underscore',
'backbone',
'Vent',
'text!templates/InfoWindowView.hbs'
], function($, _, Backbone, Vent, infoWindowView) {
  var InfoWindowView = Backbone.View.extend({

    showWindow: function(e) {
      this.hideWindow();
      this.point = e[0];
      this.setModel(e[1]);
    },

    hideWindow: function() {
      this.model.clear();
      this.infoWindow.close();
    },

    render: function() {
      var source = $(infoWindowView).html();
      var template = Handlebars.compile(source);
      var html = template(this.model.toJSON());
      this.infoWindow.setContent(html);
      // Set this.map to existing Google map
      this.infoWindow.open(this.map, this.point);
      return this;
    },

    // Initialize embedded Street View Panorama
    setStreetView: function(elem, stationLatLng) {
      var pano = new google.maps.StreetViewPanorama(document.getElementById(elem), {
        position: stationLatLng,
        visible: true,
        fullscreenControl: false,
        enableCloseButton: false,
        linksControl: false,
        zoomControl: false,
        panControl: false,
        motionTracking: false,
        showRoadLabels: true,
        addressControl: true,
        addressControlOptions: {
          position: google.maps.ControlPosition.TOP_RIGHT
        }
      });
    },

    /*
      Set InfoWindow model data using defined station data as well ar Geocoded data
      from Google to compare a station's address against the coordinates provided
      More details: https://developers.google.com/maps/documentation/geocoding/start
    */
    setModel: function(station) {
      var self = this;
      self.model.set({
        name: station.get('name'),
        street1: station.attributes.address.street1,
        city: station.attributes.address.city,
        postal: station.attributes.address.postal,
        state: station.attributes.address.state,
        country: station.attributes.address.country,
        lat: station.attributes.loc.lat,
        lng: station.attributes.loc.lng,
        addrLat: '',
        addrLng: ''
      });
      // Retrieve Geocoded LatLngLiteral from Google's Geocoding API
      var geocoder = new google.maps.Geocoder();
      var testAddr = self.model.get('street1') + ',' + self.model.get('city') + ','  +
          self.model.get('state') + ',' + self.model.get('country');
      geocoder.geocode({ 'address': testAddr }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          self.model.set({
            addrLat: results[0].geometry.location.lat(),
            addrLng: results[0].geometry.location.lng()
          })
          self.setStreetView('sv2', { 'lat':self.model.get('addrLat'),'lng':self.model.get('addrLng') });
        } else {
          // Google was unable to return a geocoded LatLngLiteral for the provided address
          self.model.set({
            addrLatLngError: 'Error retrieving Geocoded LatLng from Google (' + status + ')'
          })
        }
        self.setStreetView('sv1', { 'lat':self.model.get('lat'),'lng':self.model.get('lng') });
      });
    },

    initialize: function(options) {
      var self = this;
      self.infoWindow = new google.maps.InfoWindow();
      // Define target map
      self.map = options.map;
      // Define InfoWindowModel
      var InfoWindowModel = Backbone.Model.extend();
      self.model = new InfoWindowModel;
      self.model.on('change', self.render, self);
      if (options.model)
        self.setModel(options);
      self.infoWindow.addListener('closeclick', function() {
        self.hideWindow();
      });
      self.listenTo(Vent, 'showInfoWindow', function(e) {
        self.showWindow(e);
      });
    }

  });
  return InfoWindowView;
});
