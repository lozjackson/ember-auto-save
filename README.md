# Ember-auto-save

An Ember-cli addon that provides auto-save functionality for ember-data models.

## Demo

http://lozjackson.github.io/ember-auto-save/

## Installation

* `ember install ember-auto-save`

## Use

### AutoSaveProxy

This is a computed property that will that provides an `autoSaveProxy` object.  
The `autoSaveProxy` object will proxy all requests to the `model` property.
Setting properties on the `autoSaveProxy` object will be automatically saved.

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

### AutoSaveComponent

Use this component to wrap a model and provide an autoSaveProxy object.

```
{{#auto-save model=model as |autoSaveProxy|}}
  {{input value=autoSaveProxy.name}}
{{/auto-save}}
```

### AutoSaveMixin

This auto-save mixin overrides the `setUnknownProperty` method, and
triggers the `save` method when properties are set on the model.

```
import AutoSaveMixin from 'ember-auto-save/mixins/auto-save';

let AutoSaveProxy = Ember.ObjectProxy.extend(AutoSaveMixin);

let autoSaveProxy =  AutoSaveProxy.create({
  content: this.get('model')
});
```

### Save() method

This method debounces the `save` method on the `model` provided.  This method is
useful for saving models from within code by calling `save(model)`.

NOTE:  This method does not auto-save the `model`, you have to manually call this method.


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
