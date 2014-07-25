// Karma configuration
// Generated on Sat Jul 19 2014 18:30:59 GMT+0100 (BST)

module.exports = function(config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine', 'browserify'],


        // list of files / patterns to load in the browser
        files: [
	    {
		pattern: 'spec/javascripts/fixtures/**/*.html',
		watched: true,
		included: false,
		served: true
	    },
	    'node_modules/jquery/dist/jquery.min.js',
	    'node_modules/jasmine-jquery/lib/jasmine-jquery.js',
	    'spec/javascripts/**/*.js'
        ],


        // list of files to exclude
        exclude: [
            'app/javascripts/bundle.min.js',
	    'app/javascripts/bundle/bundle.js'
        ],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
	    'spec/javascripts/**/*.js': ['browserify']
        },

	browserify: {
	    debug: true,
	    transform: ['brfs']
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress'],

        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['PhantomJS'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true
    });
};
