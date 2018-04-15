import save from 'dummy/utils/save';
import { module, test } from 'qunit';
import { run } from '@ember/runloop';

module('Unit | Utility | save');

test('save method should be a function', function(assert) {
  assert.equal(typeof save, 'function');
});

test('save method', function(assert) {
  assert.expect(4);
  let debounce = run.debounce;
  run.debounce = (ctx, fn, time) => {
    assert.equal(typeof ctx, 'object');
    assert.equal(typeof fn, 'function');
    assert.equal(typeof time, 'number');
    fn.call(ctx);
  };
  save({ save: () => assert.ok(true) }, 0);
  run.debounce = debounce;
});

test('save method - look for a model in the content property', function(assert) {
  assert.expect(4);
  let debounce = run.debounce;
  run.debounce = (ctx, fn, time) => {
    assert.equal(typeof ctx, 'object');
    assert.equal(typeof fn, 'function');
    assert.equal(typeof time, 'number');
    fn.call(ctx);
  };
  let model = { save: () => assert.ok(true) };
  let _model = { content: model };
  save(_model, 0);
  run.debounce = debounce;
});
