import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AppNavbar from "./components/AppNavbar";
import Footer from "./components/Footer";
import VirtualChef from "./components/Globals/VirtualChef";
import ItemModal from "./components/Globals/itemModal";
import Header from "./components/Globals/Header";
import Team from "./components/Globals/Team";
import About from "./components/Globals/About";
// import Landing from "./components/Globals/About";
import DashBoard from "./components/Globals/Dashboard";
import store from "./store";
import Prediction from "./components/Predictions/Prediction";

import { Container } from "reactstrap";
import { Provider } from "react-redux";
import { loadUser } from "./actions/authActions";

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
            <Container>
              {/* <ItemModal /> */}
              {/* <Header />
            <About /> */}
              {/* <Team /> */}
              <DashBoard />
              {/* <VirtualChef /> */}
              <Footer />
              {/* <Prediction /> */}
            </Container>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
