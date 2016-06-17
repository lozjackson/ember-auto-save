/**
    @module ember-auto-save
*/
import Ember from 'ember';

/**
    This auto-save mixin overrides the `setUnknownProperty` method, and
    triggers the `save` method when properties are set on the model.

    Use this mixin with an ObjectProxy - Wrap the model in the ObjectProxy.

    @class AutoSaveMixin
    @namespace Mixins
*/
export default Ember.Mixin.create({

  /**
    The number of milliseconds to wait for debouncing

    @property wait
    @type {Number}
    @default 2000
  */
  wait: 2000,

  /**
    Set property, and call save.

    @method setUnknownProperty
    @param {String} key
    @param {Object} value
    @private
    @return {object} returns the value
  */
  setUnknownProperty(...args) {
    let value = this._super(...args);
    this.save();
    return value;
  },

  /**
    Save the underlying record, debouncing with the interval defined in `wait`.

    @method save
    @private
  */
  save() {
    let { content:model, wait } = this.getProperties('content', 'wait');
    Ember.run.debounce(model, model.save, wait);
  }
});
