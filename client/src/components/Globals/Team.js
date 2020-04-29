import React, { Component } from "react";
import David from "../../images/david-luong-pp.png";
import Shania from "../../images/shania-kiat-pp.png";
import Anthony from "../../images/anthony-ibe-pp.png";

class Team extends Component {
  render() {
    return (
      <section>
        <div class="team">
          <h1>
            Our web application are crafted by our talented team of developers
            from various background.
          </h1>
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
        </div>
      </section>
    );
  }
}

export default Team;
