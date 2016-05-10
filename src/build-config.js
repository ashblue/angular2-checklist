/**
 * Place your gulp build configurations here
 * All file paths are relative to the project root
 */
module.exports = {
  // Files that will be pre-compiled into the project and mangled
  dependencies: {
    // @TODO Load all of these files through bower_components, not node_modules (note not all have bower packages YET)
    // Some Angular 2 files do not compile properly as individual files for some odd reason
    core: [
      'node_modules/angular2/bundles/angular2-polyfills.js', // Angular 2 no bower repo till out of beta
      'bower_components/es6-shim/es6-shim.js',
      'bower_components/traceur-runtime/traceur-runtime.js',
      'bower_components/system.js/dist/system-csp-production.src.js',
      'node_modules/reflect-metadata/Reflect.js', // No bower repo I could find
      'node_modules/angular2/bundles/angular2.js', // Angular 2 no bower repo till out of beta
      'node_modules/rxjs/bundles/Rx.js' // RXJS 5 no bower repo till out of beta
    ],

    // 3rd party packages as a bundle to be included with your project
    other: [

    ]
  }
};
