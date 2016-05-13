/**
 * System.js mappings that will replace system.config.js on production build
 * @TODO Compile this into typescript
 * @TODO Compile with system.config.js and strip out / include what we need with a conditional comment parser via Gulp.js
 */
(function (global) {

  // map tells the System loader where to look for things
  var map = {
    '@angular': 'angular2-src'
  };

  // packages tells the System loader how to load when no filename and/or no extension
  var packages = {};

  var packageNames = [
    '@angular/common',
    '@angular/compiler',
    '@angular/core',
    '@angular/http',
    '@angular/platform-browser',
    '@angular/platform-browser-dynamic',
    '@angular/router-deprecated',
    '@angular/testing',
    '@angular/upgrade'
  ];

  // add package entries for angular packages in the form '@angular/common': { main: 'index.js', defaultExtension: 'js' }
  packageNames.forEach(function (pkgName) {
    packages[pkgName] = {main: 'index.js', defaultExtension: 'js'};
  });

  var config = {
    map: map,
    packages: packages
  };

  System.config(config);
})(this);
