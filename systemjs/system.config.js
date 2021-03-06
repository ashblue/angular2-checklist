/**
 * Angular 2 loader for various assets in dev mode. In production mode this will be used
 * to compile all the assets
 * @TODO Compile this into typescript and remove Gulp references
 */
// map tells the System loader where to look for things
var map = {
  // 'app': 'app', // 'dist',
  // 'rxjs': 'node_modules/rxjs',
  // 'angular2-in-memory-web-api': 'node_modules/angular2-in-memory-web-api',
  // '@angular': 'node_modules/@angular'
};

// packages tells the System loader how to load when no filename and/or no extension
var packages = {
  // 'app': {main: 'main.js', defaultExtension: 'js'}
  // 'rxjs': {defaultExtension: 'js'}
  // 'angular2-in-memory-web-api': { defaultExtension: 'js' },
};

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
  defaultJSExtensions: true,
  map: map,
  packages: packages
};

System.config(config);
