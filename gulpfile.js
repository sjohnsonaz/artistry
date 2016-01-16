var gulp = require('gulp');
var gutil = require('gulp-util');
var clean = require('gulp-clean');
var watchLess = require('gulp-watch-less');
var less = require('gulp-less');
var minifyCss = require('gulp-minify-css');

gulp.task('less:build', function () {
    return gulp.src('src/less/main.less')
        .pipe(less())
        .pipe(minifyCss({
            compatibility: 'ie8'
        }))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('less:build-watch', ['less:build'], function () {
    return gulp.src('src/less/main.less')
        .pipe(watchLess('src/less/main.less', function () {
            gulp.start('less:build');
        }));
});

gulp.task('default', ['less:build']);

gulp.task('dev', ['less:build-watch']);
