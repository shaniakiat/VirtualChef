import React, { useState, useEffect, useReducer, useCallback } from "react";
import { loadUser } from "../../actions/authActions";
import { connect, useDispatch, useSelector } from "react-redux";
import axios from "axios";

import "./../Styles/Documentation.css";

// import generateKey from "./Functions/virtualchef";
import { genkey } from "../../actions/virtualchefActions";

//need to fetch the user and it's props
//get if the user has a key~~

const Documentation = (props) => {
  const auth = useSelector((state) => state.auth);
  const tokenRecognized = useSelector((state) => state.auth.token);
  const [userID, setUserID] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser(tokenRecognized));
  }, [dispatch, tokenRecognized]);
  useEffect(() => {
    console.log(auth.isAuthenicated);
    if (auth.user) {
      setUserID(auth.user._id);
    }
  }, [auth.isAuthenicated, auth.user]);

  const createNewKey = () => {
    console.log(userID);
    genkey(userID);
    console.log(auth.user);
    console.log("finished");
  };

  return (
    <div className="documentation-page">
      <h1>Hello</h1>
      <button onClick={createNewKey}>Get your API key</button>
    </div>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, {
  genkey,
})(Documentation);
