import EmberObject from '@ember/object';
import Route from '@ember/routing/route';
import Ember from 'ember';

export default Route.extend({
  model() {
    return EmberObject.create({
      name: '',
      save: () => Ember.Logger.debug('save')
    });
  }
});
