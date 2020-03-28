import React, {
  useState,
  // useEffect,
  // useCallback,
  // useRef,
  useInput
} from "react";
import RestaurantDashBoard from "./RestaurantDashboard";

let validate = require("../Functions/validation");
const axios = require("axios");
const zipcodes = require("zipcodes");

const Restaurants = props => {
  const [userYelpQuery, setUserYelpQuery] = useState();
  const [userZip, setUserZip] = useState();
  const [restaurantData, setRestaurantData] = useState([]);
  const [findRestaurantsBtn, setFindRestaurants] = useState(false);
  const [buttonClick, setButtonClick] = useState(false);
  const key =
    "lpT67Un7k91TqxKzp71z9e4DuS4PEt6_6qqXB16AqBI5zjOWultwA7R_XWAoMFhit3fhubCkFoCzccIwTc1bEqNgujNlzMniwqwQztNv905c9hsxkquvYmmzX5BUXnYx";

  const findRestaurants = () => {
    setButtonClick(true);
    if (!validate.isEmpty(userYelpQuery)) {
      if (zipcodes.lookup(parseInt(userZip))) {
        let zipInfo = zipcodes.lookup(parseInt(userZip));
        axios
          .get(
            `${"https://cors-anywhere.herokuapp.com/"}https://api.yelp.com/v3/businesses/search?term=${userYelpQuery}`,
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
            if (res) {
              setRestaurantData(res.data.businesses);
              setFindRestaurants(true);
            }
          })
          .catch(err => {
            console.log(err);
            setFindRestaurants(false);
          });
      } else {
        alert("Please enter in a valid zipcode");
        setFindRestaurants(false);
      }
    } else {
      console.log("it's empty");
    }
  };
  return (
    <div>
      <input
        type="text"
        placeholder="Enter the food you would like to search"
        onChange={e => setUserYelpQuery(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter your zipcode"
        onChange={e => setUserZip(e.target.value)}
      />
      <button className="button-login" type="button" onClick={findRestaurants}>
        Find Restaurants
      </button>

      <RestaurantDashBoard
        restaurantData={restaurantData}
        findRestaurantsBtn={findRestaurantsBtn}
        buttonClick={buttonClick}
      />
    </div>
  );
};
export default Restaurants;
