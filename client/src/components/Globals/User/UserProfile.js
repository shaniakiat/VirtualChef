import React, { useState, useEffect } from "react";
import { TiDelete } from "react-icons/ti";
import { connect, useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addItem, deleteItem, getItems } from "../../../actions/itemActions";
import {
  addRestaurant,
  deleteRestaurant,
  getRestaurants,
} from "../../../actions/restaurantActions";
import { loadUser } from "../../../actions/authActions";
import { Link } from "react-router-dom";

import Fade from "react-reveal/Fade";

const UserProfile = (props) => {
  const [newUserFavorite, setNewUserFavorite] = useState("");
  const [name, setName] = useState("");
  const [favArray, setFavArray] = useState([]);
  const [restaurantFavorites, setRestaurantFavorites] = useState([]);
  const [userID, setUserID] = useState();
  const tokenRecognized = useSelector((state) => state.auth.token);
  // const name = useSelector((state) => state.auth.user.name);
  const auth = useSelector((state) => state.auth);
  const foodFavoritesArray = useSelector((state) => state.item);
  const favoriteRestaurantArraay = useSelector((state) => state.restaurant);

  const dispatch = useDispatch();

  useEffect(() => {
    // fetch user data when component mounts
    dispatch(loadUser(tokenRecognized));
  }, [dispatch, tokenRecognized]);
  useEffect(() => {
    // console.log(auth.isAuthenicated);
    if (auth.user) {
      setUserID(auth.user._id);
      setName(auth.user.name);
      axios
        .get(`/api/items/item/${auth.user._id}`)
        .then((res) => {
          return res.data;
        })
        .then((json) => {
          setFavArray(json);
        })
        .catch((err) => console.log(err));
      axios
        .get(`/api/restaurants/restaurant/${auth.user._id}`)
        .then((res) => {
          // console.log(res.data);
          return res.data;
        })
        .then((json) => {
          setRestaurantFavorites(json);
        })
        .catch((err) => console.log(err));
    }
  }, [
    auth.isAuthenicated,
    auth.user,
    foodFavoritesArray,
    favoriteRestaurantArraay,
  ]);

  const submitFavorites = (e) => {
    e.preventDefault();
    const newFoodFavorite = {
      FoodFavorited: newUserFavorite,
      userCode: userID,
    };

    props.addItem(newFoodFavorite, foodFavoritesArray);
    // console.log(newFoodFavorite);
  };

  //delete favorite food
  const deleteFav = (id) => {
    props.deleteItem(id);
  };

  //delete favorite restaurant
  const deleteFavoriteRes = (id) => {
    props.deleteRestaurant(id);
  };

  // GETTING INGREDIENTS
  const [idFromFoodButtonClick, setIdFromFoodButtonClick] = useState("");
  // const [isToggled, setToggled] = useState(false);
  const [predictionsRecipes, setPredictionsRecipes] = useState([]);

  const handleToogle = (e) => {
    // console.log(e);
    setIdFromFoodButtonClick("" + e);
    // console.log(idFromFoodButtonClick.replace(/\s/g, "+").toLocaleLowerCase());
    // setToggled(true); //if this is true than open up the textbox with the list of ingredients
  };

  useEffect(() => {
    const base = "https://api.edamam.com/search";
    const YOUR_APP_ID = "d9383e24";
    const YOUR_APP_KEY = "d76bf79039ba4df599b7902b99cb0630";

    axios
      .get(
        `${base}?q=${idFromFoodButtonClick
          .replace(/\s/g, "+")
          .toLocaleLowerCase()}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}`
      )
      .then((res) => {
        setPredictionsRecipes(res.data.hits);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [idFromFoodButtonClick]);

  return (
    <div className="login">
      <div className="user-hello">
        <Fade up delay={50}>
          <h1>Hello {name}</h1>
        </Fade>
        <Fade up delay={200}>
          <h3>What is your favorite food?</h3>
        </Fade>
        <Fade up delay={350}>
          <input
            type="text"
            placeholder="Enter Your Favorite Food"
            onChange={(e) => setNewUserFavorite(e.target.value)}
            className="input"
          ></input>
        </Fade>
        <Fade up delay={500}>
          <button
            className="button-login"
            type="button"
            onClick={submitFavorites}
          >
            Submit your favorite
          </button>
        </Fade>
      </div>
      <div className="user-container">
        <div>
          <Fade up delay={650}>
            <div className="fav-food">
              <h3>Your favorite foods:</h3>
              <ul>
                {favArray.length === 0 ? (
                  <div>
                    <p className="fav-food-empty">
                      It's empty. Please add your favorite food!
                    </p>
                  </div>
                ) : (
                  favArray.map((obj) => (
                    <li>
                      <Link
                        to={`/user/food/${obj.FoodFavorited.replace(
                          /\s/g,
                          "-"
                        )}`}
                      >
                        <button
                          type="button"
                          onClick={() => handleToogle(obj.FoodFavorited)}
                        >
                          {obj.FoodFavorited}
                        </button>
                      </Link>
                      {/* <button>Delete button</button> */}
                      <TiDelete
                        className="tiDelete"
                        onClick={() => deleteFav(obj._id)}
                      />
                    </li>
                  ))
                )}
              </ul>
            </div>
          </Fade>
        </div>
        <div>
          <Fade up delay={650}>
            <div className="fav-restaurant">
              <h3>Your favorite Restaurants:</h3>
              <ul>
                {restaurantFavorites.length === 0 ? (
                  <div>
                    <p className="fav-food-empty">
                      It's empty. Go to the{" "}
                      <Link className="link-p" to="/user/restaurant">
                        Restaurant page
                      </Link>{" "}
                      and add your favorite restaurant!😊
                    </p>
                  </div>
                ) : (
                  restaurantFavorites.map((obj) => (
                    <li className="restaurants-list">
                      {obj.RestaurantFavorited}

                      <TiDelete
                        className="tiDelete"
                        onClick={() => deleteFavoriteRes(obj._id)}
                      />
                    </li>
                  ))
                )}
              </ul>

              {/* <Restaurants /> */}
            </div>
          </Fade>
        </div>
      </div>
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
  addItem,
  deleteItem,
  getItems,
  addRestaurant,
  deleteRestaurant,
  getRestaurants,
})(UserProfile);
