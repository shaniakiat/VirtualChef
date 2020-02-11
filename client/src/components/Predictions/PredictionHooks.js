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
        console.log(idFromButtonClick.length);

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
        setFindPrediction(false);
        setPredictions([]);
      });
  }, [idFromButtonClick]);

  // TODO:
  // get the ingredients as a list
  // display the ingredients list into the web using textbox
  // style it

  const [food, setFood] = useState("");
  const [idFromFoodButtonClick, setIdFromFoodButtonClick] = useState("");
  const [isToggled, setToggled] = useState(false);
  const [predictionsIngredients, setPredictionsIngredients] = useState([]);
  const [findPredictionIngredients, setFindPredictionIngredients] = useState(
    false
  );
  const [predictionsRecipes, setPredictionsRecipes] = useState([]);

  const handleToogle = e => {
    console.log(e);
    setIdFromFoodButtonClick("" + e);
    console.log(idFromFoodButtonClick.replace(/\s/g, "+").toLocaleLowerCase());
    setFood("");
    setToggled(true); //if this is true than open up the textbox with the list of ingredients
  };

  useEffect(() => {
    // console.log({ idFromFoodButtonClick });
    const base = "https://api.edamam.com/search";
    const YOUR_APP_ID = "b1de00a5";
    const YOUR_APP_KEY = "bfff8bc6c4056248b815aa647d415437";

    // let ingredients = [];
    axios
      .get(
        `${base}?q=${idFromFoodButtonClick
          .replace(/\s/g, "+")
          .toLocaleLowerCase()}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}`
      )
      .then(res => {
        console.log(res.data);
        console.log(res.data.hits);
        console.log(1);
        setPredictionsRecipes(res.data.hits);
      })
      .catch(err => {
        console.log(err);
      });
  }, [idFromFoodButtonClick]);

  return (
    <div>
      <FoodPrediction
        idFromButtonClick={idFromButtonClick}
        userFood={userFood}
        handleClickPrediction={handleClickPrediction}
        setUserFood={setUserFood}
        buttonClick={buttonClick}
        findPrediction={findPrediction}
        predictions={predictions}
        food={food}
        setFood={setFood}
        predictionsRecipes={predictionsRecipes}
        handleToogle={handleToogle}
        isToggled={isToggled}
        idFromFoodButtonClick={idFromFoodButtonClick}
      />
    </div>
  );
};

export default PredictionHooks;

// food = { food }
// handleClickIngredients = { handleClickIngredients }
// foodButtonClick = { foodButtonClick }
