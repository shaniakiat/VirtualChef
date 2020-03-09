import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AppNavbar from "./components/AppNavbar";
import Footer from "./components/Footer";

import LandingPage from "./components/Globals/LandingPage";
import UserProfile from "./components/Globals/User/UserProfile";
import store from "./store";

import { Container } from "reactstrap";
import { Provider } from "react-redux";
import { loadUser } from "./actions/authActions";

import "./components/Styles/App.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <AppNavbar />
            <Container className="page-container">
              <Container className="content-wrap">
                {/* <LandingPage /> */}
                <Route exact path="/home" component={LandingPage} />
                {/* <Switch> */}
                <Route exact path="/user" component={UserProfile} />
                {/* </Switch> */}
              </Container>
            </Container>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
