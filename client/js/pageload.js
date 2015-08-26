/* jshint esnext: true */
(function pageLoad () {

  if (localStorage.uid) {
    let user = new User(localStorage.userName, localStorage.userEmail, localStorage.imageUrl);
    document.addEventListener('DOMContentLoaded', function(event) {
        renderPage.renderMoviePage();
        renderPage.removeLoginContainer();
    });
  } else {
      document.addEventListener('DOMContentLoaded', function(event) {
      renderPage.renderLoginPage();
    });
  }
})();
