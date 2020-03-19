import React, {
  useState,
  // useEffect,
  // useCallback,
  // useRef,
  useInput
} from "react";
// import { connect, useDispatch, useSelector } from "react-redux";
// import { addItem, deleteItem } from "../../../actions/itemActions";
const axios = require("axios");
const zipcodes = require("zipcodes");

//this will display all the restaurants that the user queries
//so if they want to find food for __ then we will display restaurant
const Restaurants = props => {
  const [userZip, setUserZip] = useState();

  const base = "https://api.yelp.com/v3/graphql";
  const clientID = "Yqzm9Y-vJNbpM7hPSLqF_w";
  const key =
    "lpT67Un7k91TqxKzp71z9e4DuS4PEt6_6qqXB16AqBI5zjOWultwA7R_XWAoMFhit3fhubCkFoCzccIwTc1bEqNgujNlzMniwqwQztNv905c9hsxkquvYmmzX5BUXnYx";

  //https://stackoverflow.com/questions/54224692/how-to-fix-authentication-error-when-querying-yelp-graphql-api-using-apollo-clie
  // https://medium.com/dataseries/how-to-use-graphql-api-in-node-js-apps-959c463e41c8
  //medium.com/@chaoyue_zhao/how-to-make-axios-api-calls-with-yelp-fusion-inside-react-js-10755d8485c5

  const findRestaurants = () => {
    if (zipcodes.lookup(parseInt(userZip))) {
      let zipInfo = zipcodes.lookup(parseInt(userZip));
      axios
        .get(
          `${"https://cors-anywhere.herokuapp.com/"}https://api.yelp.com/v3/businesses/search?term=pizza`,
          {
            headers: {
              Authorization: `Bearer ${key}`
            },
            params: {
              latitude: zipInfo.latitude,
              longitude: zipInfo.longitude
            }
          }
        )
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      alert("Please enter in a valid zipcode");
    }
  };
  return (
    <div>
      <input type="text" onChange={e => setUserZip(e.target.value)} />
      <button
        className="btnOutline-login"
        type="button"
        onClick={findRestaurants}
      >
        Find Restaurants
      </button>
    </div>
  );
};
export default Restaurants;
