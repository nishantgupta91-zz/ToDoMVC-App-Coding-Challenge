/**
 * Created by .. on 11/14/2015.
 */
'use strict';

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    rimraf = require('gulp-rimraf'),
    ngAnnotate = require('gulp-ng-annotate'),
    uglify = require('gulp-uglify'),
    rev = require('gulp-rev'),
    bowerFiles = require('main-bower-files'),
    gulpFilter = require('gulp-filter'),
    minifyCSS = require('gulp-minify-css'),
    runSequence = require('run-sequence'),
    streamqueue = require('streamqueue'),
    inject = require('gulp-inject');

// build task
gulp.task('build', function(callback) {
    // runSequence is a cool way of choosing what must run sequentially, and what in parallel
    // here, the task clean will run first alone, then all the builds in parallel, then the copies in parallel, then the injection in html
    runSequence(
        'clean',
        ['build-scripts', 'build-scripts-bower', 'build-styles', 'build-styles-bower'],
        ['copy-assets', 'copy-client'],
        'build-html',
        callback);
});

// Clean task
gulp.task('clean', function() {
    gulp.src('./dist/**/*.*', { read: false }) // much faster
        .pipe(rimraf({force: true}));
});

// concatenate, annotate (for angular JS) and minify the js scripts into one single app.js file, then copy it to dist folder
gulp.task('build-scripts', function() {
    return gulp.src(['./public/app/**/*.js', './public/assets/**/*.js'])
        .pipe(concat('app.js')) // concatenate all js files
        .pipe(ngAnnotate()) // annotate to ensure proper dependency injection in AngularJS
        .pipe(uglify()) // minify js
        .pipe(rev()) // add a unique id at the end of app.js (ex: app-f4446a9c.js) to prevent browser caching when updating the website
        .pipe(gulp.dest('./dist/app')); // copy app-**.js to the appropriate folder
});

// same as above, with the bower files (no need to ngannotate)
gulp.task('build-scripts-bower', function() {
    return gulp.src(bowerFiles({paths: {bowerDirectory: './public/bower_components'}}))
        .pipe(gulpFilter(['*.js', '!bootstrap-sass-official', '!bootstrap.js', '!json3', '!es5-shim']))
        .pipe(concat('vendor.js'))
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest('./dist/app'));
});

// yet another concat/minify task, here for the CSS
gulp.task('build-styles',function() {
    return gulp.src(['./public/assets/css/**/*.css', './public/app/components/**/*.css', './public/app/shared/**/*.css'])
        .pipe(minifyCSS())
        .pipe(rev())
        .pipe(gulp.dest('./dist/app'));
});

// and for vendor CSS
gulp.task('build-styles-bower', function() {
    return gulp.src(bowerFiles({paths: {bowerDirectory: './public/bower_components'}}))
        .pipe(gulpFilter(['*.css', '!bootstrap-sass-official', '!json3',  '!es5-shim']))
        .pipe(concat('vendor.css'))
        .pipe(minifyCSS())
        .pipe(rev())
        .pipe(gulp.dest('./dist/app'));
});

// copying the assets (images, fonts, ...)
gulp.task('copy-assets', function() {
    return gulp.src('./public/assets/**/*.*')
        .pipe(gulp.dest('./dist/assets'));
});

// copying the html files
gulp.task('copy-client', function(){
    return gulp.src('./public/**/**/*.+(html|txt|ico)')
        .pipe(gulp.dest('./dist/'));
});

// queues app.js and vendor.js
function buildjs() {
    return streamqueue({ objectMode: true },
        gulp.src('app/vendor*.js', {read:false, 'cwd': __dirname + '/dist/'}),
        gulp.src('app/app*.js', {read:false, 'cwd': __dirname + '/dist/'})
    );
}

// queues app.css and vendor.css
function buildcss() {
    return streamqueue({ objectMode: true },
        gulp.src('app/vendor*.css', {read:false, 'cwd': __dirname + '/dist/'}),
        gulp.src('app/app*.css', {read:false, 'cwd': __dirname + '/dist/'})
    );
}

// injection of both js files and css files in index.html
gulp.task('build-html', function() {
    return gulp.src('./dist/index.html')
        .pipe(inject(buildjs(), {relative:true}))
        .pipe(inject(buildcss(), {relative:true}))
        .pipe(gulp.dest('./dist'));
});

gulp.task('watch', function() {
    // Watch our scripts
    gulp.watch(['./public/app/**/*.js'],[
        'build'
    ]);
});

// Setting up a server for hosting webpage
var express = require('express'),
    serverPort = 9000;

// Set up an express server (but not starting it yet)
var server = express();
// Use our 'dist' folder as rootfolder
server.use(express.static('./dist'));
// Because I like HTML5 pushstate .. this redirects everything back to our index.html
server.all('/*', function(req, res) {
    res.sendfile('index.html', { root: 'dist' });
});

// Serve task
gulp.task('serve', function() {
    // Start webserver
    server.listen(serverPort);
});

gulp.task('build-watch', ['build', 'watch'])
gulp.task('default', ['build', 'serve']);
