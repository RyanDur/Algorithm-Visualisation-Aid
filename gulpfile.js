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
gulp.task('test-dev', ['browserify'], function(cb) {
    runKarma('karma.conf.js',{
        autoWatch: true,
        singleRun: false,
        browsers: ['Chrome'],
        reporters: ['progress', 'growl']
    }, cb);
});

gulp.task('lint', function() {
    gulp.src(['app/js/**/*.js',
              '!app/js/bundle/*.js'])
        .pipe(jshint('./.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(growlReporter());
});

gulp.task('compress', ['browserify'], function() {
    gulp.src('app/js/bundle/bundle.js')
        .pipe(gulp.dest('dist/js/bundle'));
});

gulp.task('compass', function() {
    gulp.src('app/scss/**/*.scss')
        .pipe(compass({
            config_file: 'app/config.rb',
            css: 'app/stylesheets',
            sass: 'app/scss'
        }))
        .pipe(minifyCSS())
        .pipe(gulp.dest('app/assets/css'))
        .pipe(gulp.dest('dist/assets/css'));
});

gulp.task('browser-sync', ['compass', 'browserify'], function() {
    browserSync(
        ['app/js/**/*.js',
         'app/stylesheets/**/*.css',
         'app/index.html',
         '!app/js/bundle/*.js'],{
             server: {
                 baseDir: "./app"
             }
         });
});

gulp.task('browserify', function() {
    return browserify('./app/js/app.js')
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./app/js/bundle'));
});

gulp.task('clean', function() {
    return gulp.src('dist')
        .pipe(clean());
});

gulp.task('copy index', ['clean'], function() {
    return gulp.src('app/index.html')
        .pipe(gulp.dest('dist'));
});

gulp.task('copy vendor', ['clean'], function() {
    return gulp.src('app/vendor/*')
        .pipe(gulp.dest('dist/vendor'));
});

gulp.task('copy robots', ['clean'], function() {
    return gulp.src('app/robots.txt')
        .pipe(gulp.dest('dist'));
});

gulp.task('copy humans', ['clean'], function() {
    return gulp.src('app/humans.txt')
        .pipe(gulp.dest('dist'));
});

gulp.task('copy templates',['clean'], function() {
    return gulp.src('app/templates/*')
	.pipe(gulp.dest('dist/templates'));
});

gulp.task('ready',
          ['clean',
           'browserify',
           'compress',
           'compass',
           'copy index',
	   'copy templates',
           'copy vendor',
           'copy humans',
           'copy robots']);

gulp.task('ci', ['test']);

gulp.task('default', ['lint', 'browserify', 'browser-sync'], function() {
    gulp.watch(['spec/js/**/*.js',
                'app/js/**/*.js',
                '!app/js/bundle.min.js',
                '!app/js/bundle/*.js'], ['lint', 'test-dev', 'browserify','compress']);
    gulp.watch('app/scss/**/*.scss', ['compass']);
});
