import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../App.css";
import FoodPrediction from "./FoodPredictions";

const PredictionHooks = () => {
  //   const [hasError, setErrors] = useState(false);
  const [userFood, setUserFood] = useState("");
  const [predictions, setPredictions] = useState([]);
  const [idFromButtonClick, setIdFromButtonClick] = useState("");
  const [buttonClick, setButtonClick] = useState(false);
  const [findPrediction, setFindPrediction] = useState(false);

  const handleClickPrediction = () => {
    setIdFromButtonClick("" + userFood);
    setUserFood("");
    setButtonClick(true);
  };

  useEffect(() => {
    console.log({ idFromButtonClick });
    axios
      .get(
        `https://floating-plains-35923.herokuapp.com/prediction/${idFromButtonClick
          .replace(/\s/g, "")
          .toLowerCase()}`
      )
      .then(res => {
        console.log(res.data);
        if (
          res.data.toString() === "Sorry, we couldn't indentify this food yet."
        ) {
          setFindPrediction(false);
          setPredictions([]);
        } else {
          setFindPrediction(true);
          setPredictions(res.data);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, [idFromButtonClick]);

  // TODO:
  // get the ingredients as a list
  // display the ingredients list into the web using textbox
  // style it

  const [food, setFood] = useState("");
  const [idFromFoodButtonClick, setIdFromFoodButtonClick] = useState("");
  const [foodButtonClick, setFoodButtonClick] = useState(false);
  const [predictionsIngredients, setPredictionsIngredients] = useState([]);
  const [findPredictionIngredients, setFindPredictionIngredients] = useState(
    false
  );

  const handleClickIngredients = () => {
    setIdFromFoodButtonClick("" + food);
    setFood("");
    setFoodButtonClick(true); //if this is true than open up the textbox with the list of ingredients
  };

  useEffect(() => {
    console.log({ idFromFoodButtonClick });
    const base = "https://api.edamam.com/search";
    const YOUR_APP_ID = "1379f77e";
    const YOUR_APP_KEY = "5c98e2c53e8e6a98a17d608177ac37c1";
    axios
      .get(`${base}?q=pasta&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}`)
      .then(res => {
        console.log(res.data);
        setPredictionsIngredients(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [idFromFoodButtonClick]);

  return (
    <div>
      <div>
        <h1>API TESTING FOR THE INGREDIENTS</h1>
        <ul>
          {predictionsIngredients.map((obj, i) => (
            <li>
              <button type="button" value={food}>
                {obj[0]}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <FoodPrediction
        idFromButtonClick={idFromButtonClick}
        userFood={userFood}
        handleClickPrediction={handleClickPrediction}
        setUserFood={setUserFood}
        buttonClick={buttonClick}
        findPrediction={findPrediction}
        predictions={predictions}
      />
    </div>
  );
};

export default PredictionHooks;

// food = { food }
// handleClickIngredients = { handleClickIngredients }
// foodButtonClick = { foodButtonClick }
