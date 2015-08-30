/* jshint esnext: true */
let renderPage = {
  renderMoviePage: function () {
    renderAllNavbar();
    //renderElements();
  },
  renderLoginPage: function () {
    renderLoginPage();
  },
  removeLoginpage: function () {
    React.unmountComponentAtNode(document.getElementById('loginContainer'));
    renderPage.removeLoginContainer();
    renderAllNavbar();
    //renderElements();
  },
  removeLoginContainer: function () {
    let logContainer = document.getElementById('loginContainer');
    let body = document.body;
    body.removeChild(logContainer);
  }
};
