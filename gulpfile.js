//Gulp plugins from NPM
var babel = require('gulp-babel');
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


//------------------------------------------------------------------------------
//Defining directories

var directory = {};
//FROM
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

//TO (destination)
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

//TESTING
directory.test = {};
directory.test.root = './test/';
directory.test.api = directory.test.root + 'api/';
directory.test.browser = directory.test.root + 'browser/';

//------------------------------------------------------------------------------
//Defining file EXTensions
var extension = {};
extension.html = '**/*.{htm,html}';
extension.js = '**/*.js';
extension.jsx = '**/*.jsx';
extension.css = '**/*.css';
extension.scss = '**/*.scss';
extension.fonts = '**/*.{otf,eot,svg,ttf,woff,woff2}';
extension.hbs = '**/*.hbs';

//------------------------------------------------------------------------------
//Defining specific files in specific folders
//A file is: directory/*.extension, such as: ./client/html/**/*.html
//files.js: my javascript files
//files.jslib: external javascript libraries, dependencies

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

files.test = {};
files.test.api = directory.test.api + extension.js;
files.test.browser = directory.test.browser + extension.js;

//------------------------------------------------------------------------------
//Defining Gulp-tasks, which are the steps of the building-process

//The old dev and build files must be cleaned, deleted before every build
gulp.task('clean', function(cb) {
  return del([directory.dest.build,
    directory.dest.jsx,
    directory.client.revmanifest
  ], cb);
});

gulp.task('jscs', function() {
  return gulp.src([files.js])
    .pipe(jscs());
});

//Syntax check of the js files with JSHint
gulp.task('lint', function() {
  return gulp.src([files.js])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('copy:html', function() {
  return gulp.src([files.html])
    .pipe(plumber())
    .pipe(minifyHTML({
      conditionals: true,
      spare: true
    }))
    .pipe(gulp.dest(directory.dest.html))
    .pipe(connect.reload());
});

gulp.task('copy:css-lib', function() {
  return gulp.src([files.csslib])
    .pipe(gulp.dest(directory.dest.csslib))
    .pipe(size({
      "title": "Copied CSS lib files size is "
    }));
});

gulp.task('copy:js-lib', function() {
  return gulp.src([files.jslib])
    .pipe(gulp.dest(directory.dest.jslib))
    .pipe(size({
      "title": "Copied JAVASCRIPT lib files size is "
    }));
});

gulp.task('copy:fonts', function() {
  return gulp.src([files.fonts])
    .pipe(gulp.dest(directory.dest.fonts))
    .pipe(size({
      "title": "Copied FONTS lib files size is "
    }));
});

gulp.task('copy:jsversioned', function() {
  return gulp.src([files.jsversioned])
    .pipe(gulp.dest(directory.dest.js));
});

gulp.task('copy:cssversioned', function() {
  return gulp.src([files.cssversioned])
    .pipe(gulp.dest(directory.dest.css));
});


var handlebarOpts = {
  helpers: {
    assetPath: function(path, context) {
      return ['/assets', context.data.root[path]].join('/');
    }
  }
};
gulp.task('compile-hbs-into-html', function() {
  var manifest = JSON.parse(fs.readFileSync(files.revmanifest, 'utf8'));
  return gulp.src([files.hbs])
    .pipe(handlebars(manifest, handlebarOpts))
    .pipe(rename('index.html'))
    .pipe(gulp.dest(directory.client.html));
});

gulp.task('build:scss', function() {
  return gulp.src([files.scss])
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(concat('allscss.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(rev())
    .pipe(gulp.dest(directory.dest.tempcss))
    .pipe(size({
      "title": "Compiled SCSS to CSS file size is "
    }))
    .pipe(connect.reload());
});

gulp.task('build:js', function() {
  return gulp.src([files.js, files.compiledJsx])
    .pipe(plumber())
    .pipe(babel())
    .pipe(concat('all.js'))
    .pipe(rename('all.min.js'))
    .pipe(rev())
    .pipe(gulp.dest(directory.dest.tempjs))
    .pipe(size({
      "title": "Concatenated JAVASCRIPT file size is "
    }))
    .pipe(connect.reload());
});

gulp.task('build:jsx', function() {
  return gulp.src([files.jsx])
    .pipe(plumber())
    .pipe(react())
    .pipe(gulp.dest(directory.dest.jsx))
    .pipe(size({
      "title": "Converted JSX file to JS file size is "
    }))
    .pipe(connect.reload());
});

gulp.task('versioning', function() {
  return gulp.src([files.tempjs, files.tempcss])
    .pipe(rev())
    .pipe(gulp.dest(directory.dest.versioned))
    .pipe(rev.manifest())
    .pipe(gulp.dest(directory.client.revmanifest));
});

gulp.task('build', function(cb) {
  runSequence(
    'clean',
    ['lint'],
    'build:jsx',
    ['build:scss', 'build:js'],
    'versioning',
    'compile-hbs-into-html',
    ['copy:html', 'copy:jsversioned', 'copy:cssversioned', 'copy:js-lib', 'copy:css-lib', 'copy:fonts'],
    cb
  );
});

gulp.task('connect', function() {
  connect.server({
    root: [directory.dest.build],
    port: 80,
    livereload: true
  });
});

gulp.task('watch', ['build', 'connect'], function() {
  util.log(util.colors.yellow('Watching html, scss, js, jsx files'));
  gulp.watch(files.html, ['copy:html']);
  gulp.watch(files.scss, ['build:scss']);
  gulp.watch(files.js, ['build:js']);
  gulp.watch(files.jsx, ['build:jsx', 'build:js']);
});

gulp.task('test:api', function() {
  return gulp.src(files.test.api)
    .pipe(plumber())
    .pipe(mocha({
      ui: 'tdd',
      reporter: 'spec'
    }));
});

gulp.task('test:browser', function() {
  return gulp.src(files.test.browser)
    .pipe(plumber())
    .pipe(karma({
      configFile: './test/karma.conf.js',
      action: 'run'
    }));
});

gulp.task('test', function(cb) {
  runSequence(
    'test:api',
    'test:browser',
    cb
  );
});

gulp.task('default', ['build']);
