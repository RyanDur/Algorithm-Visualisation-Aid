var gulp = require('gulp'),
    //    karma = require('gulp-karma'),
    jshint = require('gulp-jshint'),
    notify = require('gulp-notify'),
    uglify = require('gulp-uglify'),
    compass = require('gulp-compass'),
    minifyCSS = require('gulp-minify-css'),
    browserSync = require('browser-sync'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream');
var path = require('path');
var gutil = require('gulp-util');
var karmaParseConfig = require('karma/lib/config').parseConfig;
var karma = require('karma');


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



var growlReporter = function() {
    return notify(function(file) {
        if (file.jshint.success) {return false;}
        var errors = file.jshint.results.map(function (data) {
            return (data.error) ?
                "(" + data.error.line +
                ':' + data.error.character +
                ') ' + data.error.reason
                : true;
        }).join("\n");

        return file.relative +
            " (" + file.jshint.results.length +
            " errors)\n" + errors;
    });
};

/** single run */
gulp.task('test', function(cb) {
    runKarma('karma.conf.js',{}, cb);
});

/** continuous ... using karma to watch (feel free to circumvent that;) */
gulp.task('test-dev', function(cb) {
    runKarma('karma.conf.js',{
        autoWatch: true,
        singleRun: false,
        browsers: ['Chrome', 'Firefox'],
        reporters: ['progress', 'growl']
    }, cb);
});

gulp.task('lint', function() {
    gulp.src(['app/scripts/**/*.js', '!app/scripts/bundle/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(growlReporter());
});

gulp.task('compress', function() {
    gulp.src('app/scripts/bundle/*.js')
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
    browserSync(
        ['app/scripts/**/*.js',
         'app/stylesheets/**/*.css',
         'app/*.html'],{
             server: {
                 baseDir: "./app"
             }
         });
});

gulp.task('browserify', function() {
    return browserify('./app/scripts/app.js')
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./app/scripts/bundle'));
});

gulp.task('default', ['browserify', 'browser-sync'], function() {
    gulp.watch(['specs/scripts/**/*.js', 'app/scripts/**/*.js'], ['lint', 'test-dev']);
    gulp.watch('app/sass/**/*.scss', ['compass']);
});
