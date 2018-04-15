import EmberObject from '@ember/object';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('auto-save', 'Integration | Component | auto save', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });


  // Template block usage:
  this.render(hbs`
    {{#auto-save}}
      template block text
    {{/auto-save}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});

test('autoSaveProxy', function(assert) {
  assert.expect(2);

  let model = EmberObject.create({ name: 'Dave' });

  this.set('model', model);

  this.render(hbs`
    {{#auto-save model=model as |autoSaveProxy|}}
      {{autoSaveProxy.name}}
    {{/auto-save}}
  `);

  assert.equal(this.$().text().trim(), 'Dave');

  this.set('model.name', 'Simon');
  assert.equal(this.$().text().trim(), 'Simon');
});
