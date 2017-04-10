var gulp = require('gulp');
var webpack = require('webpack');
var debug = require('gulp-debug');
var ts = require('gulp-typescript');
let webpackStream = require('webpack-stream')
var tsConfig = ts.createProject('tsconfig.json');



gulp.task("dev:watch", function () {
  return gulp.src('src/main.ts')
    .pipe(webpackStream(require('./webpack.config'), webpack))
    .on('error', function (error) {
      this.emit('end');
    })
    .pipe(gulp.dest(''));
});
