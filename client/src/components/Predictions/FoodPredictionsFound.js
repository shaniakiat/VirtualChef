import React from "react";

import IngredientsPredictions from "./IngredientsPredictions";

const FoodPredictionsFound = ({
  predictions,
  handleToogle,
  isToggled,
  idFromFoodButtonClick,
  predictionsRecipes
}) => {
  return (
    <div>
      <ul>
        {predictions.map((obj, i) => (
          <li>
            <button type="button" onClick={() => handleToogle(obj[0])}>
              {obj[0]}
            </button>
          </li>
        ))}
      </ul>
      {/*------------------------RECIPE---------------------------*/}
      <IngredientsPredictions
        isToggled={isToggled}
        idFromFoodButtonClick={idFromFoodButtonClick}
        predictionsRecipes={predictionsRecipes}
      />
      {/*---------------------------------------------------------*/}
    </div>
  );
};

export default FoodPredictionsFound;
