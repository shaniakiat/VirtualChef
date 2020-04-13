import React, { Component, Fragment } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
} from "reactstrap";

import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import RegisterModal from "./auth/RegisterModal";
import LoginModal from "./auth/LoginModal";
import Restaurant from "./Globals/Restaurant/Restaurants";
import Logout from "./auth/Logout";

class AppNavbar extends Component {
  state = {
    isOpen: false,
  };

  static propTypes = {
    auth: PropTypes.object.isRequired,
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <Fragment>
        <NavItem>
          <span className="navbar-text mr-3">
            {/* <strong> */}
            {user
              ? `Welcome ${
                  user.name.charAt(0).toUpperCase() +
                  user.name.slice(1).toLowerCase()
                }`
              : ""}
            {/* </strong> */}
          </span>
        </NavItem>
        <NavLink onClick={this.toggle} href="/user/restaurant">
          Restaurant
        </NavLink>
        <NavLink onClick={this.toggle} href="/user/documentation">
          Documentation
        </NavLink>
        <NavItem>
          <Logout />
        </NavItem>
      </Fragment>
    );

    const guestLinks = (
      <Fragment>
        {/* <Link to="/restaurant">
        <NavItem href="/restaurant">Restaurant</NavItem>
        </Link> */}
        <NavLink onClick={this.toggle} href="/restaurant">
          Restaurant
        </NavLink>

        <NavItem>
          <RegisterModal />
        </NavItem>
        <NavItem>
          <LoginModal />
        </NavItem>
      </Fragment>
    );

    return (
      <div>
        <Navbar color="faded" light expand="sm" className="mb-5 ">
          <Container>
            <Link to="/">
              <NavbarBrand>Virtual Chef</NavbarBrand>
            </Link>

            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                {isAuthenticated ? authLinks : guestLinks}
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(AppNavbar);
