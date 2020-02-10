import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../App.css";
import { Container } from "reactstrap";

const PredictionHooks = () => {
  //   const [hasError, setErrors] = useState(false);
  // const [userInput, setUserInput] = useState("");
  const [userFood, setUserFood] = useState("");
  const [predictions, setPredictions] = useState([]);
  const [idFromButtonClick, setIdFromButtonClick] = useState("");
  const [buttonClick, setButtonClick] = useState(false);
  const [findPrediction, setFindPrediction] = useState(false);

  const handleClick = () => {
    setIdFromButtonClick("" + userFood);
    setUserFood("");
    setButtonClick(true);
  };

  useEffect(() => {
    console.log({ idFromButtonClick });
    axios
      .get(
        `http://localhost:8000/prediction/${idFromButtonClick
          .replace(/\s/g, "")
          .toLowerCase()}`
      )
      .then(res => {
        console.log(res.data);
        setPredictions(res.data);

        if (
          res.data.toString() === "Sorry, we couldn't indentify this food yet."
        ) {
          setFindPrediction(false);
        } else {
          setFindPrediction(true);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, [idFromButtonClick, predictions]);

  /*Sorry, we couldn't indentify this food yet. */
  return (
    /* <div>
    {JSON.stringify(predictions)}
    </div> */
    <Container className="prediction-container">
      <div className="predictions">
        <h1>Food Prediction</h1>
        <h3>You are looking for food that similar to </h3>
        <h3 className="idFromButtonClick">
          {idFromButtonClick
            .replace(/\s/g, "")
            .toString()
            .toUpperCase()}
        </h3>
        <div>
          <input
            type="text"
            value={userFood}
            onChange={e => setUserFood("" + e.target.value)}
            placeholder="Enter Your Food"
            className="input"
          />

          <br></br>
          <button className="btnOutline" type="button" onClick={handleClick}>
            Make Prediction
          </button>
          <div>
            {buttonClick ? (
              <div className="foodie">
                {findPrediction ? (
                  <ul>
                    {predictions.map((obj, i) => (
                      <li>
                        <button>{obj[0]}</button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div>
                    <p>Sorry, we couldn't indentify this food yet.</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="foodie">
                <p>Let us predict for you!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default PredictionHooks;
