import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('auto-save-proxy');
  this.route('auto-save-component');
  this.route('auto-save-mixin');
  this.route('save-method');
});

export default Router;
