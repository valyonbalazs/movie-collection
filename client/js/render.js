/*jshint esnext: true */
var renderPage = {
  renderMoviePage: function () {
    renderAllNavbar();
    renderElements();
  },
  removeLoginpage: function () {
    renderPage.renderAllNavbar();
    renderPage.renderElements();
    React.unmountComponentAtNode(document.getElementById('loginContainer'));
    var logContainer = document.getElementById('loginContainer');
    var body = document.body;
    body.removeChild(logContainer);
  }
};
