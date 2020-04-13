import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import { connect, useDispatch, useSelector } from "react-redux";
import { loadUser } from "../../../actions/authActions";
import "../../Styles/Table.css";

const DisplayRestaurant = ({
  restaurantData,
  userID,
  setUserID,
  setFavRestaurantsArray,
  props,
  handleAlert,
}) => {
  // const [userID, setUserID] = useState();
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const tokenRecognized = useSelector((state) => state.auth.token);

  const restaurantFavoritesArray = useSelector((state) => state.restaurant);

  useEffect(() => {
    // fetch user data when component mounts
    dispatch(loadUser(tokenRecognized));
  }, [dispatch, tokenRecognized]);
  useEffect(() => {
    console.log("LINE 27: " + auth.isAuthenicated);
    if (auth.user) {
      setUserID(auth.user._id);
      axios
        .get(`/api/restaurants/restaurant/${auth.user._id}`)
        .then((res) => {
          return res.data;
        })
        .then((json) => {
          setFavRestaurantsArray(json);
        })
        .catch((err) => console.log(err));
    }
  }, [auth.isAuthenicated, auth.user, setFavRestaurantsArray, setUserID]);

  const submitRestaurantFavorites = (myObj) => {
    if (Boolean(userID)) {
      const newRestaurantFavorite = {
        RestaurantFavorited: myObj,
        userCode: userID,
      };
      props.addRestaurant(newRestaurantFavorite, restaurantFavoritesArray);
      handleAlert({
        type: "success",
        text: `restaurant added`,
      });
    } else {
      handleAlert({
        type: "danger",
        text: `please login to add restaurant to favorite list`,
      });
    }
  };

  //sort by rating
  //sort by price
  //closest
  //sort by alphabetical order
  //reset all filters

  const sortByRatingDescending = (myObj) => {
    let w = myObj.sort(function (a, b) {
      return b.rating - a.rating;
    });
    console.log(w);
  };
  const sortByPriceAscending = (myObj) => {};

  return (
    <div>
      {/* <button
        type="button"
        className="sorting-button"
        onClick={() => sortByRatingDescending(restaurantData)}
      >
        Sort Rating
      </button>
      <button
        type="button"
        className="sorting-button"
        onClick={() => sortByPriceAscending(restaurantData)}
      >
        Sort Price Ascending
      </button> */}

      <table className="table">
        <thead>
          <tr className="row100   head">
            <th className="column100 column1">
              <button type="button" className="sorting-button">
                Restaurant Name
              </button>
            </th>
            <th className="column100 column2">
              <button type="button" className="sorting-button">
                Rating
              </button>
            </th>
            <th className="column100 column3">
              <button type="button" className="sorting-button">
                Price ($)
              </button>
            </th>
            <th className="column100 column4">
              <button type="button" className="sorting-button">
                Phone Number
              </button>
            </th>
            <th className="column100 column5">
              <button type="button" className="sorting-button">
                Address
              </button>
            </th>
            <th className="column100 column6"></th>
          </tr>
        </thead>

        {restaurantData.map((obj) => (
          <tbody key={obj.name}>
            <tr>
              <td className="row100">{obj.name}</td>
              <td className="row100">{obj.rating}</td>
              <td className="row100">{obj.price}</td>
              <td className="row100">{obj.display_phone}</td>
              <td className="row100">
                {obj.location.display_address[0] +
                  ", " +
                  obj.location.display_address[1]}
              </td>
              <td className="favorite-res">
                <button
                  type="button"
                  onClick={() => submitRestaurantFavorites(obj.name)}
                >
                  <FaStar className="faStar" />
                </button>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
};
export default DisplayRestaurant;
