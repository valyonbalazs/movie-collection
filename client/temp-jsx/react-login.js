/* jshint esnext: true */
let Login = React.createClass({displayName: "Login",
  handleClick: function () {
    login.loginBtnClick();
  },
  render: function () {
    return (
      React.createElement("div", {id: "loginInnerDiv", className: "col-lg-3 col-md-4 col-xs-8 center fadein"}, 
        React.createElement("div", {id: "loginInnerUpperDiv", className: "col-lg-12 col-md-12 col-xs-12"}, 
          React.createElement("i", {className: "fa fa-user"})
        ), 
        React.createElement("div", {id: "loginInnerLowerDiv", className: "col-lg-12 col-md-12 col-xs-12"}, 
          React.createElement("button", {className: "btn btn-primary discoverBtn", onClick: this.handleClick}, React.createElement("i", {className: "fa fa-facebook-official"}), " Facebook"), 
          React.createElement("button", {className: "btn btn-warning discoverBtn", onClick: this.handleClick}, "  ", React.createElement("i", {className: "fa fa-google"}), " Google  ")
        )
      )
    );
  }
});

function renderLoginPage() {
  React.render(React.createElement(Login, null), document.getElementById('loginContainer'));
}
