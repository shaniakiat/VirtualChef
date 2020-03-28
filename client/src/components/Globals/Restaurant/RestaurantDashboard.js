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
    // <div>
    //   {findRestaurantsBtn ? (
    //     <DisplayRestaurant restaurantData={restaurantData} />
    //   ) : (
    //     <div>
    //       <p>Something went wrong</p>
    //     </div>
    //   )}
    // </div>
    <div>
      {buttonClick ? (
        <div>
          {findRestaurantsBtn ? (
            <DisplayRestaurant restaurantData={restaurantData} />
          ) : (
            <div>
              <p>Sorry, we couldn't indentify this food yet.</p>
            </div>
          )}
        </div>
      ) : (
        <div>
          <p>Enter in a Food and a valid zipcode</p>
        </div>
      )}
    </div>
  );
};

export default RestaurantDashBoard;
