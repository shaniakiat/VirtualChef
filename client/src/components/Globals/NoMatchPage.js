import React from "react";
import { Link } from "react-router-dom";
import Fade from "react-reveal/Fade";
import "../Styles/NoMatchPage.css";
const NoMatchPage = (props) => {
  return (
    <div className="no-match-page">
      <h1>404</h1>
      <h3>Whoops!</h3>
      <p>You burnt the food</p>
      <Link to="/home">
        <button type="button" className="button">
          Go Home
        </button>
      </Link>
    </div>
  );
};

export default NoMatchPage;
