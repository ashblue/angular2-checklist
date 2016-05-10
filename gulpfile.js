var gulp = require('gulp');
var ts = require('gulp-typescript');
var del = require('del');
var path = require('path');
var webserver = require('gulp-webserver');
var bootstrap = require('./src/build-config');

// Sourcemaps must be manually generated due to a bug with typescript gulp compilation
var sourcemaps = require('gulp-sourcemaps');

const SRC_ROOT = 'src';
const FOLDER_DIST = 'dist';
const FOLDER_TMP = 'tmp';

var tsProject = ts.createProject('src/tsconfig.json');

// gulp.task('default', function() {
  // Bare bones task that runs typescript
    // typscript linter
  // Do we need JSCS?
  // Do we need JSHint?
// });

gulp.task('copy-html', function () {
  return gulp
    .src(SRC_ROOT + '/index.html')
    .pipe(gulp.dest(FOLDER_TMP))
});

gulp.task('compile-ts', function () {
  var tsResult = tsProject
    .src()
    .pipe(sourcemaps.init())
    .pipe(ts(tsProject));

  return tsResult.js
    .pipe(sourcemaps.write('.', {
      sourceRoot: function (file) {
        return file.cwd + '/src';
      }
    }))
    .pipe(gulp.dest(FOLDER_TMP));
});

gulp.task('clear-tmp', function () {
  clearFolder(FOLDER_TMP);
  clearFolder(FOLDER_TMP + '/**/*');
});

gulp.task('webserver', function () {
  gulp.src(FOLDER_TMP)
    .pipe(webserver({
      open: true
    }));
});

gulp.task('webserver-livereload', function () {

});

// @TODO Concatenate into a single file
// @TODO Include bower files
// @TODO Create a dependency list pulled in via export
// @TODO Ugflify compiled files
gulp.task('copy-dependencies', function () {
  return gulp.src([
      'bower_components/system.js/dist/system-csp-production.src.js',
      'bower_components/system.js/dist/system.js',
      'node_modules/reflect-metadata/Reflect.js',
      'node_modules/angular2/bundles/angular2.js',
      'node_modules/angular2/bundles/angular2-polyfills.js',
      'node_modules/es6-shim/es6-shim.js',
      'node_modules/es6-shim/es6-shim.map',
      'bower_components/traceur-runtime/traceur-runtime.js',
      'node_modules/rxjs/bundles/Rx.js',
      'node_modules/rxjs/bundles/Rx.js.map'
    ])
    .pipe(gulp.dest(FOLDER_TMP + '/lib'));
});

// gulp.task('copy-dependencies', function () {
//   return gulp.src(bootstrap.dependencies.core)
//     .pipe(gulp.dest(FOLDER_TMP + '/lib'));
// });

function clearFolder (folder) {
  del([folder + "/**/*"]);
}

gulp.task('default', ['clear-tmp', 'compile-ts', 'copy-html', 'copy-dependencies', 'webserver']);
