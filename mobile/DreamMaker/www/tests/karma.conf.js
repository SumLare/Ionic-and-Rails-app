// Karma configuration
// Generated on Thu Mar 31 2016 01:22:09 GMT+0300 (MSK)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    files: [
      
    //Angular source
    '../lib/angular/angular.js',
    '../lib/angular-mocks/angular-mocks.js',
    '../lib/ionic/js/ionic.bundle.js',
    '../lib/restangular/dist/restangular.js',
    '../lib/lodash/dist/lodash.js',
    '../lib/ng-token-auth/dist/ng-token-auth.js',
    '../lib/angular-ui-router/release/angular-ui-router.js',
    '../lib/angular-animate/angular-animate.js',
    '../lib/angular-sanitize/angular-sanitize.js',
    '../lib/angular-cookie/angular-cookie.js',

    //App code
    '../app/*.js',
    '../js/*.js',
    '../app/**/*.module.js',
    '../app/**/*.js',


    //Test files
    'controllers/*.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
