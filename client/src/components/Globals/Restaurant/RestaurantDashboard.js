import React, { useState, useInput, useEffect } from "react";
import DisplayRestaurant from "./DisplayRestaurant";

const RestaurantDashBoard = ({
  restaurantData,
  findRestaurantsBtn,
  buttonClick
}) => {
  useEffect(() => {
    if (restaurantData) {
      console.log(restaurantData);
    }
  }, [restaurantData]);
  return (
    <div>
      {buttonClick ? (
        <div>
          {findRestaurantsBtn ? (
            <DisplayRestaurant restaurantData={restaurantData} />
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
