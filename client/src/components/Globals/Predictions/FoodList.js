import React from "react";
import "../../Styles/App.css";
import Fade from "react-reveal/Fade";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { addItem } from " ../../../client/src/actions/itemActions";
import { connect, useDispatch, useSelector } from "react-redux";

/* -----DIPSLAY THE LIST OF FOOD TO THE USER ------*/
const FoodList = ({
  predictions,
  props,
  isLoading,
  foodFavoritesArray,
  userID,
  handleAlert,
}) => {
  const submitFavorites = (e) => {
    if (Boolean(userID)) {
      const newFoodFavorite = {
        FoodFavorited: e,
        userCode: userID,
      };
      props.addItem(newFoodFavorite, foodFavoritesArray);
      handleAlert({
        type: "success",
        text: `food added`,
      });
    } else {
      handleAlert({
        type: "danger",
        text: `please login to add food to favorite list`,
      });
    }
  };

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
                    <div>
                      <li key={obj[1]}>
                        <Link to={`/food/${obj[0].replace(/\s/g, "-")}`}>
                          <button type="button">{obj[0]}</button>
                        </Link>
                      </li>
                    </div>
                    <div className="food-list-fav">
                      <button
                        type="button"
                        onClick={() => submitFavorites(obj[0])}
                      >
                        <FaStar className="faStar" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </ul>
          </Fade>
        </div>
      )}
    </div>
  );
};

export default FoodList;
