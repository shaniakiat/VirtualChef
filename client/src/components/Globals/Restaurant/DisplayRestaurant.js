import React, { useState, useInput, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import "../../Styles/Table.css";

const DisplayRestaurant = ({ restaurantData }) => {
  //sort by rating
  //sort by price
  //closest
  //sort by alphabetical order
  //reset all filters

  const sortByRatingDescending = myObj => {
    let w = myObj.sort(function(a, b) {
      return b.rating - a.rating;
    });
    console.log(w);
  };
  const sortbyRatingAscending = myObj => {
    let w = myObj.sort(function(a, b) {
      return a.rating - b.rating;
    });
    console.log(w);
  };
  const sortByName = myObj => {
    let w = myObj.sort(function(a, b) {
      return a.name - b.name;
    });
  };
  const sortByPriceAscending = myObj => {
    let w = myObj.sort(function(a, b) {
      return a.price - b.price;
    });
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
      <table className="table">
        <thead>
          <tr className="row100   head">
            <th className="column100 column1">Restaurant Name</th>
            <th className="column100 column2">Rating</th>
            <th className="column100 column3">Price ($)</th>
            <th className="column100 column4">Phone Number</th>
            <th className="column100 column5">Address</th>
          </tr>
        </thead>

        {restaurantData.map((obj, i) => (
          <tbody>
            <td className="row100">{obj.name}</td>
            <td className="row100">{obj.rating}</td>
            <td className="row100">{obj.price}</td>
            <td className="row100">{obj.display_phone}</td>
            <td className="row100">
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
