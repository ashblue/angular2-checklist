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
      'bower_components/system.js/dist/system.src.js',
      'bower_components/es6-shim/es6-shim.js',
      'node_modules/zone.js/dist/zone.js',
      'node_modules/reflect-metadata/Reflect.js', // No bower repo I could find
      'node_modules/rxjs/bundles/Rx.js' // RXJS 5 no bower repo till out of beta
    ],

    // 3rd party packages as a bundle to be included with your project
    other: [

    ]
  }
};
