var serverURL = 'http://localhost:3000';

App.Router.map(function() {  
   this.route('find');
   this.route('login');
   this.route('lifts', { path: '/lifts/:county' }); 
   
   this.resource('lift', function() {
    this.route('index', { path: '/:lift_id' });    
    this.route('edit');
    this.route('new');
   });         
});

App.ApplicationRoute = Ember.Route.extend({
  setupController: function(controller, model) {
    this.controllerFor('countys').set('model', App.County.find());        
  }
});


App.LiftIndexRoute = Ember.Route.extend({
  renderTemplate: function() {
    this.render('lift/index');
    this.render('map_sidebar', {
      outlet: 'sidebar'
    });
  },
  
  model: function(params) {           
    return App.Lift.find(params.lift_id);
  }
});

App.LiftsRoute = Ember.Route.extend({               
  setupController: function(controller, model) {          
    controller.set('content', App.Lift.find({
      county: model.county || model.id
    }));
  },
  
  serialize: function(model) {      
    return { county: model.id };
  }
});

App.LiftNewRoute = Ember.Route.extend({  
  renderTemplate: function() {
    this.render({
      into: 'application'
    });    
  },
  
  /*setupController: function(controller, model) {
    this._super();
    
    // Set default date and time
    var d     = new Date(),
        time  = [("0" + d.getHours()).slice(-2) ,("0" + d.getMinutes()).slice(-2)].join(":"),
        date  = [d.getFullYear(), ("0" + (d.getMonth() + 1)).slice(-2), ("0" + d.getDate()).slice(-2)].join("-");
    
    controller.set('time', time);
    controller.set('date', date);
  },*/
    
  model: function() {
    return App.Lift.createRecord();
  }
});
