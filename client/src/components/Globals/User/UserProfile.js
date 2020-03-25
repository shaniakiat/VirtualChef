import React, { useState, useEffect } from "react";
import { TiDelete } from "react-icons/ti";
import Restaurants from "../Restaurant/Restaurants";
import { connect, useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addItem, deleteItem, getItems } from "../../../actions/itemActions";
// import IngredientsPredictions from "../Predictions/IngredientsPredictions";
import { loadUser } from "../../../actions/authActions";
import { Link } from "react-router-dom";

// import { createSelector } from "reselect";

const UserProfile = props => {
  const [newUserFavorite, setNewUserFavorite] = useState("");
  const [favArray, setFavArray] = useState([]);
  const [userID, setUserID] = useState();
  const tokenRecognized = useSelector(state => state.auth.token);

  const auth = useSelector(state => state.auth);
  const foodFavoritesArray = useSelector(state => state.item.items);

  const dispatch = useDispatch();

  useEffect(() => {
    // fetch user data when component mounts
    dispatch(loadUser(tokenRecognized));
  }, [dispatch, tokenRecognized]);

  useEffect(() => {
    console.log(auth.isAuthenicated);
    if (auth.user) {
      setUserID(auth.user._id);
      axios
        .get(`/api/items/item/${auth.user._id}`)
        .then(res => {
          return res.data;
        })
        .then(json => {
          setFavArray(json);
        })
        .catch(err => console.log(err));
    }
  }, [auth.isAuthenicated, auth.user]);
  console.log(favArray);

  const submitFavorites = e => {
    e.preventDefault();
    const newFoodFavorite = {
      FoodFavorited: newUserFavorite,
      userCode: userID
    };
    console.log("adding the item");

    // foodItems
    props.addItem(newFoodFavorite, foodFavoritesArray);
    console.log(newFoodFavorite);
    fetchFavoriteFood();
  };

  const fetchFavoriteFood = () => {
    axios
      .get(`/api/items/item/${auth.user._id}`)
      .then(res => {
        return res.data;
      })
      .then(json => {
        setFavArray(json);
      })
      .catch(err => console.log(err));
  };
  const deleteFav = id => {
    props.deleteItem(id);
    fetchFavoriteFood();
  };

  // GETTING INGREDIENTS
  const [idFromFoodButtonClick, setIdFromFoodButtonClick] = useState("");
  const [isToggled, setToggled] = useState(false);
  const [predictionsRecipes, setPredictionsRecipes] = useState([]);

  const handleToogle = e => {
    console.log(e);
    setIdFromFoodButtonClick("" + e);
    console.log(idFromFoodButtonClick.replace(/\s/g, "+").toLocaleLowerCase());
    setToggled(true); //if this is true than open up the textbox with the list of ingredients
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
      .then(res => {
        setPredictionsRecipes(res.data.hits);
      })
      .catch(err => {
        console.log(err);
      });
  }, [idFromFoodButtonClick]);

  return (
    <div className="login">
      <h1>
        Hi!👋
        {/* Hello {auth.charAt(0).toUpperCase() + auth.slice(1).toLowerCase()}! */}
      </h1>
      <h3>What is your favorite food?</h3>

      <input
        type="text"
        placeholder="Enter Your Favorite Food"
        onChange={e => setNewUserFavorite(e.target.value)}
        className="input"
      ></input>
      <button className="button-login" type="button" onClick={submitFavorites}>
        Submit your favorite
      </button>
      <div className="favFoodList">
        <h3>Your Favorite Food:</h3>
        <ul>
          {favArray.map(obj => (
            <li>
              <Link to={`/user/${obj.FoodFavorited.replace(/\s/g, "-")}`}>
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
          ))}
        </ul>
        {/* <IngredientsPredictions
          isToggled={isToggled}
          idFromFoodButtonClick={idFromFoodButtonClick}
          predictionsRecipes={predictionsRecipes}
        /> */}
        <Restaurants />
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { addItem, deleteItem, getItems })(
  UserProfile
);
