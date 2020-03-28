import React, { useState, useInput, useEffect } from "react";

const DisplayRestaurant = ({ restaurantData }) => {
  return (
    <div>
      {restaurantData.map((obj, i) => (
        <div className="grid-food">
          <li key={obj[1]}>{obj.name}</li>
        </div>
      ))}
    </div>
  );
};
export default DisplayRestaurant;
