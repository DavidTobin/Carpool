// MomentJS Helper
Ember.Handlebars.registerBoundHelper('date', function(date) {
  return moment(date).calendar();
});


// Returns the current year
Ember.Handlebars.registerBoundHelper('year', function() {
  return (new Date().getFullYear());
});
