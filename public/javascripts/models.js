App.County = DS.Model.extend({  
  name: DS.attr('string')
});

App.Lift = DS.Model.extend({
  name: DS.attr('string'),
  date: DS.attr('number'),
  description: DS.attr('string'),
  paid: DS.attr('boolean'),
  user: DS.attr('string'),
  location: DS.attr('string'),
  destination: DS.attr('string'),
  destinationCoords: DS.attr('string'),
  registered: DS.attr('boolean')
});
