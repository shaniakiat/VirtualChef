import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-multi-carousel/lib/styles.css";
import AppNavbar from "./components/AppNavbar";
import Footer from "./components/Footer";

import LandingPage from "./components/Globals/LandingPage";
import UserProfile from "./components/Globals/User/UserProfile";
import IngredientList from "./components/Globals/Predictions/IngredientList";
import Restaurant from "./components/Globals/Restaurant/Restaurants";
import Documentation from "./components/Globals/Documentation";
import NoMatchPage from "./components/Globals/NoMatchPage";

import Fade from "react-reveal/Fade";

import store from "./store";

// import { Container } from "reactstrap";
import { Provider } from "react-redux";
import { loadUser } from "./actions/authActions";

import "./components/Styles/App.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// const routes = [
//   { path: "/", name: "home", Component: LandingPage },
//   { path: "/user", name: "user", Component: UserProfile }
// ];

class App extends Component {
  componentDidMount() {
    // window.location.href = "./home";
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Router>
        <Provider store={store}>
          <div className="App">
            <Fade down>
              <AppNavbar />
            </Fade>
            <Switch>
              <Route key="/" path="/" exact component={LandingPage} />
              <Route key="/" path="/home" exact component={LandingPage} />
              <Route key="/" path="/home/user" exact component={LandingPage} />
              <Route key="/" path="/user" exact component={UserProfile} />

              <Route
                key="/"
                path="/food/:id"
                exact
                component={IngredientList}
              />
              <Route
                key="/"
                path="/user/food/:id"
                exact
                component={IngredientList}
              />
              <Route key="/" path="/restaurant" exact component={Restaurant} />
              <Route
                key="/"
                path="/user/restaurant"
                exact
                component={Restaurant}
              />
              <Route
                key="/"
                path="/user/documentation"
                exact
                component={Documentation}
              />
              <Route component={NoMatchPage} />
            </Switch>
          </div>
          <Footer />
        </Provider>
      </Router>
    );
  }
}

export default App;
