var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var runsequence = require('run-sequence');
var browsersync = require('browser-sync').create();

gulp.task('hello', function() {
  console.log(args.env);
});

gulp.task('sass', function(){
  console.log('----------------------');
  console.log("Salvando em: "+ 'css/style.css');
  console.log('----------------------');

  return gulp.src('css/*')
  	.pipe(sourcemaps.init())
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
  	.pipe(sourcemaps.write())
    .pipe(gulp.dest('css'))
    .pipe(browsersync.stream());
});

gulp.task('browser-sync', function () {

    browsersync.init({
        open: false,
        // server: {
        //   baseDir: './'
        // }
        proxy: 'localhost:3006'
    });
});

gulp.task('default', ['sass', 'browser-sync'], function() {
  gulp.watch('css/*',['sass']);
  // gulp.watch('index.html').on('change', browsersync.reload);
  // gulp.watch('**/*.js').on('change', browsersync.reload);
});
