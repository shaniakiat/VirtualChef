import React, { useState, useInput, useEffect } from "react";
import DisplayRestaurant from "./DisplayRestaurant";

const RestaurantDashBoard = ({
  restaurantData,
  setRestaurantData,
  findRestaurantsBtn,
  buttonClick
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
