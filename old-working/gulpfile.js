var watchify = require('watchify');
var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var assign = require('lodash.assign');
var babelify = require('babelify');
var webserver = require('gulp-webserver');
var minifyHTML = require('gulp-minify-html');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var minifyCss = require('gulp-minify-css');

// add custom browserify options here
var customOpts = {
	entries: ['./scripts/main.js'],
	debug: true
};
var opts = assign({}, watchify.args, customOpts);
var b = watchify(browserify(opts).transform(babelify));

gulp.task('js', bundle); // so you can run `gulp js` to build the file
b.on('update', bundle); // on any dep update, runs the bundler
b.on('log', gutil.log); // output build logs to terminal

gulp.task('build', ['css-min', 'js-min', 'html-min']);

gulp.task('css-min', function(){
	return gulp.src('styles/*.css')
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/styles'));
});

gulp.task('image-min', function(){
	 return gulp.src('images/*')
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest('dist/images'));
});

gulp.task('js-min', function(){
	  return gulp.src('dist/all.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/scripts/'));
});

gulp.task('html-min', function(){
	  var opts = {
    conditionals: true,
    spare:true
  };
 
  return gulp.src('index.html')
    .pipe(minifyHTML(opts))
    .pipe(gulp.dest('dist/'));
});

gulp.task('webserver', function() {
	gulp.src('./')
	.pipe(webserver({
		fallback:   'index.html',
		livereload: true,
		directoryListing: {
			enable: false,
			path: './'
		},
		open: true
	}));
});

gulp.task('serve', ['js', 'webserver']);

function bundle() {
	return b.bundle()
	// log errors if they happen
	.on('error', gutil.log.bind(gutil, 'Browserify Error'))
	.pipe(source('all.js'))
	// optional, remove if you don't need to buffer file contents
	.pipe(buffer())
	// optional, remove if you dont want sourcemaps
	.pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
	// Add transformation tasks to the pipeline here.
	.pipe(sourcemaps.write('./')) // writes .map file
	.pipe(gulp.dest('./dist'));
}