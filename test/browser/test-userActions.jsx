/* jshint esnext: true */
/** @jsx React.DOM */

'use strict';

describe('basic react testing method', function() {
  it('react click event testing', function() {
    let TestUtils = React.addons.TestUtils;

    document.addEventListener('DOMContentLoaded', function(event) {
        let discoverContainer = TestUtils.renderIntoDocument(<DiscoverMoviesContainer />);
        let OneMonthButton = React.findDOMNode(document.getElementById('OneMonthButton'));

        expect(React.findDOMNode(OneMonthButton).textContent).toEqual('LAST 1 MONTH');
    });


  });
});
