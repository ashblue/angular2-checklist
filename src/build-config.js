/**
 * Place your gulp build configurations here
 * All file paths are relative to the project root
 */
module.exports = {
  // Files that will be pre-compiled into the project and mangled
  dependencies: {
    // @TODO Load all of these files through bower_components, not node_modules
    // Files required to run Angular 2
    core: [
      'node_modules/es6-shim/es6-shim.js',
      'node_modules/angular2/bundles/angular2-polyfills.js',
      'bower_components/traceur-runtime/traceur-runtime.js',
      'bower_components/system.js/dist/system-csp-production.src.js',
      'node_modules/reflect-metadata/Reflect.js',
      // 'bower_components/system.js/dist/system.js',
      'node_modules/angular2/bundles/angular2.js',
      'node_modules/rxjs/bundles/Rx.js'
    ],

    // 3rd party packages to be included with your project
    other: [

    ]
  }
};
