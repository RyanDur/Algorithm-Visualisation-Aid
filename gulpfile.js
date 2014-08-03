var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    notify = require('gulp-notify'),
    uglify = require('gulp-uglify'),
    compass = require('gulp-compass'),
    minifyCSS = require('gulp-minify-css'),
    browserSync = require('browser-sync'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    path = require('path'),
    gutil = require('gulp-util'),
    karmaParseConfig = require('karma/lib/config').parseConfig,
    karma = require('karma'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean');


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
    gulp.src(['app/javascripts/**/*.js',
              '!app/javascripts/bundle/*.js',
              '!app/javascripts/bundle.min.js'])
        .pipe(jshint('./.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(growlReporter());
});

gulp.task('compress', function() {
    gulp.src('app/javascripts/bundle/bundle.js')
        .pipe(rename('bundle.min.js'))
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
        .pipe(gulp.dest('app/assets/css'))
        .pipe(gulp.dest('build/assets/css'));
});

gulp.task('browser-sync', ['compass'], function() {
    browserSync(
        ['app/javascripts/**/*.js',
         'app/stylesheets/**/*.css',
         './*.html',
         '!app/javascripts/bundle.min.js',
         '!app/javascripts/bundle/*.js'],{
             server: {
                 baseDir: "./"
             }
         });
});

gulp.task('browserify', function() {
    return browserify('./app/javascripts/app.js')
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./app/javascripts/bundle'));
});

gulp.task('clean', function() {
    return gulp.src('build')
        .pipe(clean());
});

gulp.task('copy', function() {
    return gulp.src('app/index.html')
        .pipe(rename('home.html'))
        .pipe(gulp.dest('build'));
});

gulp.task('build', ['browserify', 'compress', 'compass']);

gulp.task('ready', ['clean'], function() {
    gulp.run('build');
});

gulp.task('ci', ['test']);
gulp.task('default', ['lint', 'browserify', 'test-dev', 'browser-sync'], function() {
    gulp.watch(['spec/javascripts/**/*.js',
		'app/javascripts/**/*.js',
		'!app/javascripts/bundle.min.js',
		'!app/javascripts/bundle/*.js'], ['lint', 'browserify','compress']);
    gulp.watch('app/sass/**/*.scss', ['compass']);
});
