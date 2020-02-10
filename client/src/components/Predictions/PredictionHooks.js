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

  // const [food, setFood] = useState("");
  // const [idFromFoodButtonClick, setIdFromFoodButtonClick] = useState("");
  // const [foodButtonClick, setFoodButtonClick] = useState(false);
  // const [predictionsIngredients, setPredictionsIngredients] = useState([]);
  // const [findPredictionIngredients, setFindPredictionIngredients] = useState(
  //   false
  // );
  const [predictionsRecipes, setPredictionsRecipes] = useState([]);

  // const handleClickIngredients = () => {
  //   setIdFromFoodButtonClick("" + food);
  //   setFood("");
  //   setFoodButtonClick(true); //if this is true than open up the textbox with the list of ingredients
  // };

  useEffect(() => {
    // console.log({ idFromFoodButtonClick });
    const base = "https://api.edamam.com/search";
    const YOUR_APP_ID = "1379f77e";
    const YOUR_APP_KEY = "5c98e2c53e8e6a98a17d608177ac37c1";

    // let ingredients = [];
    axios
      .get(
        `${base}?q=penne+pasta&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}`
      )
      .then(res => {
        console.log(res.data);
        console.log(res.data.hits);
        setPredictionsRecipes(res.data.hits);

        // setPredictionsIngredients(res.data);
        // predictionsRecipes.hits.forEach(hit => ({
        //   ingredients: [...this.state.ingredients, hit.recipe.ingredientLines]
        // }));
        // console.log(this.state.ingredients);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

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
        predictionsRecipes={predictionsRecipes}
      />
    </div>
  );
};

export default PredictionHooks;

// food = { food }
// handleClickIngredients = { handleClickIngredients }
// foodButtonClick = { foodButtonClick }
