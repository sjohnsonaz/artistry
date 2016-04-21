var gutil = require('gulp-util');
var less = require('gulp-less');
var cleanCSS = require('gulp-clean-css');
var postcss = require('gulp-postcss');
//var sourcemaps   = require('gulp-sourcemaps');
var autoprefixer = require('autoprefixer');

module.exports = function (gulp) {
    gulp.task('less:build', function () {
        return gulp.src('src/less/main.less')
            .pipe(less())
            .on('error', function (error) {
                console.log(error.toString());
                this.emit('end');
            })
            .pipe(postcss([autoprefixer({
                browsers: ['last 2 versions']
            })]))
            .pipe(cleanCSS({
                compatibility: 'ie8'
            }))
            .pipe(gulp.dest('dist/css'));
    });

    gulp.task('less:build-watch', ['less:build'], function () {
        return gulp.watch(["src/less/**/*"], ["less:build"]);
    });
};
