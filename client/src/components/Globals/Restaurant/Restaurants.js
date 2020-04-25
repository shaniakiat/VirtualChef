import React, { useState, useEffect } from "react";
import RestaurantDashBoard from "./RestaurantDashboard";
import {
  addRestaurant,
  deleteRestaurant,
  getRestaurants,
} from "../../../actions/restaurantActions";
import { connect, useDispatch, useSelector } from "react-redux";
import { loadUser } from "../../../actions/authActions";

import Fade from "react-reveal/Fade";

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
  const [alert, setAlert] = useState({ show: false });

  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 3000);
  };

  const [favRestaurantsArray, setFavRestaurantsArray] = useState([]);
  const [findRestaurantsBtn, setFindRestaurants] = useState(false);
  const [noRestaurantFound, setNoRestaurantFound] = useState(false);
  const [buttonClick, setButtonClick] = useState(false);

  const findRestaurants = () => {
    setButtonClick(true);
    if (!validate.isEmpty(userYelpQuery)) {
      if (zipcodes.lookup(parseInt(userZip))) {
        console.log(userZip);
        let zipInfo = zipcodes.lookup(parseInt(userZip));
        axios
          .get(
            `api/virtualchef/fetch-yelp/${zipInfo.longitude}/${zipInfo.latitude}/${userYelpQuery}`
          )
          .then((res) => {
            if (res) {
              setRestaurantData(res.data.data.businesses);
              setOriginalRestaurantData(res.data.data.businesses);
              console.log(restaurantData);
              setFindRestaurants(true);
            }
          })
          .catch((err) => {
            console.log(err);
            setFindRestaurants(false);
          });
      } else {
        console.log("Please enter in a valid zip code");
        setFindRestaurants(false);
        setNoRestaurantFound(true);
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
        <Fade up delay={50}>
          <h2>Find Restaurants Near Me</h2>
        </Fade>
        <Fade up delay={200}>
          <input
            type="text"
            placeholder="Enter the food"
            onChange={(e) => setUserYelpQuery(e.target.value)}
          />
        </Fade>
        <Fade up delay={350}>
          <input
            type="text"
            placeholder="Enter a valid zip code"
            onChange={(e) => setUserZip(e.target.value)}
          />
        </Fade>
        <Fade up delay={500}>
          <button
            className="button-login"
            type="button"
            onClick={findRestaurants}
          >
            Find Restaurants
          </button>
        </Fade>
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
        noRestaurantFound={noRestaurantFound}
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
