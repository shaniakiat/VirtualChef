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
      setOriginalRestaurantData(restaurantData);
    }
  }, [restaurantData]);
  const [originalRestaurantData, setOriginalRestaurantData] = useState();


  };
  return (
    <div>
      {buttonClick ? (
        <div>
          {findRestaurantsBtn ? (
              
              <DisplayRestaurant restaurantData={restaurantData} originalRestaurantData={originalRestaurantData}/>
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
