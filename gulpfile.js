/**
 * Gulp compildation for development tools
 * @author Ash Blue
 * @TODO Exclude sourcemaps during production mode
 * @TODO If production mode Ugflify compiled files
 * @TODO If production mode compress css
 * @TODO Destination directory for fonts taken from build-config.js
 * @TODO Typescript lint declaration
 * @TODO Do we need JSCS?
 * @TODO Do we need JSHint?
 * @TODO CLI files should include an @author for every file
 * @TODO Include build configuration target (dev, prod, qa)
 */

var gulp = require('gulp');
var ts = require('gulp-typescript');
var webserver = require('gulp-webserver');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps'); // Sourcemaps must be manually generated due to a bug with typescript gulp compilation
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

// Node packages
var del = require('del');
var path = require('path');

// Custom packages
var tsProject = ts.createProject('src/tsconfig.json');
var bootstrap = require('./src/build-config');
var angular2Src = require('./systemjs/angular2-src');

// Constants
const SRC_ROOT = 'src';
const SRC_STYLES = SRC_ROOT + '/styles';
const FOLDER_DIST = 'dist';
const FOLDER_TMP = 'tmp';
const FOLDER_NODE_MODULES = 'node_modules';

gulp.task('compile-css', function () {
  return gulp.src(SRC_STYLES + '/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(FOLDER_TMP));
});

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

gulp.task('clear-dist', function () {
  clearFolder(FOLDER_DIST);
  clearFolder(FOLDER_DIST + '/**/*');
});

gulp.task('serve', ['build'], function () {
  // Load static assets from node modules
  gulp.src(FOLDER_NODE_MODULES)
    .pipe(webserver({
      port: 8010
    }));

  // Puke out the dynamically compiled files
  gulp.src(FOLDER_TMP)
    .pipe(webserver({
      livereload: true,
      open: true,
      proxies: [
        {
          source: '/node_modules',
          target: 'http://localhost:8010'
        }
      ]
    }));
});

gulp.task('serve-prod', ['build-prod'], function () {
  gulp.src(FOLDER_DIST)
    .pipe(webserver({
      open: true
    }));
});

gulp.task('copy-system-map', function () {
  return gulp.src('src/system.config.js')
    .pipe(gulp.dest(FOLDER_TMP + '/'));
});

gulp.task('copy-system-map-prod', ['build'], function () {
  return gulp.src('src/system.config-prod.js')
    .pipe(rename('system.config.js'))
    .pipe(gulp.dest(FOLDER_DIST + '/'));
});

gulp.task('copy-dependencies', function () {
  var bundle = bootstrap.dependencies.core.concat(bootstrap.dependencies.other);

  return gulp.src(bundle)
    .pipe(sourcemaps.init())
    .pipe(concat('dependencies.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(FOLDER_TMP + '/'));
});

gulp.task('watch', function () {
  gulp.watch(['src/**/*.ts', 'src/tsconfig.json'], ['compile-ts']);
  gulp.watch('src/index.html', ['copy-html']);
  gulp.watch(['src/build-config.js', 'src/system.config.js'], ['copy-dependencies']);
  gulp.watch(SRC_STYLES + '/**/*.scss', ['compile-css']);
});

function clearFolder (folder) {
  del.sync([folder + "/**/*"]);
}

gulp.task('bundle-angular-src', ['build'], function (cb) {
  // Build all the angular dependencies
  angular2Src.build(function () {
    console.log('build complete successfully');
    cb();
  }, function () {
    cb(err);
  });
});

gulp.task('copy-tmp-to-dist', ['build'], function () {
  return gulp.src([
    `${FOLDER_TMP}/**/*`,
    `!${FOLDER_TMP}/angular2-src`,
    `!${FOLDER_TMP}/angular2-src/**/*`,
    `!${FOLDER_TMP}/dependencies.js`,
    `!${FOLDER_TMP}/app.js`,
    `!${FOLDER_TMP}/**/*.map`,
    `!${FOLDER_TMP}/system.config.js`
  ]).pipe(gulp.dest(FOLDER_DIST + '/'));
});

gulp.task('copy-dependencies-to-dist', ['copy-dependencies'], function () {
  return gulp.src([
    `${FOLDER_TMP}/dependencies.js`,
    `${FOLDER_TMP}/angular2-src/**/*`
  ])
    .pipe(concat('dependencies.js'))
    .pipe(uglify())
    .pipe(gulp.dest(FOLDER_DIST + '/'));
});

gulp.task('copy-angular-src-to-dist', ['bundle-angular-src'], function () {
  return gulp.src([
    `${FOLDER_TMP}/angular2-src/**/*`
  ])
    .pipe(uglify())
    .pipe(gulp.dest(FOLDER_DIST + '/angular2-src/'));
});

gulp.task('copy-app-to-dist', ['compile-ts'], function () {
  return gulp.src(`${FOLDER_TMP}/app.js`)
    .pipe(uglify())
    .pipe(gulp.dest(FOLDER_DIST + '/'));
});

gulp.task('mode-dev', function () {
  process.env.GULP_MODE = 'dev';
});

gulp.task('mode-prod', function () {
  process.env.GULP_MODE = 'prod';
});

gulp.task('default', ['dev']);
gulp.task('dev', ['mode-dev', 'build', 'watch', 'serve']);
gulp.task('prod', ['mode-prod', 'build-prod']);
gulp.task('prod-test', ['prod', 'serve-prod']);

gulp.task('build', ['clear-tmp', 'compile-ts', 'copy-html', 'compile-css', 'copy-dependencies', 'copy-system-map']);
gulp.task('build-prod', ['clear-dist', 'build', 'bundle-angular-src', 'copy-tmp-to-dist', 'copy-dependencies-to-dist', 'copy-app-to-dist', 'copy-angular-src-to-dist', 'copy-system-map-prod']);
