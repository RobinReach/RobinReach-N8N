const gulp = require('gulp');

function copyIcons() {
  // Copy icons to the main icons directory
  gulp
    .src('icons/**/*.{png,svg}')
    .pipe(gulp.dest('dist/icons/'));
  
  // Copy icons to node directories where n8n looks for them
  gulp
    .src(['icons/*.png', 'icons/*.svg'])
    .pipe(gulp.dest('dist/nodes/RobinReach/'));
  
  // Copy node-specific icons if they exist
  gulp
    .src('nodes/RobinReach/*.svg')
    .pipe(gulp.dest('dist/nodes/RobinReach/'));
  
  // Copy credentials-specific icons if they exist
  gulp
    .src('credentials/*.svg')
    .pipe(gulp.dest('dist/credentials/'));
  
  return gulp
    .src(['icons/*.png', 'icons/*.svg'])
    .pipe(gulp.dest('dist/credentials/'));
}

exports.build = gulp.series(copyIcons);
exports['build:icons'] = copyIcons;
