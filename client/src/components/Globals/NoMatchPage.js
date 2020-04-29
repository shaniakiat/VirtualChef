import React from "react";
import { Link } from "react-router-dom";
import Fade from "react-reveal/Fade";
import Background from "../../images/background-404.png";
import "../Styles/NoMatchPage.css";

const NoMatchPage = (props) => {
  return (
    <div className="no-match-page">
      <div className="grid">
        <h1>404</h1>
        <h3>Whoops!</h3>
        <p>You burnt the food</p>
        <Link to="/home">
          <button type="button" className="button">
            Go Home
          </button>
        </Link>
      </div>
      <div className="grid">
        <img className="background-404" src={Background}></img>
      </div>
    </div>
  );
};

export default NoMatchPage;
