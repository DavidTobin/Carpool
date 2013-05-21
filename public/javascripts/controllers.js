App.CountysController = Ember.ArrayController.extend({
  clickSlate: function(county) {    
    this.controllerFor('application').set('activeCounty', county.get('id'));
    
    this.transitionToRoute('lifts');
  }
});

App.LiftController = Ember.ObjectController.extend({
  content: {},
  
  init: function() {
    this._super();             
  },
  
  register: function(controller) {      
    controller.set('registered', true);
    controller.get('store').commit();              
  },
  
  unregister: function(controller) {
    controller.set('registered', false);
    controller.get('store').commit();        
  },
  
  mapView: Ember.View.extend({
    tagName: 'div',
    classNames: ['map-view'],
    
    didInsertElement: function() {
      var _this       = this,
          controller  = _this.get('controller');
                    
      // Google Maps    
      google.maps.visualRefresh = true;    
      controller.set('map', new google.maps.Map(document.getElementsByClassName('map-view')[0], {
        center: new google.maps.LatLng(53.067627, -7.954102),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        zoom: 7
      }));
      
      var coords = controller.get('destinationCoords').split(',');      
      
      controller.set('marker', new google.maps.Marker({
          position: new google.maps.LatLng(coords[0], coords[1]),
          map: controller.get('map'),
          title: controller.get('destination')
      }));
    }
  })
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
  },
  
  openLift: function(controller) {
    this.transitionToRoute('lift', controller);
  }
});

App.NewController = Ember.ObjectController.extend({  
  counties: null,  
  
  init: function() {    
    this._super();
         
    this.set('counties', App.County.find());
  },
  
  createNewLift: function(controller) {
    controller.one('didCreate', this, function() {
      console.log(this);
      this.transitionToRoute('lift', controller);
    });
        
    // Change data to correct format
    controller.set('date', parseInt(moment([controller.get('date'), controller.get('time')].join(" ")).format('X') + "000"));    
    controller.set('location', controller.get('locationObj').id);    
    controller.set('destinationCoords', [controller.get('destinationCoords')[0], controller.get('destinationCoords')[1]].join(","));
    
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
      google.maps.visualRefresh = true;    
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
          if (status === google.maps.GeocoderStatus.OK && typeof(results) !== 'undefined' && results.length > 0) {
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
