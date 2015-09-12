/* jshint esnext: true */

// Gulp plugins from NPM
var babel = require('gulp-babel');
var babelRegister = require('babel-core/register');
var concat = require('gulp-concat');
var connect = require('gulp-connect');
var del = require('del');
var fs = require('fs');
var gulp = require('gulp');
var handlebars = require('gulp-compile-handlebars');
var jscs = require('gulp-jscs');
var jshint = require('gulp-jshint');
var karma = require('gulp-karma');
var minify = require('gulp-minify');
var minifyHTML = require('gulp-minify-html');
var mocha = require('gulp-mocha');
var plumber = require('gulp-plumber');
var react = require('gulp-react');
var rename = require('gulp-rename');
var rev = require('gulp-rev');
var runSequence = require('run-sequence');
var sass = require('gulp-sass');
var size = require('gulp-size');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var util = require('gulp-util');

// ------------------------------------------------------------------------------
// Defining directories

var directory = {};
// FROM
directory.client = {};
directory.client.root = './client/';
directory.client.html = directory.client.root + 'html/';
directory.client.js = directory.client.root + 'js/';
directory.client.jsx = directory.client.root + 'jsx/';
directory.client.tempJsx = directory.client.root + 'temp-jsx/';
directory.client.jslib = directory.client.root + 'jslib/';
directory.client.scss = directory.client.root + 'scss/';
directory.client.csslib = directory.client.root + 'csslib/';
directory.client.fonts = directory.client.root + 'fonts/';
directory.client.hbs = directory.client.root + 'hbs/';
directory.client.revmanifest = directory.client.root + 'rev-manifest/';
directory.client.images = directory.client.root + 'images/';
directory.client.img_high_res = directory.client.images + 'img_high_res/';
directory.client.img_medium_res = directory.client.images + 'img_medium_res/';
directory.client.img_low_res = directory.client.images + 'img_low_res/';

// TO (destination)
directory.dest = {};
directory.dest.build = './build/';
directory.dest.html = directory.dest.build + 'html/';
directory.dest.js = directory.dest.build + 'js/';
directory.dest.tempjs = directory.client.root + 'temp-js/';
directory.dest.jsx = directory.client.root + 'temp-jsx/';
directory.dest.jslib = directory.dest.build + 'jslib/';
directory.dest.img = directory.dest.build + 'img/';
directory.dest.css = directory.dest.build + 'css/';
directory.dest.tempcss = directory.client.root + 'temp-css/';
directory.dest.csslib = directory.dest.build + 'csslib/';
directory.dest.fonts = directory.dest.build + 'fonts/';
directory.dest.versioned = directory.client.root + 'temp-versioned/';
directory.dest.images = directory.dest.build + 'images/';
directory.dest.img_high_res = directory.dest.images + 'img_high_res/';
directory.dest.img_medium_res = directory.dest.images + 'img_medium_res/';
directory.dest.img_low_res = directory.dest.images + 'img_low_res/';

// TESTING
directory.test = {};
directory.test.root = './test/';
directory.test.jsdom = directory.test.root + 'jsdom/';
directory.test.browser = directory.test.root + 'karma/';

// ------------------------------------------------------------------------------
// Defining file EXTensions
var extension = {};
extension.html = '**/*.{htm,html}';
extension.js = '**/*.js';
extension.jsx = '**/*.jsx';
extension.css = '**/*.css';
extension.scss = '**/*.scss';
extension.fonts = '**/*.{otf,eot,svg,ttf,woff,woff2}';
extension.hbs = '**/*.hbs';
extension.jpg = '**/*.jpg';

// ------------------------------------------------------------------------------
// Defining specific files in specific folders
// A file is: directory/*.extension, such as: ./client/html/**/*.html
// files.js: my javascript files
// files.jslib: external javascript libraries, dependencies

