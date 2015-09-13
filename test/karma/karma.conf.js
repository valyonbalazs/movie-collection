// Karma configuration

module.exports = function(config) {
  config.set({

    basePath: '',
    frameworks: ['mocha', 'chai'],
    files: [],
    exclude: [],
    preprocessors: {
      '**/*.jsx': ['react'],
      '**/*.html': ['html2js']
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
