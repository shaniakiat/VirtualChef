import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AppNavbar from "./components/AppNavbar";

function App() {
  return (
    <div className="App">
      <AppNavbar />
      <h1>Hello, David!</h1>
    </div>
  );
}

export default App;
