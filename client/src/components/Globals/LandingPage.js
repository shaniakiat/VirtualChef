import React, { Component } from "react";
import { connect } from "react-redux";
import { addItem } from "../../actions/itemActions";

import Header from "./Header";
import About from "./About";
import PredictionHooks from "./Predictions/PredictionHooks";

import "../Styles/UserProfile.css";
import "../Styles/Header.css";
import "../Styles/Predictions.css";
import "../Styles/About.css";
// import "../St

class Dashboard extends Component {
  render() {
    return (
      <div>
        {/* {this.props.isAuthenticated ? (
          <Redirect to="/home/user" />
        ) : ( */}
        <div>
          <Header />
          <PredictionHooks />
          <About />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { addItem })(Dashboard);
