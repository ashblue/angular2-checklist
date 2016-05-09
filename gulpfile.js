var gulp = require('gulp');
var ts = require('gulp-typescript');
var del = require('del');
var path = require('path');

// Sourcemaps must be manually generated due to a bug with typescript gulp compilation
var sourcemaps = require('gulp-sourcemaps');

const FOLDER_DIST = 'dist';
const FOLDER_TMP = 'tmp';

var tsProject = ts.createProject('src/tsconfig.json');

// gulp.task('default', function() {
  // Bare bones task that runs typescript
    // typscript linter
  // Do we need JSCS?
  // Do we need JSHint?
// });

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

gulp.task('clear-tmp', clearFolder(FOLDER_TMP));

function clearFolder (folder) {
  del([folder + "/**/*"]);
}

gulp.task('default', ['clear-tmp', 'compile-ts']);
