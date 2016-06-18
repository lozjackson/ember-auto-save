/**
	@module ember-auto-save
*/
import Ember from 'ember';
import AutoSaveMixin from 'ember-auto-save/mixins/auto-save';

const { computed, assert } = Ember;
const AutoSaveProxy = Ember.ObjectProxy.extend(AutoSaveMixin);

/**
	@class AutoSave
	@namespace Utils
*/

/**
	## AutoSaveProxy

	This is a computed property that will auto-save the underlying `model`.

  Use this property in a controller or component. Set your `model` on the
  controller, then create an `autoSaveProxy` object for the model.
  When you update the proxy object the model will be saved automatically.

  Example:

	controller.js

	```
	import Ember from 'ember';
	import autoSaveProxy from 'ember-auto-save';

	export default Ember.Controller.extend({
		autoSaveProxy,
		model: model
	});
	```

	template.hbs

	```
	{{component model=autoSaveProxy}}
  ```


  The `autoSaveProxy` object will proxy all requests to the `model` property
  Setting properties on the `autoSaveProxy` object will be automatically saved.

  @property autoSaveProxy
  @type {Object} Ember.ObjectProxy
*/
export default computed('model', function() {
	return AutoSaveProxy.create({
		content: this.get('model')
	});
});

/**
	## Save

	This method debounces the 'save' method on the model provided.  This method is
	usefull for saving models from within code by calling `save(model)`.

	Using this method you don't need to wrap your models in an ObjectProxy.

	NOTE:  This method does not auto-save, you have to manually call this method.


  ```
	import { save } from `ember-auto-save/utils/auto-save`

	save( model );
  ```

	Optionally, you can provide a time to wait before applying the method.  If no
	time value is specified then the default of 2000 (2 seconds) will be used.

  ```
	// save the model after 5 seconds
	save( model, 5000 );
  ```

  @method save
	@param {Object} model The model to save
	@param {Integer} time The time to wait before saving.
*/
export function save(model, time) {
  if ( isNaN(time) || time < 0 ) { time = 2000; }
	assert(`'model' should be an object`, typeof model === 'object');
	assert(`'model.save' should be a function`, typeof model.save === 'function');
	Ember.run.debounce(model, model.save, time);
}
