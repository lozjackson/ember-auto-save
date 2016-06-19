import Ember from 'ember';
import AutoSaveProxy from 'dummy/utils/auto-save';
import { module, test } from 'qunit';

module('Unit | Utility | auto save');

test('autoSaveProxy', function(assert) {
  assert.expect(4);
  let _debounce = Ember.run.debounce;
  Ember.run.debounce = (ctx, fn, time) => {
    assert.equal(typeof ctx, 'object');
    assert.equal(typeof fn, 'function');
    assert.equal(typeof time, 'number');
    fn.call(ctx);
  };
  let model = Ember.Object.create({
    name: '',
    save: () => assert.ok(true)
  });
  let Subject = Ember.Object.extend({
    autoSaveProxy: AutoSaveProxy
  });
  let subject = Subject.create({model});
  subject.set('autoSaveProxy.name', 'Dave');
  Ember.run.debounce = _debounce;
});

test('autoSaveProxy does not save if you set model property directly', function(assert) {
  assert.expect(1);
  let _debounce = Ember.run.debounce;
  Ember.run.debounce = (ctx, fn) => {
    assert.ok(false);
    fn.call(ctx);
  };
  let model = Ember.Object.create({
    name: '',
    save: () => assert.ok(false)
  });
  let Subject = Ember.Object.extend({
    autoSaveProxy: AutoSaveProxy
  });
  let subject = Subject.create({ model });
  subject.set('model.name', 'Dave');
  assert.equal(subject.get('autoSaveProxy.name'), 'Dave');
  Ember.run.debounce = _debounce;
});
