/**
	@module ember-auto-save
*/
import Ember from 'ember';

const { assert, get } = Ember;

/**
  The `Save` Utility class provides a method for saving the model using the [Ember.js debounce method](http://emberjs.com/api/classes/Ember.run.html#method_debounce).

  ```
  import { save } from `ember-auto-save`

  save(model);
  ```

  Optionally, you can provide a time to wait before applying the method.  If no
  time value is specified then the default of 2000 (2 seconds) will be used.

  ```
  // save the model after 5 seconds
  save(model, 5000);
  ```

  @class Save
	@namespace Utils
*/

/**
	This method debounces the `save()` method on the `model` provided.  This method is
	useful for saving models from within code by calling `save(model)`.

	Using this method you don't need to wrap your models in an ObjectProxy.

  See the Ember.js API docs for more information on the [debounce method](http://emberjs.com/api/classes/Ember.run.html#method_debounce).

	NOTE:  This method does not auto-save, you have to manually call this method.


  ```
	import { save } from `ember-auto-save`

	save(model);
  ```

	Optionally, you can provide a time to wait before applying the method.  If no
	time value is specified then the default of 2000 (2 seconds) will be used.

  ```
	// save the model after 5 seconds
	save(model, 5000);
  ```

  @method save
	@param {Object} model The model to save
	@param {Integer} time The time to wait before saving.
  @param {Boolean} immediate Trigger the function on the leading instead
    of the trailing edge of the wait interval. Defaults to false.
*/
export default function(model, time, immediate) {
  if ( isNaN(time) || time < 0 ) { time = 2000; }
	assert(`'model' should be an object`, typeof model === 'object');

  // check if there is a save method
  // if there is no save method, then try the model.content property.
  if (!model.save && get(model, 'content.save')) {
    model = get(model, 'content');
  }
  assert(`'model.save' should be a function`, typeof model.save === 'function');

  Ember.run.debounce(model, model.save, time, immediate);
}
