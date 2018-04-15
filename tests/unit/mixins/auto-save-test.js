import ObjectProxy from '@ember/object/proxy';
import { run } from '@ember/runloop';
import EmberObject from '@ember/object';
import AutoSaveMixin from 'ember-auto-save/mixins/auto-save';
import { module, test } from 'qunit';

module('Unit | Mixin | auto save');

// Replace this with your real tests.
test('it works', function(assert) {
  let AutoSaveObject = EmberObject.extend(AutoSaveMixin);
  let subject = AutoSaveObject.create();
  assert.ok(subject);
});

test('wait should be 2000', function(assert) {
  let AutoSaveObject = EmberObject.extend(AutoSaveMixin);
  let subject = AutoSaveObject.create();
  assert.equal(subject.get('wait'), 2000);
});

test('setUnknownProperty method', function(assert) {
  assert.expect(1);
  let AutoSaveObject = EmberObject.extend(AutoSaveMixin);
  let subject = AutoSaveObject.create({
    save: () => assert.ok(true)
  });
  subject.setUnknownProperty('propertyKey', 'propertyValue');
});

test('save method', function(assert) {
  assert.expect(4);
  let debounce = run.debounce;
  let Model = EmberObject.extend({
    save: () => {
      assert.ok(true);
    }
  });
  let model = Model.create();
  run.debounce = (ctx, fn, time) => {
    assert.deepEqual(ctx, model);
    assert.deepEqual(fn, model.save);
    assert.equal(time, 100);
    fn.call(ctx);
  };
  let AutoSaveProxy = ObjectProxy.extend(AutoSaveMixin);

  let subject = AutoSaveProxy.create({
    wait: 100,
    content: model
  });

  subject.save();
  run.debounce = debounce;
});
