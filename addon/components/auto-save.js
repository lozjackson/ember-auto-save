/**
  @module ember-auto-save
*/
import Component from '@ember/component';
import layout from '../templates/components/auto-save';
import AutoSaveProxy from 'ember-auto-save/utils/auto-save';

/**
  Use this component to wrap a model and provide an autoSaveProxy object.

  ```
  {{#auto-save model=model as |autoSaveProxy|}}
    {{input value=autoSaveProxy.name}}
  {{/auto-save}}
  ```

  @class AutoSaveComponent
  @namespace Components
*/
export default Component.extend({

  layout,

  /**
    @property model
    @type {Object}
  */
  model: null,

  /**
    @property autoSaveProxy
    @type {Object}
  */
  autoSaveProxy: AutoSaveProxy
});
