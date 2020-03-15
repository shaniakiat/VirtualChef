import React, { Component } from "react";
import { connect } from "react-redux";
import { addItem } from "../../actions/itemActions";
import PropTypes from "prop-types";
import PredictionHooks from "./Predictions/PredictionHooks";
import NutritionalGraphs from "./D3Graphs/NutritionalGraphs";

import UserProfile from "./User/UserProfile";
import Header from "./Header";
import About from "./About";

import "../Styles/UserProfile.css";
import "../Styles/Header.css";
import "../Styles/Predictions.css";
import "../Styles/About.css";
import { Redirect } from "react-router-dom";
// import "../St

class Dashboard extends Component {
  render() {
    return (
      <div>
        {this.props.isAuthenticated ? (
          <Redirect to="/user" />
        ) : (
          <div>
            <Header />
            <PredictionHooks />
            <NutritionalGraphs />
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
