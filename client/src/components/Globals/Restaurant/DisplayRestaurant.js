import React, { useState, useInput, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import "../../Styles/Table.css";

const DisplayRestaurant = ({
  restaurantData,
  setRestaurantData,
  finalData,
  setFinalData
}) => {
  console.log("LINE 11: " + restaurantData);

  useEffect(() => {
    setRestaurantData(restaurantData);
    console.log(restaurantData);
  }, [restaurantData, setRestaurantData]);

  const sortByRatingDescending = myObj => {
    let w = myObj.sort(function(a, b) {
      return b.rating - a.rating;
    });
    setRestaurantData(w);
    console.log(w);
  };
  const sortbyRatingAscending = myObj => {
    let w = myObj.sort(function(a, b) {
      return a.rating - b.rating;
    });
    setRestaurantData(w);
    console.log(w);
  };
  const sortByName = myObj => {
    let w = myObj.sort(function(a, b) {
      return a.name - b.name;
    });
    console.log(w);
  };
  const sortByPriceAscending = myObj => {
    let w = myObj.sort(function(a, b) {
      return a.price - b.price;
    });
    console.log(w);
    setRestaurantData(w);
  };
  const sortByPriceDescending = myObj => {
    let w = myObj.sort(function(a, b) {
      return b.price - a.price;
    });
    console.log(w);
  };
  const resetFilters = () => {
    // restaurantData = originalRestaurantData;
    return restaurantData;
  };

  return (
    <div>
      <button
        type="button"
        className="div-button"
        onClick={() => sortByRatingDescending(restaurantData)}
      >
        Sort Rating
      </button>
      <button
        type="button"
        className="div-button"
        onClick={() => sortByPriceAscending(restaurantData)}
      >
        Sort Price Ascending
      </button>

      <table className="table">
        <thead>
          <tr className="row100   head">
            <th className="column100 column1">
              <button>Restaurant Name</button>
            </th>
            <th className="column100 column2">
              <button>Rating</button>
            </th>
            <th className="column100 column3">Price ($)</th>
            <th className="column100 column4">Phone Number</th>
            <th className="column100 column5">Address</th>
          </tr>
        </thead>

        {restaurantData.map((obj, i) => (
          <tbody>
            <td key={obj.name} className="row100">
              {obj.name}
            </td>
            <td key={obj.rating} className="row100">
              {obj.rating}
            </td>
            <td key={obj.price} className="row100">
              {obj.price}
            </td>
            <td key={obj.display_phone} className="row100">
              {obj.display_phone}
            </td>
            <td key={obj.location.display_address} className="row100">
              {obj.location.display_address[0] +
                ", " +
                obj.location.display_address[1]}
            </td>
          </tbody>
        ))}
      </table>
    </div>
  );
};
export default DisplayRestaurant;
