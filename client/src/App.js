import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AppNavbar from "./components/AppNavbar";
import Footer from "./components/Footer";

import LandingPage from "./components/Globals/LandingPage";
import UserProfile from "./components/Globals/User/UserProfile";
import IngredientList from "./components/Globals/Predictions/IngredientList";
import store from "./store";

import { Container } from "reactstrap";
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
            <AppNavbar />
            <Container className="page-container">
              <Container className="content-wrap">
                {/* <LandingPage /> */}

                {/* {routes.map(({ path, Component }) => (
                  <Route key={path} exact path={path}>
                    <Component />
                  </Route>
                ))} */}
                <Switch>
                  <Route key="/" path="/" exact component={LandingPage} />
                  <Route key="/" path="/user" exact component={UserProfile} />
                  <Route
                    key="/"
                    path="/food/:id"
                    exact
                    component={IngredientList}
                  />
                  <Route
                    key="/"
                    path="/user/:id"
                    exact
                    component={IngredientList}
                  />
                </Switch>
              </Container>
            </Container>
            <Footer />
          </div>
        </Provider>
      </Router>
    );
  }
}

export default App;
