import Application from '@ember/application';
import Ember from 'ember';
import loadInitializers from 'ember-load-initializers';
import * as Sentry from '@sentry/browser';
import * as Integrations from '@sentry/integrations';
import defineModifier from 'ember-concurrency-retryable/define-modifier';
import Resolver from './resolver';
import config from './config/environment';

if (config.environment !== 'development') {
  Sentry.init({
    dsn: 'https://f93ba4c5c59740c4b70cdb571b54d6da@sentry.io/1492094',
    integrations: [new Integrations.Ember()],
    environment: config.environment,
  });
}

// necessary for applying e-concurrency extensions
// to their decorators
// see: https://github.com/maxfierke/ember-concurrency-retryable/issues/5
defineModifier();

const App = Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver,
});

// temporary fix due to importing registerWaiter
// see: https://github.com/emberjs/ember.js/issues/15670
/* eslint-disable ember-suave/no-direct-property-access, no-undef */
if (typeof Ember.Test === 'undefined') {
  Ember.Test = {
    registerWaiter() {

    },
  };
}
/* eslint-enable ember-suave/no-direct-property-access, no-undef */

Ember.MODEL_FACTORY_INJECTIONS = true;

loadInitializers(App, config.modulePrefix);

export default App;
