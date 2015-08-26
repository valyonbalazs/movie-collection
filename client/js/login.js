/*jshint esnext: true */

//Making the User a Singleton object
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

let ref = new Firebase("https://brilliant-inferno-2926.firebaseio.com");
let login = {
  saveUserTokenToLocalStorage: function () {
      localStorage.setItem("uid", uid);
  },
  saveUserDataToLocalStorage: function () {
    localStorage.userName = name;
    localStorage.userEmail = email;
    localStorage.imageUrl = imageUrl;
  },
  loginBtnClickWithoutAuth: function () {
    let user = new User("Balázs Valyon", "valyon.balazs@gmail.com", "https://scontent.xx.fbcdn.net/hprofile-xft1/v/l/t1.0-1/p100x100/11173325_10152717398411695_4362251830365448502_n.jpg?oh=c6b8396ae4fec1124209688db19739c2&oe=5638FA7F");
    renderPage.removeLoginpage();
  },
  loginBtnClick: function () {
    ref.authWithOAuthPopup("facebook", function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        let facebookLoginData = authData.facebook;
        let userName = facebookLoginData.displayName;
        let userEmail = facebookLoginData.email;
        let userProfilePicUrl = facebookLoginData.profileImageURL;
        let user = new User(userName, userEmail, userProfilePicUrl);

        ref.child("users").child(authData.uid).set({
          provider: authData.provider,
          name: login.getName(authData)
        });
        login.saveUserTokenToLocalStorage(authData.uid);
        login.saveUserDataToLocalStorage(userName, userEmail, userProfilePicUrl);
        renderPage.removeLoginpage();
      }
    }, {
      remember: "sessionOnly",
      scope: "email,user_likes"
    });
  },
  getName: function () {
    switch(authData.provider) {
       case 'password':
         return authData.password.email.replace(/@.*/, '');
       case 'twitter':
         return authData.twitter.displayName;
       case 'facebook':
         return authData.facebook.displayName;
    }
  }
};
