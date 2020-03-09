import React from "react";
import "../../Styles/App.css";
import IngredientsPredictions from "./IngredientsPredictions";
import Fade from "react-reveal/Fade";

/* -----DIPSLAY THE LIST OF FOOD TO THE USER ------*/
const FoodList = ({
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
          <Fade up>
            <ul>
              {predictions.map((obj, i) => (
                <li>
                  <button type="button" onClick={() => handleToogle(obj[0])}>
                    {obj[0]}
                  </button>
                </li>
              ))}
            </ul>
          </Fade>
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

export default FoodList;
