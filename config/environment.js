/* eslint-env node */
'use strict';

// Necesario para ember-metrics
var contentSecurityPolicy = {
  'default-src': "'none'",
  'script-src': "'self' www.google-analytics.com",
  'font-src': "'self'",
  'connect-src': "'self' www.google-analytics.com",
  'img-src': "'self'",
  'style-src': "'self'",
  'media-src': "'self'"
};

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'mi-guatemala',
    environment,
    rootURL: '/',
    locationType: 'hash',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    metricsAdapters: [{
        name: 'GoogleAnalytics',
        environments: ['production', 'development'],
        config: {
          id: 'UA-131753715-1',
          // Use verbose tracing of GA events
          trace: environment === 'development',
          // Ensure development env hits aren't sent to GA
          sendHitTask: environment !== 'development',
          // Specify Google Analytics plugins
          // require: ['ecommerce']
        }
      }],

    APP: {
      dataSpreadsheetSourceUrl: '/data-spreadsheet-url',
      configSpreadsheetSourceUrl: '/config-spreadsheet-url',

      // Establecer null para recibir datos desde spreadsheet en vivo.
      // En otro caso estrablecer la url de '/static-files/' los archivos descargados.

      // Datos desde spreadsheets en vivo.
      staticFilesUrl: null

      // Datos desde localhost => desarrollo
      // staticFilesUrl: 'http://192.168.250.206:4200/static-files/'
      // staticFilesUrl: 'http://localhost:4200/static-files/'

      // Datos desde gh-pages
      // staticFilesUrl: 'http://miguatemala.redciudadana.org/static-files/'
    },

    disqus: {
      shortname: 'candidatos2019'
    },

    contentSecurityPolicy: contentSecurityPolicy
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV.contentSecurityPolicy = contentSecurityPolicy;
    ENV.contentSecurityPolicy['script-src'] = "'self' 'unsafe-eval' 192.168.250.206:* 172.20.10.9:*";

    ENV.APP.staticFilesUrl = 'http://localhost:4200/static-files/';
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    ENV.APP.staticFilesUrl = 'http://www.candidatos.gt/static-files/';
  }

  return ENV;
};
