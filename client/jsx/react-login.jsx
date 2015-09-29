/* jshint esnext: true */
let Login = React.createClass({
  handleClick: () => {
    login.loginBtnClick();
  },
  render: function () {
    return (
      <div id="loginInnerDiv" className="col-lg-3 col-md-4 col-xs-8 center fadein">
        <div id="loginInnerUpperDiv" className="col-lg-12 col-md-12 col-xs-12">
          <i className="fa fa-user"></i>
        </div>
        <div id="loginInnerLowerDiv" className="col-lg-12 col-md-12 col-xs-12">
          <button className="btn btn-primary discoverBtn" onClick={this.handleClick}><i className="fa fa-facebook-official"></i> Facebook</button>
        </div>
      </div>
    );
  }
});

function renderLoginPage() {
  React.render(<Login />, document.getElementById('loginContainer'));
}
