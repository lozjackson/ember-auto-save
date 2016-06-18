import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('auto-save-proxy');
  this.route('auto-save-component');
  this.route('auto-save-mixin');
  this.route('save-method');
});

export default Router;
