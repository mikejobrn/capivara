var gulp = require('gulp');
var ts = require('gulp-typescript');
var merge = require('merge2');
var tsConfig = ts.createProject('tsconfig.json');

/**
 * It starts the dev mode
 * 
 * Just start a dev mode, that will be watching
 * ts files. 
 */
gulp.task("dev:watch", function () {
  return gulp.watch('src/**/**.ts', ['dev:compile']);
});

gulp.task("dev:compile", function () {
  return gulp.src('src/**/**.ts')
    .pipe(tsConfig())
    .js.pipe(gulp.dest('build'));
});

/**
 * Generate a new release
 * 
 * - compile all ts files
 * - generate .d.ts files
 * - generate docs
 * - publish in npm
 */
gulp.task("gen:release", function () {

  /** compiling typescript files */
  var tsResult = gulp.src('src/**/**.ts')
    .pipe(tsConfig());

  return merge([ // Merge the two output streams, so this task is finished when the IO of both operations is done.
    tsResult.dts.pipe(gulp.dest('release/definitions')),
    tsResult.js.pipe(gulp.dest('release/js'))
  ]);

});
