/*jshint esnext: true */
let renderPage = {
  renderMoviePage: function () {
    renderAllNavbar();
    renderElements();
  },
  removeLoginpage: function () {
    renderPage.renderAllNavbar();
    renderPage.renderElements();
    React.unmountComponentAtNode(document.getElementById('loginContainer'));
    let logContainer = document.getElementById('loginContainer');
    let body = document.body;
    body.removeChild(logContainer);
  }
};
