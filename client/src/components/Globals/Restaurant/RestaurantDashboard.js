import React, { useState, useInput, useEffect } from "react";
import DisplayRestaurant from "./DisplayRestaurant";

const RestaurantDashBoard = ({
  restaurantData,
  setRestaurantData,
  findRestaurantsBtn,
  buttonClick,
  userID,
  setUserID,
  setFavRestaurantsArray,
  favRestaurantsArray,
  props,
}) => {
  const [finalData, setFinalData] = useState([]);
  useEffect(() => {
    if (restaurantData) {
      console.log("LINE 13: " + restaurantData);
      setRestaurantData(restaurantData);
    }
  }, [restaurantData, setRestaurantData]);
  return (
    <div>
      {buttonClick ? (
        <div>
          {findRestaurantsBtn ? (
            <DisplayRestaurant
              restaurantData={restaurantData}
              setRestaurantData={setRestaurantData}
              finalData={finalData}
              setFinalData={setFinalData}
              userID={userID}
              setUserID={setUserID}
              setFavRestaurantsArray={setFavRestaurantsArray}
              favRestaurantsArray={favRestaurantsArray}
              props={props}
            />
          ) : (
            <div className="loading">
              <div className="lds-ellipsis">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default RestaurantDashBoard;