var files = {};
files.html = directory.client.html + extension.html;
files.js = directory.client.js + extension.js;
files.jsx = directory.client.jsx + extension.jsx;
files.compiledJsx = directory.client.tempJsx + extension.js;
files.jslib = directory.client.jslib + extension.js;
files.scss = directory.client.scss + extension.scss;
files.csslib = directory.client.csslib + extension.css;
files.fonts = directory.client.fonts + extension.fonts;
files.hbs = directory.client.hbs + extension.hbs;
files.revmanifest = directory.client.revmanifest + 'rev-manifest.json';
files.tempjs = directory.dest.tempjs + extension.js;
files.tempcss = directory.dest.tempcss + extension.css;
files.jsversioned = directory.dest.versioned + extension.js;
files.cssversioned = directory.dest.versioned + extension.css;
files.img_high_res = directory.client.img_high_res + extension.jpg;
files.img_medium_res = directory.client.img_medium_res + extension.jpg;
files.img_low_res = directory.client.img_low_res + extension.jpg;

// Defining test files
files.test = {};
files.test.jsdom = directory.test.jsdom + extension.js;
files.test.browser = directory.test.browser + extension.js;
files.test.firebase = directory.dest.jslib + '/firebase.js';

// ------------------------------------------------------------------------------
// Defining Gulp-tasks, which are the steps of the building-process

// The old dev and build files must be cleaned, deleted before every build
gulp.task('clean', function (cb) {
  return del([directory.dest.build,
    directory.dest.jsx,
    directory.dest.tempjs,
    directory.dest.tempcss,
    directory.dest.versioned,
    directory.client.revmanifest
  ], cb);
});

gulp.task('clean:jsx', function (cb) {
  return del([
    directory.client.revmanifest,
    directory.dest.jsx,
    directory.dest.tempjs,
    directory.dest.versioned + '*.js'
  ], cb);
});

gulp.task('clean:js', function (cb) {
  return del([
    directory.client.revmanifest,
    directory.dest.tempjs,
    directory.dest.versioned + '*.js'
  ], cb);
});

gulp.task('clean:css', function (cb) {
  return del([
    directory.client.revmanifest,
    directory.dest.tempcss,
    directory.dest.versioned + '*.css'
  ], cb);
});

gulp.task('jscs', function () {
  return gulp.src([files.js])
    .pipe(jscs());
});

