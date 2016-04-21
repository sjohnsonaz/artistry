var gulp = require('gulp');
require('./tasks/compile')(gulp);

gulp.task('default', ['less:build']);

gulp.task('dev', ['less:build-watch']);
