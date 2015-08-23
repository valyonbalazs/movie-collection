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
    }
  }, {
    remember: "sessionOnly",
    scope: "email,user_likes"
  });
}
