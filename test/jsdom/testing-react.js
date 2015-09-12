/* jshint esnext: true */

'use strict';

let mocha = require('mocha');
let React = require('react/addons');
let assert = require('assert');
let TestUtils = React.addons.TestUtils;

mocha.describe('basic react testing method', function() {
  mocha.before('render and locate element', function () {
    let renderedComponent = TestUtils.renderIntoDocument(
      <DiscoverMoviesContainer />
    );

    this.discoverContainer = renderedComponent.getDOMNode();
  });

  mocha.it('<DiscoverMoviesContainer> should be a div', function () {
    assert(this.discoverContainer.nodeName === 'div');
  });
});
