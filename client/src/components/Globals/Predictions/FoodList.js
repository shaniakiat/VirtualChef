import React from "react";
import "../../Styles/App.css";
import Fade from "react-reveal/Fade";
import { Link } from "react-router-dom";

/* -----DIPSLAY THE LIST OF FOOD TO THE USER ------*/
const FoodList = ({
  predictions,
  // handleToogle,
  // isToggled,
  // idFromFoodButtonClick,
  // predictionsRecipes,
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
              <div className="container-food">
                {predictions.map((obj, i) => (
                  <div className="grid-food">
                    <li key={obj[1]}>
                      <Link to={`/food/${obj[0].replace(/\s/g, "-")}`}>
                        <button type="button">{obj[0]}</button>
                      </Link>
                    </li>
                  </div>
                ))}
              </div>
            </ul>
          </Fade>
          {/*------------------------RECIPE---------------------------*/}
          {/* <IngredientsPredictions
            isToggled={isToggled}
            idFromFoodButtonClick={idFromFoodButtonClick}
            predictionsRecipes={predictionsRecipes}
          /> */}
          {/*---------------------------------------------------------*/}
        </div>
      )}
    </div>
  );
};

export default FoodList;
