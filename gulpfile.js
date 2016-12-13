var gulp = require('gulp');
require('./tasks/compile')(gulp);

gulp.task('default', ['stylus:build']);

gulp.task('dev', ['stylus:build-watch']);
