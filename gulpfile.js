const gulp = require('gulp');
const server = require('browser-sync').create();

// html

gulp.task('html', () => {
  return gulp.src('source/*.html')
    .pipe(gulp.dest('build'))
    .pipe(server.stream());
});

// watch

gulp.task('update', ['html'], () => {
  server.reload();
})

gulp.task('default', () => {
  server.init({
    notify: false,
    server: 'build/'
  });

  gulp.watch('source/*.html', ['update']);
});
