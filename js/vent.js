// Global event dispatcher
define(['underscore', 'backbone'], function (_, Backbone) {
  var Vent = _.extend({}, Backbone.Events);
  return Vent;
});
