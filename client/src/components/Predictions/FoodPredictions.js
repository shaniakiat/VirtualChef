import React from "react";
import { Container } from "reactstrap";
const FoodPredictions = ({
  idFromButtonClick,
  userFood,
  handleClickPrediction,
  setUserFood,
  buttonClick,
  findPrediction,
  predictions,
  food,
  setFood,
  predictionsRecipes,
  handleToogle,
  isToggled,
  idFromFoodButtonClick,
  predictionsIngredients
}) => {
  return (
    <Container className="prediction-container">
      <div className="predictions">
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
          <div>
            {buttonClick ? (
              <div className="foodie">
                {findPrediction ? (
                  <div>
                    <ul>
                      {predictions.map((obj, i) => (
                        <li>
                          <button
                            type="button"
                            onClick={() => handleToogle(obj[0])}
                          >
                            {obj[0]}
                          </button>
                        </li>
                      ))}
                    </ul>
                    {/*-----------------RECIPE---------------------------*/}
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
                                    {console.log(obj.recipe.label)}
                                    <h3 className="label">
                                      {obj.recipe.label.toLowerCase()}
                                    </h3>
                                    <ul>
                                      {obj.recipe.ingredientLines.map(
                                        ngrdnt => (
                                          <li className="ingredients">
                                            {/* {console.log(ngrdnt)} */}
                                            {ngrdnt.toLowerCase()}
                                          </li>
                                        )
                                      )}
                                    </ul>
                                  </li>
                                </div>
                              ))}
                            </div>
                          </ul>
                          {/* <div>{JSON.stringify(predictionsRecipes)}</div> */}
                        </div>
                      ) : (
                        <div></div>
                      )}
                    </div>
                    {/*--------------------------------------------------*/}
                  </div>
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
