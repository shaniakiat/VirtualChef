import React, { Component } from "react";
import { connect } from "react-redux";
import { addItem } from "../../actions/itemActions";
import PropTypes from "prop-types";
import PredictionHooks from "../Predictions/PredictionHooks";

import UserProfile from "../User/UserProfile";
import Header from "./Header";
import About from "./About";

import "../Styles/UserProfile.css";
import "../Styles/Header.css";
import "../Styles/Predictions.css";
import "../Styles/About.css";
// import "../St

class Dashboard extends Component {
  render() {
    return (
      <div>
        {this.props.isAuthenticated ? (
          <UserProfile />
        ) : (
          <div>
            <Header />
            <PredictionHooks />
            <About />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { addItem })(Dashboard);
