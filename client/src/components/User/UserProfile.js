import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useInput
} from "react";
import { Link } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addItem } from "../../actions/itemActions";
import PropTypes from "prop-types";

const UserProfile = props => {
  const [newUserFavorite, setNewUserFavorite] = useState("");
  const [favArray, setFavArray] = useState([]);
  const [load, setLoad] = useState(false);
  // const [userFavorite, setUserFavorite] = useInput({ type: "text" });
  const foodFavoritesArray = useSelector(state => state.item.items);
  const name = useSelector(state => state.auth.user.name);
  const userID = useSelector(state => state.auth.user._id);

  // const firstRender = useRef();

  useEffect(() => {
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

  return (
    <div className="user-profile">
      {/* <span>{setLoad(true</span> */}
      <h1>Hello {name}!</h1>
      <h3>Enter in the food you like</h3>

      <input
        type="text"
        placeholder="Enter Your Favorite Food Here"
        onChange={e => setNewUserFavorite(e.target.value)}
        className="input"
      ></input>
      <button className="btnOutline" type="button" onClick={submitFavorites}>
        Submit your favorite
      </button>
      <div>
        <ul>
          {favArray.map(obj => (
            <li>
              {obj.FoodFavorited}
              {/* </button> */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// UserProfile.propTypes = {
//   addItem: PropTypes.func.isRequired,
//   auth: PropTypes.object.isRequired,
//   errors: PropTypes.object.isRequired
// };
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { addItem })(UserProfile);
