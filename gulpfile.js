var gulp = require('gulp');// check version, but should be a global install with npm
var sass = require('gulp-sass');
var watch = require('gulp-watch');


gulp.task('sass', function(){
  return gulp.src('./assets/sass/**/*.scss')
          .pipe(sass().on('error', sass.logError))
          .pipe(gulp.dest('./build/css'));
});


gulp.task('default', ['sass'], function() {
    return gulp.watch('./assets/sass/**/*.scss', ['sass']);
});
