import React, { useState, useEffect } from "react";
import axios from "axios";

const PredictionHooks = () => {
  //   const [hasError, setErrors] = useState(false);
  const [userFood, setUserFood] = useState("");
  const [predictions, setPredictions] = useState([]);
  const [idFromButtonClick, setIdFromButtonClick] = useState("");
  const [buttonClick, setButtonClick] = useState(false);

  const handleClick = () => {
    setIdFromButtonClick("" + userFood);
    setButtonClick(true);
  };

  useEffect(() => {
    // console.log({ idFromButtonClick });
    axios
      .get(`http://localhost:8000/prediction/${idFromButtonClick}`)
      .then(res => {
        console.log(res.data);
        setPredictions(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [idFromButtonClick]);

  return (
    /* <div>
    {JSON.stringify(predictions)}
    </div> */
    <div>
      <div>
        <input
          type="text"
          value={userFood}
          onChange={e => setUserFood("" + e.target.value)}
          placeholder="Enter your food"
        />
        <button type="button" onClick={handleClick}>
          Make Prediction
        </button>
        <div>
          {buttonClick ? (
            <div>
              <ul>
                {predictions.map((obj, i) => (
                  <li>
                    <button>{obj[0]}</button>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div>
              <p>Let's predict something!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PredictionHooks;