// Syntax check of the js files with JSHint
gulp.task('lint', function () {
  return gulp.src([files.js])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('copy:low_res_images', function () {
  return gulp.src([files.img_low_res])
    .pipe(gulp.dest(directory.dest.img_low_res))
    .pipe(connect.reload());
});

gulp.task('copy:medium_res_images', function () {
  return gulp.src([files.img_medium_res])
    .pipe(gulp.dest(directory.dest.img_medium_res))
    .pipe(connect.reload());
});

gulp.task('copy:high_res_images', function () {
  return gulp.src([files.img_high_res])
    .pipe(gulp.dest(directory.dest.img_high_res))
    .pipe(connect.reload());
});

gulp.task('copy:html', function () {
  return gulp.src([files.html])
    .pipe(plumber())
    .pipe(minifyHTML({
      conditionals: true,
      spare: true
    }))
    .pipe(gulp.dest(directory.dest.html))
    .pipe(connect.reload());
});

gulp.task('copy:css-lib', function () {
  return gulp.src([files.csslib])
    .pipe(gulp.dest(directory.dest.csslib))
    .pipe(size({
      'title': 'Copied CSS lib files size is '
    }));
});

gulp.task('copy:js-lib', function () {
  return gulp.src([files.jslib])
    .pipe(gulp.dest(directory.dest.jslib))
    .pipe(size({
      'title': 'Copied JAVASCRIPT lib files size is '
    }));
});

gulp.task('copy:fonts', function () {
  return gulp.src([files.fonts])
    .pipe(gulp.dest(directory.dest.fonts))
    .pipe(size({
      'title': 'Copied FONTS lib files size is '
    }));
});

gulp.task('copy:jsversioned', ['build:js', 'versioning'] , function () {
  return gulp.src([files.jsversioned])
    .pipe(gulp.dest(directory.dest.js));
});

gulp.task('copy:cssversioned', ['build:scss', 'versioning'] , function () {
  return gulp.src([files.cssversioned])
    .pipe(gulp.dest(directory.dest.css));
});

var handlebarOpts = {
  helpers: {
    jsPath: function (path, context) {
      return ['../js', context.data.root[path]].join('/');
    },
    cssPath: function (path, context) {
      return ['../css', context.data.root[path]].join('/');
    }
  }
};
gulp.task('compile-hbs-into-html', function () {
  var manifest = JSON.parse(fs.readFileSync(files.revmanifest, 'utf8'));
  return gulp.src([files.hbs])
    .pipe(handlebars(manifest, handlebarOpts))
    .pipe(rename('index.html'))
    .pipe(gulp.dest(directory.client.html));
});

gulp.task('build:scss', function () {
  return gulp.src([files.scss])
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(concat('allscss.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(directory.dest.tempcss))
    .pipe(size({
      'title': 'Compiled SCSS to CSS file size is '
    }));
});

gulp.task('build:js', function () {
  return gulp.src([files.js, files.compiledJsx])
    .pipe(plumber())
    .pipe(babel())
    .pipe(concat('all.js'))
    .pipe(rename('all.min.js'))
    .pipe(gulp.dest(directory.dest.tempjs))
    .pipe(size({
      'title': 'Concatenated JAVASCRIPT file size is '
    }));
});

gulp.task('build:jsx', function () {
  return gulp.src([files.jsx])
    .pipe(plumber())
    .pipe(react())
    .pipe(gulp.dest(directory.dest.jsx))
    .pipe(size({
      'title': 'Converted JSX file to JS file size is '
    }));
});

gulp.task('versioning',  function () {
  return gulp.src([files.tempjs, files.tempcss])
    .pipe(rev())
    .pipe(gulp.dest(directory.dest.versioned))
    .pipe(rev.manifest())
    .pipe(gulp.dest(directory.client.revmanifest));
});

gulp.task('build', function (cb) {
  runSequence(
    'clean',
    ['lint', 'jscs'],
    'build:jsx',
    ['build:scss', 'build:js'],
    'versioning',
    'compile-hbs-into-html',
    ['copy:low_res_images', 'copy:medium_res_images', 'copy:high_res_images'],
    ['copy:html', 'copy:jsversioned', 'copy:cssversioned', 'copy:js-lib', 'copy:css-lib', 'copy:fonts'],
    cb
  );
});

gulp.task('connect', function () {
  connect.server({
    root: [directory.dest.build],
    port: 80,
    livereload: true
  });
});

gulp.task('watch:scss', function (cb) {
  runSequence(
    'clean:css',
    'build:scss',
    'versioning',
    'copy:cssversioned',
    'compile-hbs-into-html',
    'copy:html',
    cb
  );
});

gulp.task('watch:js', function (cb) {
  runSequence(
    'clean:js',
    'build:js',
    'versioning',
    'copy:jsversioned',
    'compile-hbs-into-html',
    'copy:html',
    cb
  );
});

gulp.task('watch:jsx', function (cb) {
  runSequence(
    'clean:jsx',
    'build:jsx',
    'build:js',
    'versioning',
    'copy:jsversioned',
    'compile-hbs-into-html',
    'copy:html',
    cb
  );
});

gulp.task('watch', ['build', 'connect'], function () {
  util.log(util.colors.yellow('Watching html, scss, js, jsx files'));
  gulp.watch(files.html, ['copy:html']);
  gulp.watch(files.scss, ['watch:scss']);
  gulp.watch(files.js, ['watch:js']);
  gulp.watch(files.jsx, ['watch:jsx']);
});

gulp.task('test:mocha', function () {
  return gulp.src([
    files.test.browser
  ])
    .pipe(mocha({
      compilers: {js: 'babel'},
      ui: 'tdd',
      reporter: 'spec'
    }));
});

gulp.task('test:jsdom', function () {
  return gulp.src([
    files.test.jsdom
  ])
    .pipe(mocha({
      compilers: {js: 'babel'},
      ui: 'tdd',
      reporter: 'spec'
    }));
});

gulp.task('test:karma', function () {
  return gulp.src([
    directory.dest.jslib + '/jquery.min.js',
    directory.dest.jslib + '/bootstrap.min.js',
    files.test.firebase,
    directory.dest.jslib + '/react-with-addons.js',
    directory.dest.jslib + '/reactrouter.min.js',
    directory.dest.css + extension.css,
    directory.dest.csslib + extension.css,
    directory.dest.js + extension.js,
    files.test.jsdom,
    directory.test.browser + '**/*.jsx'
  ])
    .pipe(karma({
      configFile: './test/karma/my.conf.js',
      action: 'watch',
      showStack: true
    }));
});

gulp.task('test', function (cb) {
  runSequence(
    'build',
    'test:mocha',
    cb
  );
});

gulp.task('default', ['build']);
