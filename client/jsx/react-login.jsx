/*jshint esnext: true */
let Login = React.createClass({
  handleClick: function () {
    login.loginBtnClick();
  },
  render: function () {
    return (
      <div id="loginInnerDiv" className="col-lg-3 col-md-3 col-xs-8 center">
        <h3>Log in with</h3> 
        <button className="btn btn-primary" onClick={this.handleClick}>Facebook</button>
      </div>
    );
  }
});

function renderLoginPage() {
  React.render(<Login />, document.getElementById('loginContainer'));
}
