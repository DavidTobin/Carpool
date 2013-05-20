App.Router.map(function() {  
   this.resource('find');
   this.resource('login');
   
   this.resource('lifts');
   this.resource('lift', function() {
     this.resource('new');
     this.resource('edit');
   });   
});

App.ApplicationRoute = Ember.Route.extend({
  setupController: function(controller, model) {
    this.controllerFor('countys').set('model', App.County.find());        
  }
});

// App.FindRoute = Ember.Route.extend({
//   
// });

App.LiftsRoute = Ember.Route.extend({
  model: function(params) {
    var county_id = this.controllerFor('application').get('activeCounty');
    return App.Lift.find({
      county: county_id
    });
  }
});

App.NewRoute = Ember.Route.extend({
  model: function() {
    var transaction = this.get('store').transaction();    
    // Create record
    var lift = transaction.createRecord(App.Lift, {
      name: null,
      description: null,
      paid: false,
      destination: null,
      date: new Date(),
      user: 0,
      registered: false
    });
    
    return lift;
  }
});
