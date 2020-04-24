import React, { useState, useEffect, useReducer, useCallback } from "react";
import { loadUser } from "../../actions/authActions";
import { connect, useDispatch, useSelector } from "react-redux";
import "./../Styles/Documentation.css";
import { genkey } from "../../actions/virtualchefActions";
import axios from "axios";

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
    props.genkey(userID);
    console.log("create new key function finished");
  };

  return (
    <div className="documentation-page">
      {/* if auth.user has apikey, then show your api key, else, show the button */}
      <h1>API Documentation</h1>
      <p>
        Welcome to <strong>Virtual Chef API intergration guide!</strong>
      </p>

      <button type="button" className="button" onClick={createNewKey}>
        Get API Key
      </button>
      <p>Your API key will show up in the bottom of your profile.</p>
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
