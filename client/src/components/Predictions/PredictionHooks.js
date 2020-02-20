import React, { useState, useEffect, useLayoutEffect } from "react";
import axios from "axios";
// import Loader from "react-loader-spinner";

import "../Styles/Predictions.css";

import FoodPredictions from "./FoodPredictions";

const PredictionHooks = () => {
  //   const [hasError, setErrors] = useState(false);
  const [userFood, setUserFood] = useState("");
  const [predictions, setPredictions] = useState([]);
  const [idFromButtonClick, setIdFromButtonClick] = useState("");
  const [buttonClick, setButtonClick] = useState(false);
  const [findPrediction, setFindPrediction] = useState(false);

  const [isLoading, setLoading] = useState(false);
  // const [loadingSpeed, setLoadingSpeed] = React.useState(1);

  const handleClickPrediction = () => {
    setLoading(true);
    setButtonClick(true);
    setIdFromButtonClick("" + userFood);
    setUserFood("");
  };

  useLayoutEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  });

  /*-----------------------FETCH THE PYTHON API FOR THE FOOD PREDICTIONS-----------------------*/
  useEffect(() => {
    // console.log("THIS HAS TO BE TRUE: " + loading);
    axios
      .get(
        `https://floating-plains-35923.herokuapp.com/prediction/${idFromButtonClick
          // .replace(/\s/g, " ")
          .toLowerCase()}`
      )
      .then(res => {
        console.log("FETCHED");
        // setLoading(false);

        if (
          res.data.toString() === "Sorry, we couldn't indentify this food yet."
        ) {
          // setLoading(false);
          setFindPrediction(false);
          setPredictions([]);
        } else {
          // setLoading(false);
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

  const [idFromFoodButtonClick, setIdFromFoodButtonClick] = useState("");
  const [isToggled, setToggled] = useState(false);
  const [predictionsRecipes, setPredictionsRecipes] = useState([]);

  const handleToogle = e => {
    console.log(e);
    setIdFromFoodButtonClick("" + e);
    console.log(idFromFoodButtonClick.replace(/\s/g, "+").toLocaleLowerCase());
    setToggled(true); //if this is true than open up the textbox with the list of ingredients
  };

  useEffect(() => {
    // console.log({ idFromFoodButtonClick });
    const base = "https://api.edamam.com/search";
    const YOUR_APP_ID = "b1de00a5";
    const YOUR_APP_KEY = "bfff8bc6c4056248b815aa647d415437";

    axios
      .get(
        `${base}?q=${idFromFoodButtonClick
          .replace(/\s/g, "+")
          .toLocaleLowerCase()}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}`
      )
      .then(res => {
        // console.log(res.data);
        // console.log(res.data.hits);
        // console.log(1);
        setPredictionsRecipes(res.data.hits);
      })
      .catch(err => {
        console.log(err);
      });
  }, [idFromFoodButtonClick]);

  return (
    <FoodPredictions
      /*----------FOOD PREDICTIONS VARIABLES----------*/
      idFromButtonClick={idFromButtonClick}
      userFood={userFood}
      handleClickPrediction={handleClickPrediction}
      setUserFood={setUserFood}
      buttonClick={buttonClick}
      findPrediction={findPrediction}
      predictions={predictions}
      isLoading={isLoading}
      /*----------INGREDIENTS PREDICTIONS VARIABLES----------*/
      predictionsRecipes={predictionsRecipes}
      handleToogle={handleToogle}
      isToggled={isToggled}
      idFromFoodButtonClick={idFromFoodButtonClick}
    />
  );
};

export default PredictionHooks;
