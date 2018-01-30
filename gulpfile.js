const gulp = require('gulp');
const server = require('browser-sync').create();
const plumber = require('gulp-plumber');
const concat = require('gulp-concat');
const cssnext = require('gulp-cssnext');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const csso = require('gulp-csso');
const jsmin = require('gulp-jsmin');
const svgmin = require('gulp-svgmin');
const imagemin = require('gulp-imagemin');
const del = require('del');
const run = require('run-sequence');

// html

gulp.task('html', () => {
  return gulp.src('source/*.html')
    .pipe(gulp.dest('build'))
    .pipe(server.stream());
});

// css

gulp.task('css', () => {
  return gulp.src('source/css/**/*.css')
    .pipe(plumber())
    .pipe(concat('style.css'))
    .pipe(cssnext())
    .pipe(postcss([autoprefixer]))
    .pipe(csso())
    .pipe(gulp.dest('build/css'))
    .pipe(server.stream());
});

// js

gulp.task('js', () => {
  return gulp.src('source/js/*.js')
    .pipe(jsmin())
    .pipe(gulp.dest('build/js'))
    .pipe(server.stream());
});

// fonts

gulp.task('fonts', () => {
  return gulp.src('source/fonts/*.{woff2,woff}')
    .pipe(gulp.dest('build/fonts'))
    .pipe(server.stream());
});

// images

gulp.task('svg', () => {
  return gulp.src('source/img/*.svg')
    .pipe(svgmin())
    .pipe(gulp.dest('build/img'))
    .pipe(server.stream());
});

gulp.task('images', () => {
  return gulp.src('source/img/*.{jpg,png}')
    .pipe(imagemin([
      imagemin.jpegtran({progressive: true}),
      imagemin.optipng({optimizationLevel: 3})
    ]))
    .pipe(gulp.dest('build/img'))
    .pipe(server.stream());
});

gulp.task('icon', () => {
  return gulp.src('source/favicon.ico')
    .pipe(gulp.dest('build'))
    .pipe(server.stream());
});

// build

gulp.task('clear', () => {
  return del('build');
});

gulp.task('build', () => {
  run(
    'clear',
    'fonts',
    'svg',
    'images',
    'icon',
    'css',
    'js',
    'html'
  );
});

// watch

gulp.task('update', ['html'], () => {
  server.reload();
})

gulp.task('watch', () => {
  server.init({
    notify: false,
    server: 'build/'
  });

  gulp.watch('source/fonts/*.{woff2,woff}', ['fonts']);
  gulp.watch('source/img/*.svg', ['svg']);
  gulp.watch('source/img/*.{jpg,png}', ['images']);
  gulp.watch('source/favicon.ico', ['icon']);
  gulp.watch('source/css/**/*.css', ['css']);
  gulp.watch('source/js/*.js', ['js']);
  gulp.watch('source/*.html', ['update']);
});
