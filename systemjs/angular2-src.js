var path = require("path");
var Builder = require('systemjs-builder');

const BUILD_ORIGIN = 'node_modules';
// @TODO Configure with a configuration file to keep things in sync with Gulp.js
const BUILD_OUTPUT = 'tmp/angular2-src';

const PACKAGE_PREFIX = '@angular';
const PACKAGE_POSTFIX = 'index.js';

// Angular2 package names
var packages = [
  'common',
  'compiler',
  'core',
  'http',
  'platform-browser',
  'platform-browser-dynamic',
  'router-deprecated',
  'upgrade'
];

// @TODO Rewrite in ES6 with private variables on the class
var _private = {
  success: null,
  failure: null,
  debug: true,

  successCallback: function () {
    if (this.success) {
      this.success();
    }

    this.clearCallbacks();
  },

  failureCallback: function (err) {
    if (this.failure) {
      this.failure(err);
    }

    this.clearCallbacks();
  },

  clearCallbacks: function () {
    this.success = null;
    this.failure = null;
  }
};

var externalBuild = {
  build: function (success, failure) {
    var count = 0;
    var countTotal = packages.length;

    _private.success = success;
    _private.failure = failure;

    packages.forEach(function (name) {
      var builderExt = new Builder(`${BUILD_ORIGIN}`);
      builderExt.loadConfig('systemjs/system.config.js');

      var src = `${PACKAGE_PREFIX}/${name}/${PACKAGE_POSTFIX}`;
      var target = `${BUILD_OUTPUT}/${name}/index.js`;

      builderExt.bundle(src, target)
        .then(function () {
          if (_private.debug) {
            console.log(`Build Success: src ${src} to ${target}`);
          }

          count++;

          if (count === countTotal) {
            _private.successCallback();
          }
        })
        .catch(function (err) {
          if (_private.debug) {
            console.error(`Build Error: src ${src} to ${target}`);
            console.log(err);
          }

          _private.failureCallback(err);
        });
    });
  }
};

exports.build = externalBuild.build;
