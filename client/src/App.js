import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AppNavbar from "./components/AppNavbar";
import ShoppingList from "./components/ShoppingList";
import ItemModal from "./components/itemModal";

import { Container } from "reactstrap";

import { Provider } from "react-redux";
import store from "./store";

const leftItems = [
  { as: "a", content: "Home", key: "home" },
  { as: "a", content: "Users", key: "users" }
];
const rightItems = [
  { as: "a", content: "Login", key: "login" },
  { as: "a", content: "Register", key: "register" }
];

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <AppNavbar leftItems={leftItems} rightItems={rightItems}>
          {/* <Image src="https://react.semantic-ui.com/assets/images/wireframe/paragraph.png" /> */}
        </AppNavbar>
        <Container>
          <ItemModal />
          <ShoppingList />
        </Container>
      </div>
    </Provider>
  );
}

export default App;
