import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useInput
} from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { addItem, deleteItem } from "../../actions/itemActions";
const axios = require("axios");

//this will display all the restaurants that the user queries
//so if they want to find food for __ then we will display restaurant

const base = "https://api.yelp.com/v3/graphql";
const clientID = "Yqzm9Y-vJNbpM7hPSLqF_w";
const key =
  "lpT67Un7k91TqxKzp71z9e4DuS4PEt6_6qqXB16AqBI5zjOWultwA7R_XWAoMFhit3fhubCkFoCzccIwTc1bEqNgujNlzMniwqwQztNv905c9hsxkquvYmmzX5BUXnYx";

//https://stackoverflow.com/questions/54224692/how-to-fix-authentication-error-when-querying-yelp-graphql-api-using-apollo-clie
// https://medium.com/dataseries/how-to-use-graphql-api-in-node-js-apps-959c463e41c8
//medium.com/@chaoyue_zhao/how-to-make-axios-api-calls-with-yelp-fusion-inside-react-js-10755d8485c5
const findRestaurants = () => {
  axios
    .get(
      `${"https://cors-anywhere.herokuapp.com/"}https://api.yelp.com/v3/businesses/search?term=pizza`,
      {
        headers: {
          Authorization: `Bearer ${key}`
        },
        params: {
          latitude: 38.89,
          longitude: -77.036
          // categories: "breakfast_brunch"
        }
      }
    )
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
};
const Restaurants = props => {
  return <div></div>;
};
export default { addItem, deleteItem }(Restaurants);
