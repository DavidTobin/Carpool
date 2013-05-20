App.CountysController = Ember.ArrayController.extend({
  clickSlate: function(county) {
    this.controllerFor('application').set('activeCounty', county.get('id'));
    
    App.Router.router.transitionTo('lifts');
  }
});

App.LiftsController = Ember.ArrayController.extend({  
  content: [],
    
  register: function(controller) {         
    controller.set('registered', true);
    controller.get('store').commit();              
  },
  
  unregister: function(controller) {
    controller.set('registered', false);
    controller.get('store').commit();        
  }
});

App.NewController = Ember.ObjectController.extend({  
  counties: null,  
  
  init: function() {
    this.set('counties', App.County.find());
  },
  
  createNewLift: function(controller) {
    controller.one('didCreate', this, function() {
      this.transitionTo('lifts');
    });
    
    controller.set('destination', controller.get('destinationObj').id);
    
    controller.get('transaction').commit();        
  },
  
  nameTextField: Ember.TextField.extend({    
    classNames: ['title'],
    placeholder: 'Title...'    
  }),
  
  descriptionTextArea: Ember.TextArea.extend({
    classNames: ['textarea'],
    placeholder: 'Description...'
  })
});
