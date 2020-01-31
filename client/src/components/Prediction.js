import React from "react";

class Prediction extends React.Component {
  constructor(props) {
    super(props);
    this.state = { usersFood: "" };
  }

  handleChange = event => {
    this.setState({ usersFood: event.target.value });
    console.log(this.state.usersFood);
  };

  getPredictions = () => {
    alert(this.state.usersFood);
    let myObj = [];
    fetch(`http://localhost:8000/prediction/${this.state.usersFood}`, {
      headers: {
        Accept: "application/json"
      }
    })
      .then(response => {
        console.log(response);
        return response.json();
      })
      .then(myJson => {
        // console.log(myJson);
        // document.getElementById("text-area").innerHTML = myJson;

        //getting individual words from the json file, now each element is formatted [{food, 0.9...}, {food2, 0.99}...]
        myObj = myJson;
        myObj.map(function(obj, i) {
          if (i < 5) {
            myObj[i] = obj[0];
          }
        });
        console.log(myObj);
        // getIngredients(myObj);
      })
      .catch(function(error) {
        console.error();
      }); //end of prediction fetch
  };
  render() {
    return (
      <div>
        <h1>testing api</h1>
        <p>Enter in your food :</p>
        <input
          type="text"
          value={this.state.usersFood}
          onChange={this.handleChange}
          placeholder="Enter your food"
        />
        <button onClick={this.getPredictions}>Make Predictions</button>
      </div>
    );
  }
}
export default Prediction;
