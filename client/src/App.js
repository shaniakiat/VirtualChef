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

const routes = [
  { path: "/", name: "home", Component: LandingPage },
  { path: "/user", name: "user", Component: UserProfile }
];

class App extends Component {
  componentDidMount() {
    // window.location.href = "./home";
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavbar />
          <Container className="page-container">
            <Container className="content-wrap">
              {/* <LandingPage /> */}
              <Router>
                {routes.map(({ path, Component }) => (
                  <Route key={path} exact path={path}>
                    <Component />
                  </Route>
                ))}
              </Router>
            </Container>
          </Container>
          <Footer />
        </div>
      </Provider>
    );
  }
}

export default App;
