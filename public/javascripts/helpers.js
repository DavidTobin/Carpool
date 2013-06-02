// MomentJS Helper
Ember.Handlebars.registerBoundHelper('date', function(date) {
  if (typeof(date) !== 'undefined' && date.length > 0)
    return moment(date).calendar();
});


// Returns the current year
Ember.Handlebars.registerBoundHelper('year', function() {
  return (new Date().getFullYear());
});
