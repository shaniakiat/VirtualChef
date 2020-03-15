import React from "react";

import "../../Styles/Predictions.css";
import NutritionalGraphs from "../D3Graphs/NutritionalGraphs";

const IngredientsPredictions = ({
  isToggled,
  idFromFoodButtonClick,
  predictionsRecipes
}) => {
  return (
    <div>
      {isToggled ? (
        <div>
          <h3>You have clicked on </h3>
          <h3 className="idFromButtonClick">
            {idFromFoodButtonClick.toString().toLowerCase()}
          </h3>
          <ul>
            <div class="grid-container">
              {predictionsRecipes.map(obj => (
                <div class="grid-item">
                  <li>
                    <h3 className="label">{obj.recipe.label.toLowerCase()}</h3>
                    <ul>
                      {obj.recipe.ingredientLines.map(ngrdnt => (
                        <li className="ingredients">{ngrdnt.toLowerCase()}</li>
                      ))}
                    </ul>
                  </li>
                </div>
              ))}
              <NutritionalGraphs />
            </div>
          </ul>
          {/* <div>{JSON.stringify(predictionsRecipes)}</div> */}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default IngredientsPredictions;
