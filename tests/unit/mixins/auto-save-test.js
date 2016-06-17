import Ember from 'ember';
import AutoSaveMixin from 'ember-auto-save/mixins/auto-save';
import { module, test } from 'qunit';

module('Unit | Mixin | auto save');

// Replace this with your real tests.
test('it works', function(assert) {
  let AutoSaveObject = Ember.Object.extend(AutoSaveMixin);
  let subject = AutoSaveObject.create();
  assert.ok(subject);
});

test('wait should be 2000', function(assert) {
  let AutoSaveObject = Ember.Object.extend(AutoSaveMixin);
  let subject = AutoSaveObject.create();
  assert.equal(subject.get('wait'), 2000);
});

test('setUnknownProperty method', function(assert) {
  assert.expect(1);
  let AutoSaveObject = Ember.Object.extend(AutoSaveMixin);
  let subject = AutoSaveObject.create({
    save: () => assert.ok(true)
  });
  subject.setUnknownProperty('propertyKey', 'propertyValue');
});

test('save method', function(assert) {
  assert.expect(4);
  let _debounce = Ember.run.debounce;
  let Model = Ember.Object.extend({
    save: () => {
      assert.ok(true);
    }
  });
  let model = Model.create();
  Ember.run.debounce = (ctx, fn, time) => {
    assert.deepEqual(ctx, model);
    assert.deepEqual(fn, model.save);
    assert.equal(time, 100);
    fn.call(ctx);
  };
  let AutoSaveProxy = Ember.ObjectProxy.extend(AutoSaveMixin);

  let subject = AutoSaveProxy.create({
    wait: 100,
    content: model
  });

  subject.save();
  Ember.run.debounce = _debounce;
});
