/*jshint esnext: true */

let menuItems = [
  {'item': 'fa fa-home,Home'},
  {'item': 'fa fa-film,Movies'},
  {'item': 'fa fa-wrench,Manage'}
];

//MEDIUM AND HIGH RESOLUTION NAVBAR
let MenuItem = React.createClass({
  render: function () {
    let path = '#/' + this.props.link;
    return(
      <li>
        <a href={path}><i className={this.props.menuItemIcon}></i>{this.props.menuItemText}</a>
      </li>
    );
  }
});

let Navbar = React.createClass({
  getInitialState: function () {
    return {data: menuItems};
  },
  render: function () {
    let userProfilPic = userInstance.ProfilePicUrl;
    let userName = userInstance.UserName;
    let userEmail = userInstance.Email;
    let menuItemArray = this.state.data.map(function (item) {
      let itemValue = item.item;
      let splitted = [];
      splitted = itemValue.split(",");
      let icon = splitted[0];
      let text = splitted[1];
      let lowercaseItemIcon = icon.toLowerCase();
      let uppercaseItemText = text.toUpperCase();
      let linkPath = text;
      return(
          <MenuItem menuItemIcon={lowercaseItemIcon} menuItemText={uppercaseItemText} link={linkPath}/>
      );
    });

    return(
      <div className="nav col-lg-12 col-md-12">
          <h3>Movie-Collection</h3>
        <ul>
          {menuItemArray}
        </ul>
        <div>
          {userName} <img src={userProfilPic} />
        </div>
      </div>
    );
  }
});

//SMALL OR MOBILE RESOLUTION NAVBAR
let NavbarMobileOpen =  React.createClass({
  getInitialState: function () {
    return {data: menuItems};
  },
  render: function () {
    let userProfilPic = userInstance.ProfilePicUrl;
    let userName = userInstance.UserName;
    let userEmail = userInstance.Email;
    console.log(userProfilPic);

    let menuItemArray = this.state.data.map(function (item) {
      let itemValue = item.item;
      let splitted = [];
      splitted = itemValue.split(",");
      let icon = splitted[0];
      let text = splitted[1];
      let lowercaseItemIcon = icon.toLowerCase();
      let uppercaseItemText = text.toUpperCase();
      let linkPath = text;
      return(
          <MenuItem menuItemIcon={lowercaseItemIcon} menuItemText={uppercaseItemText}  link={linkPath}/>
      );
    });

    return(
      <div id="navbarDivOpenedDiv" className="navbarDivOpened col-xs-12">
        <div id="navbarOpenProfileImage" >
          <img src={userProfilPic} />
          <h4>{userName}</h4>
          <h5>{userEmail}</h5>
        </div>
        <div id="navbarOpenLinks">
          <ul className="nav">
            {menuItemArray}
          </ul>
        </div>
    </div>
    );
  }
});

let opened = false;
let NavbarMobileClosed = React.createClass({
  handleClick: function (event) {
    if(opened == false) {
      opened = true;
      document.getElementById('mobileNavBarLinks').style.width = '85%';
      document.getElementById('navbarDivOpenedDiv').style.visibility = 'visible';
    } else {
      opened = false;
      document.getElementById('mobileNavBarLinks').style.width = '0%';
      document.getElementById('navbarDivOpenedDiv').style.visibility = 'hidden';
    }
  },
  render: function () {
    return(
      <div className="navbarMobileClosed col-xs-12">
        <i className="fa fa-bars" onClick={this.handleClick} ></i>
        <p>Movie-Collection</p>
      </div>
    );
  }
});

function renderAllNavbar() {
  renderNavbar();
  renderNavbarMobileClosed();
  renderNavbarMobileOpen();
};

function renderNavbar () {
    React.render(<Navbar />, document.getElementById("navBar"));
}

function renderNavbarMobileClosed () {
    React.render(<NavbarMobileClosed />, document.getElementById('mobileNavBar'));
}

function renderNavbarMobileOpen () {
    React.render(<NavbarMobileOpen />, document.getElementById('mobileNavBarLinks'));
}
