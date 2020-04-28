import React, { useState, useEffect, useLayoutEffect } from "react";
import axios from "axios";
import { connect, useDispatch, useSelector } from "react-redux";
import FoodPredictions from "./FoodPredictions";
import { addItem, deleteItem, getItems } from "../../../actions/itemActions";
import { loadUser } from "../../../actions/authActions";
import "../../Styles/Predictions.css";

let validate = require("../Functions/validation");

const PredictionHooks = (props) => {
  const [userFood, setUserFood] = useState("");
  const [predictions, setPredictions] = useState([]);
  const [idFromButtonClick, setIdFromButtonClick] = useState("");
  const [buttonClick, setButtonClick] = useState(false);
  const [findPrediction, setFindPrediction] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const tokenRecognized = useSelector((state) => state.auth.token);
  const [userID, setUserID] = useState();
  const auth = useSelector((state) => state.auth);
  const foodFavoritesArray = useSelector((state) => state.item);
  const [favArray, setFavArray] = useState([]);

  const handleClickPrediction = () => {
    setLoading(true);
    setButtonClick(true);
    setIdFromButtonClick("" + userFood);
    setUserFood("");
  };

  const dispatch = useDispatch();

  useEffect(() => {
    // fetch user data when component mounts
    dispatch(loadUser(tokenRecognized));
  }, [dispatch, tokenRecognized]);
  useEffect(() => {
    // console.log(auth.isAuthenicated);
    if (auth.user) {
      setUserID(auth.user._id);

      axios
        .get(`/api/items/item/${auth.user._id}`)
        .then((res) => {
          return res.data;
        })
        .then((json) => {
          setFavArray(json);
        })
        .catch((err) => console.log(err));
    }
  }, [auth.isAuthenicated, auth.user, foodFavoritesArray]);

  useLayoutEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  });

  useEffect(() => {
    if (validate.isEmpty(idFromButtonClick)) {
      setFindPrediction(false);
      setPredictions([]);
    } else {
      axios
        .get(`/api/virtualchef/predict/${idFromButtonClick.toLowerCase()}`)
        .then((res) => {
          if (
            res.data.toString() ===
            "Sorry, we couldn't indentify this food yet."
          ) {
            setFindPrediction(false);
            setPredictions([]);
          } else {
            setFindPrediction(true);
            setPredictions(res.data.data);
          }
        })
        .catch((err) => {
          console.log(err);
          setFindPrediction(false);
          setPredictions([]);
        });
    }
  }, [idFromButtonClick]);
  function sleep(delay = 0) {
    return new Promise((resolve) => {
      setTimeout(resolve, delay);
    });
  }

  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      const response = await fetch(
        "https://floating-plains-35923.herokuapp.com/dictionary"
      );
      await sleep(1e3);
      const food = await response.json();

      if (active) {
        setOptions(Object.keys(food).map((key) => food[key]));
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <div>
      <FoodPredictions
        idFromButtonClick={idFromButtonClick}
        userFood={userFood}
        handleClickPrediction={handleClickPrediction}
        setUserFood={setUserFood}
        buttonClick={buttonClick}
        findPrediction={findPrediction}
        predictions={predictions}
        isLoading={isLoading}
        props={props}
        userID={userID}
        foodFavoritesArray={foodFavoritesArray}
        /*----------DICTIONARY----------*/
        open={open}
        setOpen={setOpen}
        options={options}
        loading={loading}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  item: state.item,
});
// export default PredictionHooks;
export default connect(mapStateToProps, {
  addItem,
  deleteItem,
  getItems,
})(PredictionHooks);
