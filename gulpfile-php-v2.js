const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const gulp = require("gulp");
const phpConnect = require('gulp-connect-php');
const postcss = require("gulp-postcss");
const plumber = require("gulp-plumber");
const rename = require("gulp-rename");
const sass = require("gulp-sass");

const browsersync = require("browser-sync").create();
      reload = browserSync.reload;

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

function css() {
    return gulp
    .src("./sass/**/*.scss")
    .pipe(plumber())
    .pipe(sass({ outputStyle: "expanded" }))
    .pipe(gulp.dest("./css/"))
    .pipe(rename({ suffix: ".min" }))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(gulp.dest("./css/"))
    .pipe(browsersync.stream());
 }

// function browserSyncReload(done) {
//     browsersync.reload();
//     done();
// }

function watchFiles() {
    gulp.watch(['./**/*.html','./**/*.htm','./**/*.php']).on('change', browserSync.reload);
    //gulp.watch("./**/*.php", browserSyncReload);
    gulp.watch("./assets/sass/**/*.scss", css);
}

const watch = gulp.parallel([watchFiles, connectsync]);

exports.default = watch;
