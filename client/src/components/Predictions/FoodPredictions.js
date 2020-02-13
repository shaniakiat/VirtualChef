import React from "react";
import { Container } from "reactstrap";

import FoodPredictionsFound from "./FoodPredictionsFound";

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
  isLoading
}) => {
  return (
    <Container className="prediction-container">
      <div className="predictions">
        <h1>Food Prediction</h1>
        <h3>You are looking for food that similar to </h3>
        {/*---------------GETTING THE NAME OF THE FOOD WHEN USER INPUTS AND CLICKS ON THE BUTTON ---------------*/}
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
      </div>
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
