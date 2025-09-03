const gulp = require('gulp');

function copyIcons() {
  return gulp
    .src('icons/**/*.{png,svg}')
    .pipe(gulp.dest('dist/icons/'));
}

exports.build = gulp.series(copyIcons);
exports['build:icons'] = copyIcons;
