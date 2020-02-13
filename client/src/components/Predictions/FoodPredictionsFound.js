import React from "react";
import "../../App.css";
import IngredientsPredictions from "./IngredientsPredictions";

const FoodPredictionsFound = ({
  predictions,
  handleToogle,
  isToggled,
  idFromFoodButtonClick,
  predictionsRecipes,
  isLoading
}) => {
  return (
    <div>
      {isLoading ? (
        <div className="loading">
          <div className="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default FoodPredictionsFound;
