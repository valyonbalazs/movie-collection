/* jshint esnext: true */

let renderPage = {
  renderMoviePage: function () {
    renderAllNavbar();
    //renderElements();
  },
  renderLoginPage: function () {
    renderLoginPage();
    window.onload = function () {
      var loginInnerDiv = document.getElementById('loginInnerDiv');
      loginInnerDiv.setAttribute('class', loginInnerDiv.getAttribute('class') + ' loaded');
    };
  },
  renderDiscoverPage: function () {
    renderDiscoverMovies();
  },
  removeDiscoverPage: function () {
    var discoverBtns = document.getElementById('discoveryChooserContainer');
    var discoverParent = discoverBtns.parentNode;
    discoverParent.remove(discoverBtns);
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
