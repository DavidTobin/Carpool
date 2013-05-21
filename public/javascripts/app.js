App = Ember.Application.create({
  ready: function() {
    $(document).bind('ajaxComplete', function() {
      $('.dropdown-toggle').dropdown();
    });
  }
});

App.Store = DS.Store.extend({
  revision: 12,
  adapter: DS.RESTAdapter.extend({
    url: 'http://localhost:3000'
  })
});