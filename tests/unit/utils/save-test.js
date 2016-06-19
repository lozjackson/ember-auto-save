import Ember from 'ember';
import save from 'dummy/utils/save';
import { module, test } from 'qunit';

module('Unit | Utility | save');

test('save method should be a function', function(assert) {
  assert.equal(typeof save, 'function');
});

test('save method', function(assert) {
  assert.expect(4);
  let _debounce = Ember.run.debounce;
  Ember.run.debounce = (ctx, fn, time) => {
    assert.equal(typeof ctx, 'object');
    assert.equal(typeof fn, 'function');
    assert.equal(typeof time, 'number');
    fn.call(ctx);
  };
  save({ save: () => assert.ok(true) }, 0);
  Ember.run.debounce = _debounce;
});
