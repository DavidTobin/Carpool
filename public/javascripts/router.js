App.Router.map(function() {  
   this.resource('find');
   this.resource('login');
   
   this.resource('lifts');
   this.resource('lift', { path: 'lift/:lift_id' });        
   this.resource('new');
   this.resource('edit');
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
  setupController: function(controller) {
    var county = this.controllerFor('application').get('activeCounty');
    
    if (typeof(county) !== 'undefined' && county.length > 0) {
      // We're good to go!
    } else {
      return this.transitionTo('find');
    }
  },
  
  renderTemplate: function() {
    var county = this.controllerFor('application').get('activeCounty');
    
    if (typeof(county) !== 'undefined' && county.length > 0) {
      return this.render(); 
    }
  },
  
  model: function(params) {
    var county_id = this.controllerFor('application').get('activeCounty');
    
    if (typeof(county_id) !== 'undefined' && county_id.length > 0) {
      return App.Lift.find({
        county: county_id
      });
    }
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
