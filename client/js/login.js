var ref = new Firebase("https://brilliant-inferno-2926.firebaseio.com");
function loginBtnClick() {
  ref.authWithOAuthPopup("facebook", function(error, authData) {
    if (error) {
      console.log("Login Failed!", error);
    } else {
      console.log("Authenticated successfully with payload:", authData);
    }
  }, {
    remember: "sessionOnly",
    scope: "email,user_likes"
  });
}
