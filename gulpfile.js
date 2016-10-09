const elixir = require('laravel-elixir');
var gulp = require('gulp');
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var notify = require('gulp-notify');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var cssnano = require('gulp-cssnano');
var sass = require('gulp-ruby-sass');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');

// require('laravel-elixir-vue-2');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

// elixir(mix => {
//     mix.sass('app.scss')
//        .webpack('app.js');
// });

gulp.task('scripts', function() {
  return gulp.src(['public/app/**/*.js'])
    .pipe(sourcemaps.init())
    .pipe(concat('admin-bundle.js'))
    .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop()) 
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/js/'))
    .pipe(notify({message : 'JS files successfully concated and reduced'}));
});

gulp.task('jshint', function() {
  return gulp.src('public/app/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('styles', function(){
  return sass('public/**/*.scss', { style: 'expanded'})
    .pipe(gulp.dest('public/css/'))
    .pipe(cssnano())
    .pipe(concat('admin-bundle.css'))
    .pipe(notify({message : 'Scss Successfully compiled and reduced'}));
});

gulp.task('watch', function() {
  // Watch .scss files
  gulp.watch('public/css/*.scss', ['styles']);

  // Watch .js files
  gulp.watch('public/app/**/*.js', ['scripts']);
});