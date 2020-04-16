import React, { useState, useEffect, useReducer, useCallback } from "react";
import RestaurantDashBoard from "./RestaurantDashboard";
import {
  addRestaurant,
  deleteRestaurant,
  getRestaurants,
} from "../../../actions/restaurantActions";
import { connect, useDispatch, useSelector } from "react-redux";
import { loadUser } from "../../../actions/authActions";

import Alert from "../../Alert";

import "../../Styles/Restaurants.css";

let validate = require("../Functions/validation");
const axios = require("axios");
const zipcodes = require("zipcodes");

const Restaurants = (props) => {
  const [userID, setUserID] = useState();
  const [userYelpQuery, setUserYelpQuery] = useState();
  const [userZip, setUserZip] = useState();
  const [restaurantData, setRestaurantData] = useState([]);
  const [originalRestaurantData, setOriginalRestaurantData] = useState([]);
  // alert
  const [alert, setAlert] = useState({ show: false });

  // handle alert
  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 3000);
  };

  const [favRestaurantsArray, setFavRestaurantsArray] = useState([]);

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
                Authorization: `Bearer ${key}`,
              },
              params: {
                latitude: zipInfo.latitude,
                longitude: zipInfo.longitude,
              },
            }
          )
          .then((res) => {
            if (res) {
              setRestaurantData(res.data.businesses);
              setOriginalRestaurantData(res.data.businesses);
              // console.log(restaurantData);
              setFindRestaurants(true);
            }
          })
          .catch((err) => {
            console.log(err);
            setFindRestaurants(false);
          });
      } else {
        alert("Please enter in a valid zip code");
        setFindRestaurants(false);
      }
    } else {
      console.log("it's empty");
    }
  };

  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const tokenRecognized = useSelector((state) => state.auth.token);
  useEffect(() => {
    dispatch(loadUser(tokenRecognized));
  }, [dispatch, tokenRecognized]);
  useEffect(() => {
    console.log(auth.isAuthenicated);
    if (auth.user) {
      setUserID(auth.user._id);
    }
  }, [auth.isAuthenicated, auth.user]);

  return (
    <div className="restaurants-page">
      <div className="restaurant-container">
        <h2>Find Restaurants Near Me</h2>
        <input
          type="text"
          placeholder="Enter the food"
          onChange={(e) => setUserYelpQuery(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter a valid zip code"
          onChange={(e) => setUserZip(e.target.value)}
        />
        <button
          className="button-login"
          type="button"
          onClick={findRestaurants}
        >
          Find Restaurants
        </button>
      </div>
      {alert.show && <Alert type={alert.type} text={alert.text} />}
      <Alert />
      <RestaurantDashBoard
        restaurantData={restaurantData}
        setRestaurantData={setRestaurantData}
        originalRestaurantData={originalRestaurantData}
        setOriginalRestaurantData={setOriginalRestaurantData}
        findRestaurantsBtn={findRestaurantsBtn}
        buttonClick={buttonClick}
        userID={userID}
        setUserID={setUserID}
        setFavRestaurantsArray={setFavRestaurantsArray}
        favRestaurantsArray={favRestaurantsArray}
        props={props}
        handleAlert={handleAlert}
      />
    </div>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  item: state.item,
  restaurants: state.restaurant,
});

export default connect(mapStateToProps, {
  addRestaurant,
  deleteRestaurant,
  getRestaurants,
})(Restaurants);
