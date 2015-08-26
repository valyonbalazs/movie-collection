/*jshint esnext: true */
let Login = React.createClass({displayName: "Login",
  handleClick: function () {
    login.loginBtnClick();
  },
  render: function () {
    return (
      React.createElement("div", {id: "loginInnerDiv", className: "col-lg-3 col-md-3 col-xs-8 center"}, 
        React.createElement("h3", null, "Log in with"), 
        React.createElement("button", {className: "btn btn-primary", onClick: this.handleClick}, "Facebook")
      )
    );
  }
});

function renderLoginPage() {
  React.render(React.createElement(Login, null), document.getElementById('loginContainer'));
}
