import EmberObject from '@ember/object';
import { run } from '@ember/runloop';
import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('auto-save', 'Unit | Component | auto save', {
  // Specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar'],
  unit: true
});

test('it renders', function(assert) {
  assert.expect(2);

  var component = this.subject();
  assert.equal(component._state, 'preRender');

  this.render();
  assert.equal(component._state, 'inDOM');
});

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

  let component = this.subject();
  this.render();
  component.set('model', model);
  component.set('autoSaveProxy.name', 'Dave');

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

  let component = this.subject();
  this.render();

  component.set('model', model);
  component.set('model.name', 'Dave');
  assert.equal(component.get('autoSaveProxy.name'), 'Dave');

  run.debounce = debounce;
});
