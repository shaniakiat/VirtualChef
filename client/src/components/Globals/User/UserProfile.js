import React, { useState, useEffect } from "react";

import { TiDelete } from "react-icons/ti";

import Restaurants from "../Restaurant/Restaurants";
import NutritionalGraphs from "../D3Graphs/NutritionalGraphs";

import { Link } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addItem, deleteItem } from "../../../actions/itemActions";
import IngredientsPredictions from "../Predictions/IngredientsPredictions";
import { push } from "connected-react-router";
import { loadUser } from "../../../actions/authActions";
// import { useDispatch } from "react-redux";

const UserProfile = props => {
  const [newUserFavorite, setNewUserFavorite] = useState("");
  const [favArray, setFavArray] = useState([]);
  const [load, setLoad] = useState(false);
  // const [userFavorite, setUserFavorite] = useInput({ type: "text" });
  const tokenRecognized = useSelector(state => state.auth.token);
  const loggedin = useSelector(state => state.auth.isAuthenticated);
  const foodFavoritesArray = useSelector(state => state.item.items);
  const name = useSelector(state => state.auth.user.name);
  const userID = useSelector(state => state.auth.user._id);

  const dispatch = useDispatch();
  // const firstRender = useRef();

  useEffect(() => {
    // if (loggedin === true || tokenRecognized != null) {
    // }
    dispatch(loadUser(tokenRecognized));

    axios
      .get(`/api/items/item/${userID}`)
      .then(res => {
        return res.data;
      })
      .then(json => {
        setFavArray(json);
      })
      .catch(err => console.log(err));
  }, [userID]);
  console.log(favArray);

  const submitFavorites = e => {
    e.preventDefault();
    const newFoodFavorite = {
      FoodFavorited: newUserFavorite,
      userCode: userID
    };
    console.log("adding the item");
    props.addItem(newFoodFavorite, foodFavoritesArray);
    console.log(newFoodFavorite);
    fetchFavoriteFood();
  };

  const fetchFavoriteFood = () => {
    axios
      .get(`/api/items/item/${userID}`)
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
    // console.log({ idFromFoodButtonClick });
    const base = "https://api.edamam.com/search";
    const YOUR_APP_ID = "b1de00a5";
    const YOUR_APP_KEY = "bfff8bc6c4056248b815aa647d415437";

    axios
      .get(
        `${base}?q=${idFromFoodButtonClick
          .replace(/\s/g, "+")
          .toLocaleLowerCase()}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}`
      )
      .then(res => {
        // console.log(res.data);
        // console.log(res.data.hits);
        // console.log(1);
        setPredictionsRecipes(res.data.hits);
      })
      .catch(err => {
        console.log(err);
      });
  }, [idFromFoodButtonClick]);

  return (
    <div className="login">
      {/* <span>{setLoad(true</span> */}
      <h1>
        Hello {name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()}!
      </h1>
      <h3>What is your favorite food?</h3>

      <input
        type="text"
        placeholder="Enter Your Favorite Food"
        onChange={e => setNewUserFavorite(e.target.value)}
        className="input"
      ></input>
      <button
        className="btnOutline-login"
        type="button"
        onClick={submitFavorites}
      >
        Submit your favorite
      </button>
      <div className="favFoodList">
        <h3>Your Favorite Food:</h3>
        <ul>
          {favArray.map(obj => (
            <li>
              <button
                type="button"
                onClick={() => handleToogle(obj.FoodFavorited)}
              >
                {obj.FoodFavorited}
              </button>
              {/* <button>Delete button</button> */}
              <TiDelete
                className="tiDelete"
                onClick={() => deleteFav(obj._id)}
              />
            </li>
          ))}
        </ul>
        <IngredientsPredictions
          isToggled={isToggled}
          idFromFoodButtonClick={idFromFoodButtonClick}
          predictionsRecipes={predictionsRecipes}
        />
        <Restaurants />
        <NutritionalGraphs />
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { addItem, deleteItem })(UserProfile);
