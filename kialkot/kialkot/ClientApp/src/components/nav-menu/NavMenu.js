import React, { Component } from "react";
import {
  Collapse,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
} from "reactstrap";
import { Link } from "react-router-dom";
import "./NavMenu.css";
import Logo from "../../images/Logo.png";

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true,
      RouteConfig: [
        { label: "", link: "/" },
        { label: "Registration", link: "/registration" },
        { label: "Login", link: "/login" },
      ],
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    return (
      <header>
        <Navbar
          className="navbar-expand-sm navbar-toggleable-sm ng-white mb-3"
          container
          light
        >
          <NavbarBrand tag={Link} to="/">
            <img src={Logo} alt="logo" />
          </NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} className="m3" />
          <Collapse
            className="d-sm-inline-flex flex-sm-row"
            isOpen={!this.state.collapsed}
            navbar
          >
            <ul className="navbar-nav flex-grow">
              {this.state.RouteConfig.map(({ link, label }) => (
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to={link}>
                    {label}
                  </NavLink>
                </NavItem>
              ))}
            </ul>
          </Collapse>
        </Navbar>
      </header>
    );
  }
}
