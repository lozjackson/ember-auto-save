import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return Ember.Object.create({
      name: '',
      save: () => Ember.Logger.debug('save')
    });
  }
});
