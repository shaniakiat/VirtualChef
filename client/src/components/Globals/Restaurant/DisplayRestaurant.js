import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../../../actions/authActions";
import "../../Styles/Table.css";
import { Icon } from "semantic-ui-react";

const DisplayRestaurant = ({
  restaurantData,
  setRestaurantData,

  originalRestaurantData,
  setOriginalRestaurantData,
  userID,
  setUserID,
  setFavRestaurantsArray,
  props,
  handleAlert,
}) => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const tokenRecognized = useSelector((state) => state.auth.token);
  const [sortBy, setSortBy] = useState("None");

  const restaurantFavoritesArray = useSelector((state) => state.restaurant);
  useEffect(() => {
    // fetch user data when component mounts
    dispatch(loadUser(tokenRecognized));
  }, [dispatch, tokenRecognized]);

  useEffect(() => {
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

  const [sortRating, setSortRating] = useState(false);

  const sortByRating = () => {
    setSortRating(!sortRating);
    if (sortRating) {
      // ascending

      const dataArray = [...restaurantData];
      setRestaurantData(dataArray.sort((a, b) => a.rating - b.rating));
      // console.log(restaurantData);
      setSortBy("Rating: Low to High");
    } else {
      //decending
      const dataArray = [...restaurantData];
      setRestaurantData(dataArray.sort((a, b) => b.rating - a.rating));
      // console.log(restaurantData);
      setSortBy("Rating: High to Low");
    }
  };

  const [sortPrice, setSortPrice] = useState(false);

  const sortByPrice = () => {
    setSortPrice(!sortPrice);
    console.log(sortPrice);

    if (sortPrice) {
      // ascending
      const dataArray = [...restaurantData];
      setRestaurantData(
        dataArray.sort(function (a, b) {
          //     return b.rating - a.rating;
          //   });{
          // equal items sort equally
          // if (a.price === b.price) {
          //   return 0;
          // }
          // nulls sort after anything else
          if (a.price === null) {
            return 1;
          } else if (b.price === null) {
            return -1;
          } else return a.price < b.price ? -1 : 1;
        })
      );

      console.log(restaurantData);
      setSortBy("Price: Low to High");
    } else {
      //decending
      const dataArray = [...restaurantData];
      setRestaurantData(
        dataArray.sort(function (a, b) {
          //     return b.rating - a.rating;
          //   });{
          // equal items sort equally
          // if (a.price === b.price) {
          //   return 0;
          // }
          // nulls sort after anything else
          if (a.price === null) {
            return 1;
          } else if (b.price === null) {
            return -1;
          } else return a.price < b.price ? 1 : -1;
        })
      );
      console.log(restaurantData);
      setSortBy("Price: High to Low");
    }
  };

  // a.toString().localeCompare(b);

  const [sortName, setSortName] = useState(false);

  const sortByName = () => {
    setSortName(!sortName);
    if (sortName) {
      // ascending

      const dataArray = [...restaurantData];
      setRestaurantData(dataArray.sort((a, b) => a.name.localeCompare(b.name)));
      // console.log(restaurantData);
      setSortBy("Name: A → Z");
    } else {
      //decending
      const dataArray = [...restaurantData];
      setRestaurantData(dataArray.sort((a, b) => b.name.localeCompare(a.name)));
      // console.log(restaurantData);
      setSortBy("Name: Z → A");
    }
  };

  return (
    <div className="hscroll">
      <p className="sort-message">Sort by: {sortBy}</p>
      <table className="table">
        <thead>
          <tr className="row100   head">
            <th className="column100 column1">
              <button
                type="button"
                className="sorting-button"
                onClick={() => sortByName()}
              >
                Restaurant Name
                <Icon name="sort" />
              </button>
            </th>
            <th className="column100 column2">
              <button
                type="button"
                className="sorting-button"
                onClick={() => sortByRating()}
              >
                Rating
                <Icon name="sort" />
              </button>
            </th>
            <th className="column100 column3">
              <button
                type="button"
                className="sorting-button"
                onClick={() => sortByPrice()}
              >
                Price ($)
                <Icon name="sort" />
              </button>
            </th>
            <th className="column100 column4">Phone Number</th>
            <th className="column100 column5">Address</th>
            <th className="column100 column6"></th>
          </tr>
        </thead>

        {restaurantData.map((obj) => (
          <tbody key={obj.display_phone}>
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
                  className="button-fav"
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
