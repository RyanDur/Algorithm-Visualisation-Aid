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
//var growly = require('growly');
var uglify = require('gulp-uglify');
var compass = require('gulp-compass');
var minifyCSS = require('gulp-minify-css');
var browserSync = require('browser-sync');
var map = require('map-stream'),
    events = require('events'),
    emmitter = new events.EventEmitter();

var jsHintErrorReporter = map(function (file, cb) {
    if (!file.jshint.success) {
        file.jshint.results.forEach(function (err) {
            if (err) {
                //console.log(err);

                // Error message
                var msg = [
                    path.basename(file.path),
                    'Line: ' + err.error.line,
                    'Reason: ' + err.error.reason
                ];

                // Emit this error event
                emmitter.emit('error', new Error(msg.join('\n')));

            }
        });

    }
    cb(null, file);
});

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
        singleRun: false,
        reporters: ['progress', 'growl']
    }, cb);
});

gulp.task('lint', function() {
    gulp.src('app/scripts/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(notify(function(file) {
            if (file.jshint.success) {return false;}
            var errors = file.jshint.results.map(function (data) {
                if (data.error) {
                    return "(" + data.error.line + ':' + data.error.character + ') ' + data.error.reason;
                }
		return true;
            });
            errors.join("\n");

            return file.relative + " (" + file.jshint.results.length + " errors)\n" + errors;
        }));
});

gulp.task('compress', function() {
    gulp.src('app/scripts/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('build/scripts'));
});

gulp.task('compass', function() {
    gulp.src('app/sass/**/*.scss')
        .pipe(compass({
            config_file: 'app/config.rb',
            css: 'app/stylesheets',
            sass: 'app/sass'
        }))
        .pipe(minifyCSS())
        .pipe(gulp.dest('build/assets/css'));
});

gulp.task('browser-sync', function() {
    browserSync(['app/scripts/**/*.js','app/stylesheets/**/*.css', 'app/*.html'],{
        server: {
            baseDir: "./app"
        }
    });
});

gulp.task('bs-reload', function () {
    browserSync.reload();
});

gulp.task('default', ['browser-sync'], function() {
    gulp.watch('specs/scripts/**/*.js', ['lint', 'test-dev']);
    gulp.watch('app/scripts/**/*.js', ['lint', 'test-dev']);
    gulp.watch('app/sass/**/*.scss', ['compass']);
    gulp.watch("app/*.html", ['bs-reload']);
});
