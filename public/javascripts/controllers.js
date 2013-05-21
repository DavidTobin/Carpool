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
    this._super();
         
    this.set('counties', App.County.find());
  },
  
  setupMaps: function() {
    var _this = this;
    // Google Maps       
    _this.set('map', new google.maps.Map(document.getElementById('map-view'), {
      center: new google.maps.LatLng(53.067627, -7.954102),
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      zoom: 7
    }));
    
    _this.set('geocoder', new google.maps.Geocoder());
    
    google.maps.event.addListener(_this.get('map'), 'click', function(e) {
      _this.set('destinationCoords', [e.latLng.jb, e.latLng.kb]);     
      
      _this.get('geocoder').geocode({
        latLng: e.latLng
      }, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          _this.set('destination', results[1].formatted_address);            
        }
      });   
    });        
  },
  
  createNewLift: function(controller) {
    controller.one('didCreate', this, function() {
      this.transitionToRoute('lifts');
    });
        
    controller.set('date', parseInt(moment([controller.get('date'), controller.get('time')].join(" ")).format('X') + "000"));    
    controller.set('location', controller.get('locationObj').id);
    
    controller.get('transaction').commit();        
  },
  
  nameTextField: Ember.TextField.extend({    
    classNames: ['title'],
    placeholder: 'Title...'    
  }),
  
  destinationTextField: Ember.TextField.extend({   
    classNames: ['input'],     
    placeholder: 'Destination...',
    
    didInsertElement: function(s) {
      var _this       = this,
          controller  = _this.get('controller');
                
      // Google Maps       
      controller.set('map', new google.maps.Map(document.getElementById('map-view'), {
        center: new google.maps.LatLng(53.067627, -7.954102),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        zoom: 7
      }));
      
      controller.set('geocoder', new google.maps.Geocoder());
      
      google.maps.event.addListener(controller.get('map'), 'click', function(e) {
        controller.set('destinationCoords', [e.latLng.jb, e.latLng.kb]);     
        
        controller.get('geocoder').geocode({
          latLng: e.latLng
        }, function(results, status) {
          if (status === google.maps.GeocoderStatus.OK) {
            controller.set('destination', results[1].formatted_address);            
          }
        });   
      }); 
      
      $('html, body').animate({
        scrollTop: 0
      }, 50);       
    }   
  }),
  
  descriptionTextArea: Ember.TextArea.extend({
    classNames: ['textarea'],
    placeholder: 'Description...',        
  }),  
  
  datePicker: Ember.TextField.extend({
    type: 'date'
  }),
  
  timePicker: Ember.TextField.extend({
    type: 'time'
  })
});
