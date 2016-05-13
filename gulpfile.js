/**
 * Gulp compildation for development tools
 * @author Ash Blue
 * @TODO Typescript lint declaration
 * @TODO Do we need JSCS?
 * @TODO Do we need JSHint?
 * @TODO CLI files should include an @author for every file
 * @TODO Use environmental variables to configure gulp build instead of having separate prod and dev build tatsks
 */

var gulp = require('gulp');
var ts = require('gulp-typescript');
var webserver = require('gulp-webserver');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps'); // Sourcemaps must be manually generated due to a bug with typescript gulp compilation
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var zip = require('gulp-zip');

// Node packages
var del = require('del');
var path = require('path');
var fs = require('fs');

// Custom packages
var tsProject = ts.createProject('src/tsconfig.json');
var buildConfig = require('./src/configs/build-config');
var envConfig = require('./src/configs/environment');
var angular2Src = require('./systemjs/angular2-src');
var blueprintBuilder = require('./blueprints/index');

// Constants
const SRC_ROOT = 'src';
const SRC_STYLES = SRC_ROOT + '/styles';
const FOLDER_DIST = 'dist';
const FOLDER_TMP = 'tmp';
const FOLDER_NODE_MODULES = 'node_modules';
const FOLDER_PUBLIC = SRC_ROOT + '/public';

gulp.task('copy-css', function () {
  if (process.env.GULP_MODE === 'dev') {
    return gulp.src(SRC_STYLES + '/index.scss')
      .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(FOLDER_TMP));
  } else {
    return gulp.src(SRC_STYLES + '/index.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(cleanCSS())
      .pipe(gulp.dest(FOLDER_DIST));
  }
});

gulp.task('copy-html', function () {
  var destination = FOLDER_TMP;

  if (process.env.GULP_MODE === 'prod') {
    destination = FOLDER_DIST;
  }

  return gulp
    .src(SRC_ROOT + '/index.html')
    .pipe(gulp.dest(destination))
});

gulp.task('compile-ts', function () {
  var tsResult = tsProject
    .src()
    .pipe(sourcemaps.init())
    .pipe(ts(tsProject));

  if (process.env.GULP_MODE === 'dev') {
    return tsResult.js
      .pipe(sourcemaps.write('.', {
        sourceRoot: function (file) {
          return file.cwd + '/src';
        }
      }))
      .pipe(gulp.dest(FOLDER_TMP));
  } else {
    return tsResult.js
      .pipe(uglify())
      .pipe(gulp.dest(FOLDER_DIST));
  }
});

gulp.task('clear-folders', function () {
  clearFolder(FOLDER_TMP);
  clearFolder(FOLDER_TMP + '/**/*');

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
  return gulp.src('src/configs/system.config.js')
    .pipe(gulp.dest(FOLDER_TMP + '/'));
});

gulp.task('copy-system-map-prod', ['build'], function () {
  return gulp.src('src/configs/system.config-prod.js')
    .pipe(rename('system.config.js'))
    .pipe(gulp.dest(FOLDER_DIST + '/'));
});

// @TODO Trigger after angular source is built
gulp.task('copy-dependencies', ['bundle-angular-src', 'copy-config-env'], function () {
  var bundle = buildConfig.dependencies.core.concat(buildConfig.dependencies.other);

  // Environmental configs are always the first dependency we inject
  bundle.unshift(`${FOLDER_TMP}/environment.js`);

  if (process.env.GULP_MODE === 'dev') {
    return gulp.src(bundle)
      .pipe(sourcemaps.init())
      .pipe(concat('dependencies.js'))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(FOLDER_TMP + '/'));
  } else {
    return gulp.src(bundle)
      .pipe(concat('dependencies.js'))
      .pipe(uglify())
      .pipe(gulp.dest(FOLDER_DIST + '/'));
  }
});

gulp.task('watch', function () {
  gulp.watch(['src/**/*.ts', 'src/tsconfig.json'], ['compile-ts']);
  gulp.watch('src/index.html', ['copy-html']);
  gulp.watch('src/build-config.js', ['copy-dependencies', 'copy-fonts']);
  gulp.watch('src/configs/system.config.js', ['copy-system-map']);
  gulp.watch('src/public/**/*', ['copy-public']);
  gulp.watch(SRC_STYLES + '/**/*.scss', ['compile-css']);
});

function clearFolder (folder) {
  del.sync([folder + "/**/*"]);
}

gulp.task('bundle-angular-src', function (cb) {
  // Build all the angular dependencies
  angular2Src.build(function () {
    console.log('build complete successfully');
    cb();
  }, function () {
    cb(err);
  });
});

gulp.task('copy-fonts', function () {
  return gulp.src(buildConfig.fonts)
    .pipe(gulp.dest(FOLDER_TMP + '/fonts/'));
});

gulp.task('copy-public', function () {
  var dest = FOLDER_TMP;

  if (process.env.GULP_MODE === 'prod') {
    dest = FOLDER_DIST
  }

  return gulp.src(FOLDER_PUBLIC + '/**/*')
    .pipe(gulp.dest(dest + '/public/'));
});

gulp.task('copy-public-to-dist', function () {
  return gulp.src(FOLDER_PUBLIC + '/**/*')
    .pipe(gulp.dest(FOLDER_DIST + '/public/'));
});

gulp.task('copy-angular-src-to-dist', ['build'], function () {
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

gulp.task('dist-zip', ['build-prod'], function () {
  return gulp.src(`${FOLDER_DIST}/**/*`)
    .pipe(zip('dist.zip'))
    .pipe(gulp.dest('.'));
});

gulp.task('copy-config-env', function () {
  var blueprint = blueprintBuilder.getBlueprint('environment.js', [
    {
      key: 'details',
      value: JSON.stringify(envConfig(process.env.GULP_MODE, process.env.GULP_TARGET))
    }
  ]);

  fs.writeFileSync(`${FOLDER_TMP}/${blueprint.filename}`, blueprint.content);
});

gulp.task('mode-dev', function () {
  process.env.GULP_MODE = 'dev';
});

gulp.task('mode-prod', function () {
  process.env.GULP_MODE = 'prod';
});

gulp.task('target-none', function () {
  process.env.GULP_TARGET = null;
});

gulp.task('target-dev', function () {
  process.env.GULP_TARGET = 'dev';
});

gulp.task('target-qa', function () {
  process.env.GULP_TARGET = 'qa';
});

gulp.task('target-prod', function () {
  process.env.GULP_TARGET = 'prod';
});

gulp.task('default', ['dev']);
gulp.task('dev', ['mode-dev', 'build', 'watch', 'serve']);
gulp.task('prod', ['mode-prod', 'target-prod', 'build-prod-zip']);
gulp.task('prod-test', ['prod', 'serve-prod']);

gulp.task('build', [
  'clear-folders',
  'compile-ts',
  'copy-html',
  'copy-public',
  'copy-css',
  'bundle-angular-src',
  'copy-config-env',
  'copy-dependencies',
  'copy-system-map',
  'copy-fonts'
]);

gulp.task('build-prod', [
  'build',
  'copy-app-to-dist',
  'copy-angular-src-to-dist',
  'copy-system-map-prod',
  'copy-public-to-dist'
]);

gulp.task('build-prod-zip', ['build-prod', 'dist-zip']);
