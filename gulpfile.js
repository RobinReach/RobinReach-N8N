const gulp = require('gulp');

function copyIcons() {
  // Copy icons to the main icons directory
  gulp
    .src('icons/**/*.{png,svg}')
    .pipe(gulp.dest('dist/icons/'));
  
  // Copy PNG icons to node directories where n8n looks for them
  gulp
    .src('icons/*.png')
    .pipe(gulp.dest('dist/nodes/RobinReach/'));
  
  return gulp
    .src('icons/*.png')
    .pipe(gulp.dest('dist/credentials/'));
}

exports.build = gulp.series(copyIcons);
exports['build:icons'] = copyIcons;
