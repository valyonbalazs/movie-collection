/* jshint esnext: true */

'use strict';

let mocha = require('mocha');
let React = require('react/addons');
let assert = require('assert');
let DiscoverMoviesContainer = require('../../client/temp-jsx/react-discover-movies.js')
let TestUtils = React.addons.TestUtils;

mocha.describe('basic react testing method', function() {
  mocha.it('<DiscoverMoviesContainer> should be a div', function () {
    let renderedComponent = TestUtils.renderIntoDocument(
        <DiscoverMoviesContainer />
    );
    let discoverContainer = React.findDOMNode(renderedComponent);
    assert(discoverContainer.nodeName == 'DIV');
  });
});
