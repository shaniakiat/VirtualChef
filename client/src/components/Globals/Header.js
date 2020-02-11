import React, { Component } from "react";
// import makeCarousel from "react-reveal/makeCarousel"
// import Fade from "react-reveal/Fade"
// import { FaLinkedin } from "react-icons/fa"
// import { FaGithub } from "react-icons/fa"
// import styled from "styled-components"
// import Resume from "../../../../static/resume.pdf"

class Header extends Component {
  state = {
    links: [
      {
        class: 1,
        path: "/#about",
        text: "about"
      }
    ]
  };
  render() {
    return (
      <header id="home" className="home">
        <h1>Explore Delicious Food & The World's Cusines</h1>
        <h3>
          virtualchef lets you discover broad ranges of food with the best taste
          and the most delicious experience
        </h3>
        <a href="#about" className="btnOutline">
          Learn More
        </a>
      </header>
    );
  }
}

export default Header;
