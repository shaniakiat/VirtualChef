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
  // const [userFavorite, setUserFavorite] = useInput({ type: "text" });
  const foodFavoritesArray = useSelector(state => state.item.items);
  const name = useSelector(state => state.auth.user.name);
  const userID = useSelector(state => state.auth.user._id);

  // const firstRender = useRef();

  useEffect(() => {
    axios
      .get(`/api/items/item/${userID}`)
      .then(res => {
        return res;
      })
      .then(json => {
        setFavArray(json);
      })
      .catch(err => console.log(err));

    console.log(favArray);
  }, []);

  const submitFavorites = e => {
    e.preventDefault();
    const newFoodFavorite = {
      FoodFavorited: newUserFavorite,
      userCode: userID
    };
    console.log("adding the item");
    props.addItem(newFoodFavorite, foodFavoritesArray);
    console.log(newFoodFavorite);
  };

  return (
    <main>
      <div>
        <span></span>
        <span>Hello {name}!</span> <br />
        <span>Enter in the food you like</span>
        <textarea
          type="text"
          placeholder="Your favorites Food here"
          onChange={e => setNewUserFavorite(e.target.value)}
        ></textarea>
        <button type="button" onClick={submitFavorites}>
          Submit your favorite
        </button>
      </div>
    </main>
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
