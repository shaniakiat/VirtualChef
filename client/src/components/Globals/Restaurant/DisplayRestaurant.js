import React, { useState, useInput, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import "../../Styles/Table.css";

const DisplayRestaurant = ({ restaurantData }) => {
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
