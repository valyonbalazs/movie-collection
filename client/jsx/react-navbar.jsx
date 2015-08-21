var menuItems = [
  {'item': 'fa fa-home'},
  {'item': 'fa fa-home'},
  {'item': 'fa fa-home'}
];

//MEDIUM AND HIGH RESOLUTION NAVBAR
var MenuItem = React.createClass({
  render: function () {
    return(
      <li>
        <i className={this.props.menuItem}></i>
      </li>
    );
  }
});

var Navbar = React.createClass({
  getInitialState: function () {
    return {data: menuItems};
  },
  render: function () {
    var menuItemArray = this.state.data.map(function (item) {
      var itemValue = item.item;
      var uppercaseItem = itemValue.toString().toLowerCase();
      return(
          <MenuItem menuItem={uppercaseItem} />
      );
    });

    return(
      <ul className="nav">
        {menuItemArray}
      </ul>
    );
  }
});

React.render(<Navbar />, document.getElementById("navBar"));

//SMALL OR MOBILE RESOLUTION NAVBAR
var NavbarMobileOpen =  React.createClass({
  getInitialState: function () {
    return {data: menuItems};
  },
  render: function () {
    var menuItemArray = this.state.data.map(function (item) {
      var itemValue = item.item;
      var uppercaseItem = itemValue.toString().toLowerCase();
      return(
          <MenuItem menuItem={uppercaseItem} />
      );
    });

    return(
      <div className="navbarDivOpened col-xs-12">
        <ul className="nav">
          {menuItemArray}
        </ul>
    </div>
    );
  }
});

var opened = false;
var NavbarMobileClosed = React.createClass({
  handleClick: function (event) {
    if(opened == false) {
      opened = true;
      document.getElementById('mobileNavBarLinks').style.display = 'inline';
    } else {
      opened = false;
      document.getElementById('mobileNavBarLinks').style.display = 'none';
    }
  },
  render: function () {
    return(
      <div className="navbarMobileClosed col-xs-12">
        <i className="fa fa-bars" onClick={this.handleClick} ></i>
      </div>
    );
  }
});

React.render(<NavbarMobileClosed />, document.getElementById('mobileNavBar'));

React.render(<NavbarMobileOpen />, document.getElementById('mobileNavBarLinks'));
