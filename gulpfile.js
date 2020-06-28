const autoprefixer = require("autoprefixer");
//const cssnano = require("cssnano");
const gulp = require("gulp");
const phpConnect = require('gulp-connect-php');
const changed = require('gulp-changed');
//const postcss = require("gulp-postcss");
//const plumber = require("gulp-plumber");
//const rename = require("gulp-rename");
const sass = require("gulp-sass");
const sourcemaps = require('gulp-sourcemaps');
const strip = require('gulp-strip-comments');

const browsersync = require("browser-sync");

function connectsync() {
    phpConnect.server({
        port: 8888,
        keepalive: true,
        base: "."
    }, function (){
        browsersync({
            proxy: '127.0.0.1:8888'
        });
    });
}

//run SASS, compile, minify, auto-prefix, write sourcemaps
function css(){
   return gulp.src('./assets/sass/**/*.scss')
          //sourcemaps allow browsers to map css origins
          .pipe(sourcemaps.init({loadMaps: true}))
          .pipe(sass({
              //nested, expanded (bog standard), compact, compressed
              outputStyle: 'nested'
              })).on('error', sass.logError)
          //installs post-css prefixes for platforms under can-i-use
          .pipe(autoprefixer({
              browsers: ['last 2 versions'],
              cascade: false
              }))
          .pipe(sourcemaps.write())
          .pipe(gulp.dest('./css'))
          .pipe(browserSync.stream());
}


function browserSyncReload(cb) {
    browsersync.reload();
    cb();
}

function watchFiles() {
    //gulp.watch(['./**/*.html','./**/*.htm','./**/*.php']).on('change', browserSync.reload);
    gulp.watch(["./**/*.php", "./**/*.html"],browserSyncReload);
    gulp.watch("./assets/sass/**/*.scss", css);
}

const watch = gulp.parallel([watchFiles, connectsync]);

exports.default = watch;
