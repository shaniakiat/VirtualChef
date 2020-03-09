import React from "react";
import { Container } from "reactstrap";
import Fade from "react-reveal/Fade";

import FoodPredictionsFound from "./FoodPredictionsFound";
import NutritionalGraphs from "../Globals/D3Graphs/NutritionalGraphs";

const FoodPredictions = ({
  idFromButtonClick,
  userFood,
  handleClickPrediction,
  setUserFood,
  buttonClick,
  findPrediction,
  predictions,
  predictionsRecipes,
  handleToogle,
  isToggled,
  idFromFoodButtonClick,
  isLoading,
  nutrition
}) => {
  return (
    <Container className="prediction-container">
      <div className="predictions">
        <Fade up>
          <h1>Food Prediction</h1>
          <h3>You are looking for food that similar to </h3>
          <h3 className="idFromButtonClick">
            {idFromButtonClick
              .replace(/\s/g, "")
              .toString()
              .toLowerCase()}
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
            <button
              className="btnOutline"
              type="button"
              onClick={handleClickPrediction}
            >
              Make Prediction
            </button>
            {/*---------------DISPLAY THE FOOD FROM THE FLASK API ---------------*/}
            <div>
              {buttonClick ? (
                <div className="foodie">
                  {findPrediction ? (
                    <FoodPredictionsFound
                      predictions={predictions}
                      handleToogle={handleToogle}
                      isToggled={isToggled}
                      idFromFoodButtonClick={idFromFoodButtonClick}
                      predictionsRecipes={predictionsRecipes}
                      isLoading={isLoading}
                    />
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
        </Fade>
      </div>

      <NutritionalGraphs
        /*----------NUTRITION PREDICTIONS VARIABLES----------*/
        nutrition={nutrition}
      />
    </Container>
  );
};

export default FoodPredictions;

// onClick={handleClickIngredients(obj[0])}

// foodButtonClick ? (
//     <ul>
//         <li>
//             {JSON.stringify(predictionsIngredients)}
//         </li>
//     </ul>
// ) : (
//         <div></div>
//     )
// }
