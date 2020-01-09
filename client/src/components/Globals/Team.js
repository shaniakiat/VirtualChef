import React, { Component } from "react";
import David from "../../images/david-luong-pp.png";
import Shania from "../../images/shania-kiat-pp.png";
import Anthony from "../../images/anthony-ibe-pp.png";
// import makeCarousel from "react-reveal/makeCarousel"
// import Fade from "react-reveal/Fade"
// import { FaLinkedin } from "react-icons/fa"
// import { FaGithub } from "react-icons/fa"
// import styled from "styled-components"
// import Resume from "../../../../static/resume.pdf"

class Team extends Component {
  render() {
    return (
      <section>
        <div class="team">
          <h1>
            Our web application are crafted by our talented team of developers
            from various background.
            <div className="members">
              <div className="person">
                <img src={David} alt="profile icon" />
                <h3>David Luong</h3>
                <p>Computer Science Student at La Salle University</p>
              </div>
              <div className="person">
                <img src={Shania} alt="profile icon" />
                <h3>Shania Kiat</h3>
                <p>Computer Science Student at La Salle University</p>
              </div>
              <div className="person">
                <img src={Anthony} alt="profile icon" />
                <h3>Anthony Ibe</h3>
                <p>Computer Science Student at La Salle University</p>
              </div>
            </div>
          </h1>
        </div>
      </section>
    );
  }
}

export default Team;
