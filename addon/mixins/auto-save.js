/**
    @module ember-auto-save
*/
import Mixin from '@ember/object/mixin';
import save from 'ember-auto-save/utils/save';

/**
  This auto-save mixin overrides the `setUnknownProperty` method, and
  triggers the `save()` method when properties are set on the model.

  The example below show how to create an `autoSaveProxy` object.

  ```
  import AutoSaveMixin from 'ember-auto-save/mixins/auto-save';

  let AutoSaveProxy = Ember.ObjectProxy.extend(AutoSaveMixin);

  let autoSaveProxy =  AutoSaveProxy.create({
    content: this.get('model')
  });
  ```

  @class AutoSaveMixin
  @namespace Mixins
*/
export default Mixin.create({

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
    let { content, wait } = this.getProperties('content', 'wait');
    save(content, wait);
  }
});
