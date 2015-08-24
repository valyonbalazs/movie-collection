/*jshint esnext: true */
let userInstance = null;
class User {
  constructor(username, email, profilPicUrl) {

    if(!userInstance) {
      this.UserName = username;
      this.Email = email;
      this.ProfilePicUrl = profilPicUrl;
      userInstance = this;
    }

    return userInstance;
  }
}

function loginBtnClickWithoutAuth() {
  let user = new User("Balázs Valyon", "valyon.balazs@gmail.com", "https://scontent.xx.fbcdn.net/hprofile-xft1/v/l/t1.0-1/p100x100/11173325_10152717398411695_4362251830365448502_n.jpg?oh=c6b8396ae4fec1124209688db19739c2&oe=5638FA7F");
  renderNavbar();
  renderElements();
  React.unmountComponentAtNode(document.getElementById('loginContainer'));
  var logContainer = document.getElementById('loginContainer');
  var body = document.body;
  body.removeChild(logContainer);
}

var ref = new Firebase("https://brilliant-inferno-2926.firebaseio.com");
function loginBtnClick() {
  ref.authWithOAuthPopup("facebook", function(error, authData) {
    if (error) {
      console.log("Login Failed!", error);
    } else {
      console.log("Authenticated successfully with payload:", authData);
      var facebookLoginData = authData.facebook;
      var userName = facebookLoginData.displayName;
      var userEmail = facebookLoginData.email;
      var userProfilePicUrl = facebookLoginData.profileImageURL;
      let user = new User(userName, userEmail, userProfilePicUrl);
      console.log(user);
      renderNavbar();
      renderElements();
      React.unmountComponentAtNode(document.getElementById('loginContainer'));
      var logContainer = document.getElementById('loginContainer');
      var body = document.body;
      body.removeChild(logContainer);
    }
  }, {
    remember: "sessionOnly",
    scope: "email,user_likes"
  });
}
