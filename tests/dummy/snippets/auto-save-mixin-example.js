import ObjectProxy from '@ember/object/proxy';
import AutoSaveMixin from 'ember-auto-save/mixins/auto-save';

// extend ObjectProxy using the AutoSaveMixin to create
// an AutoSaveProxy class
let AutoSaveProxy = ObjectProxy.extend(AutoSaveMixin);

// create an instance of the AutoSaveProxy class.  Set the
// target model as the content property of the proxy.
let autoSaveProxy =  AutoSaveProxy.create({
  content: this.get('model')
});
