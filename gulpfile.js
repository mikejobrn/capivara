var gulp = require('gulp');
var ts = require('gulp-typescript');
var merge = require('merge2');
var mocha = require('gulp-mocha');
var typedoc = require('gulp-typedoc');
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

gulp.task("dev:compile", function (cb) {
  return gulp.src('src/**/**.ts')
    .pipe(tsConfig())
    .js.pipe(gulp.dest('build/src'));

    cb(err); // sync task
});

/**
 * Generate a new release
 *
 * - compile all ts files
 * - generate .d.ts files
 * - generate docs
 * - publish in npm
 */
gulp.task("gen:release", ['gen:typedocs'], () => {

  /** compiling typescript files */
  var tsResult = gulp.src('src/**/**.ts')
    .pipe(tsConfig());

  return merge([ // Merge the two output streams, so this task is finished when the IO of both operations is done.
    tsResult.dts.pipe(gulp.dest('release/definitions')),
    tsResult.js.pipe(gulp.dest('release/js'))
  ]);

});

gulp.task('gen:typedocs', (cb) => {

  // I didn't like the typedocs
  // It can be used as a aditional,
  // but not as main docs.
  // MAYBE: https://github.com/sindresorhus/gulp-markdown
  // So, i create readme for functions.
  // return gulp.src('src/**/**.ts')
  //   .pipe(typedoc({
  //     module: 'commonjs',
	// 		target: 'es5',
	// 		includeDeclarations: true,
	// 		out: './docs/api',
  //     name: 'Capivara API'
  //   }));

  cb(err);

})


/**
 * Task: test
 *
 * Task to test the code.
 * test:compile runs sync.
 */
gulp.task('test', ['dev:compile', 'test:compile'], () => {
  return gulp.src(['build/tests/**/**.js'], { read: false })
    .pipe(mocha({ reporter: 'spec' }))
    .once('error', () => {
			process.exit(1);
		})
		.once('end', () => {
			process.exit();
		});
});

gulp.task('test:compile', (cb) => {
  return gulp.src('test/**/**.ts')
    .pipe(ts({
      "experimentalDecorators": true,
      "target": "es5",
      "typeRoots": ["../node_modules/@types"]
    }))
    .js.pipe(gulp.dest('build/tests'));

    cb(err); // sync task
});



