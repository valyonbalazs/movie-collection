/* jshint esnext: true */

'use strict';

let jsdom = require('jsdom');

let doc = jsdom.jsdom(
    '<!doctype html><html><body>' +
      '<div id="loginContainer" class="col-lg-12 col-md-12 col-xs-12 vertical-center></div>' +
      '<div id="navBar"></div>'+
      '<div id="mobileNavBar"></div><div id="mobileNavBarLinks"></div>' +
      '<div class="container">' +
        '<div id="innerContainer" class="col-lg-12 col-md-12 col-xs-12 moviesContainer">' +
          '<div id="moviesContainer">' +
            '<div id="discoveryChooserContainer">' +
              '<div id="discoveryChooserLabel"><h3 id="discoverLabel" /></div>' +
            '<div id="discoveryChooserButtons"></div>' +
          '</div>' +
          '<div id="innerDiscoverContainer"></div>' +
        '</div>' +
    '</body></html>'
  );

// get the window object out of the document
let win = doc.defaultView;

// set globals for mocha that make access to document and window feel
// natural in the test environment
global.document = doc;
global.window = win;

// take all properties of the window object and also attach it to the
// mocha global object
propagateToGlobal(win);

// from mocha-jsdom https://github.com/rstacruz/mocha-jsdom/blob/master/index.js#L80
function propagateToGlobal (window) {
  for (let key in window) {
    if (!window.hasOwnProperty(key)) {
      continue;
    }
    if (key in global) {
      continue;
    }
    global[key] = window[key];
  }
}
