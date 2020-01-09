import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AppNavbar from "./components/AppNavbar";
import VirtualChef from "./components/Globals/VirtualChef";
import ItemModal from "./components/Globals/itemModal";
import Header from "./components/Globals/Header";
import store from "./store";

import { Container } from "reactstrap";
import { Provider } from "react-redux";
import { loadUser } from "./actions/authActions";

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavbar />
          <Container>
            {/* <ItemModal /> */}
            <Header />
            <VirtualChef />
          </Container>
        </div>
      </Provider>
    );
  }
}

export default App;
