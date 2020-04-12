import React, { useState, useEffect } from "react";
// import {
//   addItem,
//   deleteItem,
//   getItems,
// } from "../../../actions/restaurantActions";
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
}) => {
  // const [userID, setUserID] = useState();
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const tokenRecognized = useSelector((state) => state.auth.token);

  // useEffect(() => {
  //   dispatch(loadUser(tokenRecognized));
  // }, [dispatch, tokenRecognized]);
  // useEffect(() => {
  //   console.log(auth.isAuthenicated);
  //   if (auth.user) {
  //     setUserID(auth.user._id);
  //   }
  // }, [auth.isAuthenicated, auth.user]);

  const [newUserRestaurantFavorite, setNewUserRestaurantFavorite] = useState(
    ""
  );
  const restaurantFavoritesArray = useSelector((state) => state.restaurant);

  useEffect(() => {
    // fetch user data when component mounts
    dispatch(loadUser(tokenRecognized));
  }, [dispatch, tokenRecognized]);
  useEffect(() => {
    console.log(auth.isAuthenicated);
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

  // const addFavorites = (params) => {
  //   // params.preventDefault();
  //   //add favorites function does not work
  //   // console.log("printing out props");
  //   // console.log(props);
  //   // console.log("done printing props");

  //   const newFavoriteRestaurant = {
  //     RestaurantFavorite: params,
  //     userCode: userID,
  //   };

  // };

  const submitRestaurantFavorites = (myObj) => {
    // e.preventDefault();
    const newRestaurantFavorite = {
      RestaurantFavorited: newUserRestaurantFavorite,
      userCode: userID,
    };

    props.addRestaurant(newRestaurantFavorite, restaurantFavoritesArray);
    console.log(newRestaurantFavorite);

    console.log("adding the item");
    console.log(newRestaurantFavorite);
    // props.addItem(newFavoriteRestaurant, favoriteRestaurantObj);
    console.log("adding finished");
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
            <th className="column100 column6">Add to Favorites</th>
          </tr>
        </thead>

        {restaurantData.map((obj) => (
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
            <td className="row100">
              <button onClick={() => submitRestaurantFavorites(obj.name)}>
                Add to fave
              </button>
            </td>
          </tbody>
        ))}
      </table>
    </div>
  );
};
// const mapStateToProps = (state) => ({
//   auth: state.auth,
//   errors: state.errors,
//   item: state.item,
//   restaurant: state.restaurantData,
// });
export default DisplayRestaurant;
