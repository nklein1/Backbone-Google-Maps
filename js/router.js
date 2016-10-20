define([
'jquery',
'underscore',
'backbone',
'require',
], function($, _, Backbone, require) {

  var AppState  = Backbone.Model.extend({});
  var app_state = new AppState();

  var AppRouter = Backbone.Router.extend({
    routes: {
      // Navigation options
      '/'                  : 'showMapView',
      ''                   : 'showMapView', // root behavior here
      '*actions'           : 'showMapView'  // 404 behavior here
    },

    showMapView: function() {
      document.title = 'Mapping Demo';
      var self = this;
      var s = require(['StationCollection'], function(StationCollection) {
        var Stations = new StationCollection();
        Stations.fetch({
          success: function(data) {
            var q = require(['MapView'], function(MapView) {
              var currentView = new MapView({el: '#content', collection: data});
            });
          },
          error: function(a,b) {
            console.log('There was an error retrieving station data');
          }
        });
      });
    }
  });

  var initialize = function() {
    var app_router = new AppRouter();
    Backbone.history.start();
  };

  return {
    initialize: initialize
  };
});
