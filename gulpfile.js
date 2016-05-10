var gulp = require('gulp');
var ts = require('gulp-typescript');
var webserver = require('gulp-webserver');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps'); // Sourcemaps must be manually generated due to a bug with typescript gulp compilation

var del = require('del');
var path = require('path');

var tsProject = ts.createProject('src/tsconfig.json');
var bootstrap = require('./src/build-config');

const SRC_ROOT = 'src';
const FOLDER_DIST = 'dist';
const FOLDER_TMP = 'tmp';

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

gulp.task('serve', function () {
  gulp.src(FOLDER_TMP)
    .pipe(webserver({
      livereload: true,
      open: true
    }));
});

// @TODO If production mode Ugflify compiled files
gulp.task('copy-dependencies', function () {
  var bundle = bootstrap.dependencies.core.concat(bootstrap.dependencies.other);

  return gulp.src(bundle)
    .pipe(concat('dependencies.js'))
    .pipe(gulp.dest(FOLDER_TMP + '/'));
});

gulp.task('watch', function () {
  gulp.watch('src/**/*.ts', ['compile-ts']);
  gulp.watch('src/index.html', ['copy-html']);
  gulp.watch('src/build-config', ['copy-dependencies']);
  // gulp.watch('src/**/*.css', ['css']);
});

function clearFolder (folder) {
  del([folder + "/**/*"]);
}

gulp.task('mode-dev', function () {
  process.env.GULP_MODE = 'dev';
});

gulp.task('mode-prod', function () {
  process.env.GULP_MODE = 'prod';
});

gulp.task('default', ['dev']);
gulp.task('dev', ['build', 'watch', 'serve']);
gulp.task('build', ['clear-tmp', 'compile-ts', 'copy-html', 'copy-dependencies']);
