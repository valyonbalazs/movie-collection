// Karma configuration
// Generated on Tue Sep 08 2015 20:21:27 GMT+0200 (Central Europe Daylight Time)

module.exports = function(config) {
  config.set({

    basePath: '',
    frameworks: ['mocha', 'chai'],
    files: [
    ],
    exclude: [
    ],
    preprocessors: {
      '**/*.jsx': ['react']
    },
    reactPreprocessor: {
        harmony: true,
        es6module: true
    },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    customLaunchers: {
          'Custom_Chrome': {
              base: 'Chrome',
              flags: ['--enable-javascript-harmony']
          }
      },
    browsers: ['Custom_Chrome'],
    singleRun: false
  });
};
