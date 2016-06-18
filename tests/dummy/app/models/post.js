import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  title: DS.attr('string'),
  body: DS.attr('string'),

  save() {
    Ember.Logger.debug('save');
  }
});
