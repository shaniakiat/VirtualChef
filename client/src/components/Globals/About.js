import React, { Component } from "react";

class Team extends Component {
  render() {
    return (
      <section>
        <div class="about">
          <div className="box">
            <h1>Our Goals</h1>
            <div className="goals">
              <p>
                We want to develop an app which can help recommend foods to you
                based on your ingredients on hand and/or your taste.
                <br /> <br />
                Our app would not only be a convenient edition to your everyday
                life but could become a necessary time saving commodity in your
                everyday routine.
                <br /> <br />
                No more indecision when looking for restaurants, no more
                struggling to find something to eat when your pantry is not
                fully stocked. This app would allow to make the most of what you
                have or give you the ideas you might not have had before.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Team;
