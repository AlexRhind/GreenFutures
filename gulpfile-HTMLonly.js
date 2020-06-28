const gulp = require('gulp');// check version, but should be a global install with npm
const sass = require('gulp-sass');


function css(){
  return gulp.src('./assets/sass/**/*.scss')
          .pipe(sass().on('error', sass.logError))
          .pipe(gulp.dest('./css'))
          .pipe(reload({
              stream: true
          }));
}

function watch(){
    gulp.watch('./assets/sass/**/*.scss', css);

}

module.exports.css = css;
module.exports.default = watch;
