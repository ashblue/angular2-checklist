/**
 * Angular 2 loader for various assets in dev mode. In production mode a separate map will be used
 * to compile all the assets. See `system.config-prod.js`
 * @TODO Compile this into typescript
 */
(function (global) {

  // map tells the System loader where to look for things
  var map = {
    '@angular': 'node_modules/@angular'
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
