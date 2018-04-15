/**
	@module ember-auto-save
*/
import ObjectProxy from '@ember/object/proxy';
import AutoSaveMixin from 'ember-auto-save/mixins/auto-save';
import { computed } from '@ember/object';


const AutoSaveProxy = ObjectProxy.extend(AutoSaveMixin);

/**
	The `AutoSave` utility class provides the `autoSaveProxy` computed property.
	This property can be used in controllers or components and will proxy `get`/`set`
	requests to the `model`.  Setting properties on the `AutoSaveProxy` object will
	trigger an automatic save to be scheduled after a short delay.

	controller/component

	```
	import Ember from 'ember';
	import autoSaveProxy from 'ember-auto-save';

	export default Ember.Controller.extend({
		autoSaveProxy,
		model: model
	});
	```

	template

	```
	{{input value=autoSaveProxy.name}}
  ```

	@class AutoSave
	@namespace Utils
*/

/**
	## AutoSaveProxy

	This is a computed property that provides an `autoSaveProxy` object.  The `autoSaveProxy`
	object will proxy all requests to the `model` property.  Setting properties on the
	`autoSaveProxy` object will be automatically saved.

	Use this property in a controller or component. Set your `model` on the
	controller, then create an `autoSaveProxy` object for the model.

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
	{{input value=autoSaveProxy.name}}
  ```

  @property autoSaveProxy
  @type {Object} Ember.ObjectProxy
*/
export default computed('model', function() {
	return AutoSaveProxy.create({
		content: this.get('model')
	});
});
