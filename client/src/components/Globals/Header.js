import React, { Component } from "react";
import Fade from "react-reveal/Fade";
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
        <Fade left>
          <h1>Explore Delicious Food & The World's Cuisines</h1>
        </Fade>
        <Fade right>
          <h3>
            virtualchef uses <span className="ml">machine learning</span> to
            help you discover broad ranges of food with the best taste and the
            most delicious experience
          </h3>
        </Fade>
        <Fade left>
          <a href="#about" className="btnOutline">
            Learn More
          </a>
        </Fade>
      </header>
    );
  }
}

export default Header;
