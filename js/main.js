require.config({
  paths: {
//  Libraries
    jquery              : '../vendor/jquery-3.1.1.min',
    backbone            : '../vendor/backbone-1.3.3.min',
    underscore          : '../vendor/underscore-1.8.3.min',
    handlebars          : '../vendor/handlebars-1.3.min',
    text                : '../vendor/text-2.0.15',
    Vent                : 'vent',
//  Main Views
    MapView             : 'views/MapView',
    MarkerView          : 'views/MarkerView',
    InfoWindowView      : 'views/InfoWindowView',
//  Collections
    StationCollection   : 'collections/StationCollection',
//  Models
    StationModel        : 'models/StationModel',
//  Templates
    templates           : '../templates',
    Vent                : 'vent',
  },

  shim: {
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    handlebars: {
      exports: 'handlebars'
    },
  }
});

require([ // Load app module and pass it to definition function
  'app',
  ], function(App) {
    // The 'app' dependency is passed in as 'App'
    App.initialize();
  }
);
