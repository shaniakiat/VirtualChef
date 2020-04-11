import React, { useState, useInput, useEffect } from "react";
import {
  addItem,
  deleteItem,
  getItems,
} from "../../../actions/restaurantActions";
import { connect, useDispatch, useSelector } from "react-redux";
import { loadUser } from "../../../actions/authActions";
import "../../Styles/Table.css";

const DisplayRestaurant = ({ restaurantData }, props) => {
  const [userID, setUserID] = useState();
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const tokenRecognized = useSelector((state) => state.auth.token);
  const favoriteRestaurantObj = useSelector((state) => state.restaurant);

  useEffect(() => {
    dispatch(loadUser(tokenRecognized));
  }, [dispatch, tokenRecognized]);
  useEffect(() => {
    console.log(auth.isAuthenicated);
    if (auth.user) {
      setUserID(auth.user._id);
    }
  }, [auth.isAuthenicated, auth.user]);

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
  const sortbyRatingAscending = (myObj) => {
    let w = myObj.sort(function (a, b) {
      return a.rating - b.rating;
    });
    console.log(w);
  };
  const sortByName = (myObj) => {
    let w = myObj.sort(function (a, b) {
      return a.name - b.name;
    });
  };
  const sortByPriceAscending = (myObj) => {
    let w = myObj.sort(function (a, b) {
      return a.price - b.price;
    });
  };
  const sortByPriceDescending = (myObj) => {
    let w = myObj.sort(function (a, b) {
      return b.price - a.price;
    });
    console.log(w);
  };
  const resetFilters = () => {
    // restaurantData = originalRestaurantData;
    return restaurantData;
  };

  const addFavorites = (params) => {
    // params.preventDefault();
    //add favorites function does not work
    console.log("printing out props");
    console.log(props);
    console.log("done printing props");

    const newFavoriteRestaurant = {
      RestaurantFavorite: params,
      userCode: userID,
    };
    console.log("adding the item");
    console.log(newFavoriteRestaurant);
    props.addItem(newFavoriteRestaurant, favoriteRestaurantObj);
    console.log("adding finished");
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
            <th className="column100 column6">Add to Favorites</th>
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
            <td className="row100">
              <button onClick={() => addFavorites(obj.name)}>
                Add to fave
              </button>
            </td>
          </tbody>
        ))}
      </table>
    </div>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  item: state.item,
  restaurant: state.restaurantData,
});

export default connect(mapStateToProps, { addItem, deleteItem, getItems })(
  DisplayRestaurant
);
