/**
 * testing tasks (using karma to test in the browser). Requires a karma.conf.js for full config
 * single-run testing
 * continuous testing
 */

/** base deps, but you may need more specifically for your application */
var gulp = require('gulp');
var gutil = require('gulp-util');
var path = require('path');
var karma = require('karma');
var karmaParseConfig = require('karma/lib/config').parseConfig;
var jshint = require('gulp-jshint');
var notify = require('gulp-notify');
var growl = require('gulp-notify-growl');

function runKarma(configFilePath, options, cb) {

    configFilePath = path.resolve(configFilePath);

    var server = karma.server;
    var log=gutil.log, colors=gutil.colors;
    var config = karmaParseConfig(configFilePath, {});

    Object.keys(options).forEach(function(key) {
        config[key] = options[key];
    });

    server.start(config, function(exitCode) {
        log('Karma has exited with ' + colors.red(exitCode));
        cb();
        process.exit(exitCode);
    });
}

/** actual tasks */

/** single run */
gulp.task('test', function(cb) {
    runKarma('karma.conf.js', {
        autoWatch: false,
        singleRun: true
    }, cb);
});

/** continuous ... using karma to watch (feel free to circumvent that;) */
gulp.task('test-dev', function(cb) {
    runKarma('karma.conf.js', {
        autoWatch: true,
        singleRun: false
    }, cb);
});

gulp.task('lint', function() {
    gulp.src('app/scripts/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'))
        .pipe(notify({
            title: 'JSHint',
            message: 'JSHint Passed. Let it fly!'
        }));
});

gulp.task('default', ['lint', 'test-dev']);
