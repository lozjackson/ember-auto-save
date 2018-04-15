import EmberObject from '@ember/object';
import AutoSaveProxy from 'dummy/utils/auto-save';
import { module, test } from 'qunit';
import { run } from '@ember/runloop';

module('Unit | Utility | auto save');

test('autoSaveProxy', function(assert) {
  assert.expect(4);
  let debounce = run.debounce;
  run.debounce = (ctx, fn, time) => {
    assert.equal(typeof ctx, 'object');
    assert.equal(typeof fn, 'function');
    assert.equal(typeof time, 'number');
    fn.call(ctx);
  };
  let model = EmberObject.create({
    name: '',
    save: () => assert.ok(true)
  });
  let Subject = EmberObject.extend({
    autoSaveProxy: AutoSaveProxy
  });
  let subject = Subject.create({model});
  subject.set('autoSaveProxy.name', 'Dave');
  run.debounce = debounce;
});

test('autoSaveProxy does not save if you set model property directly', function(assert) {
  assert.expect(1);
  let debounce = run.debounce;
  run.debounce = (ctx, fn) => {
    assert.ok(false);
    fn.call(ctx);
  };
  let model = EmberObject.create({
    name: '',
    save: () => assert.ok(false)
  });
  let Subject = EmberObject.extend({
    autoSaveProxy: AutoSaveProxy
  });
  let subject = Subject.create({ model });
  subject.set('model.name', 'Dave');
  assert.equal(subject.get('autoSaveProxy.name'), 'Dave');
  run.debounce = debounce;
});
