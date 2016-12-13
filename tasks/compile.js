var stylus = require('gulp-stylus');
var cleanCSS = require('gulp-clean-css');
var postcss = require('gulp-postcss');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('autoprefixer');

module.exports = function (gulp) {
    gulp.task('stylus:build', function () {
        return gulp.src('src/styl/main.styl')
            .pipe(sourcemaps.init())
            .pipe(stylus({
                compress: true,
                linenos: false
            }))
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
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest('dist/css'));
    });

    gulp.task('stylus:build-watch', ['stylus:build'], function () {
        return gulp.watch(["src/styl/**/*"], ["stylus:build"]);
    });
};
