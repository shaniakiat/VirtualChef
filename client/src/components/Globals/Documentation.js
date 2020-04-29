import React, { useState, useEffect, useReducer, useCallback } from "react";
import Prism from "prismjs";
import "./../Styles/prism.css";
import { loadUser } from "../../actions/authActions";
import { connect, useDispatch, useSelector } from "react-redux";
import "./../Styles/Documentation.css";
import { genkey } from "../../actions/virtualchefActions";
import axios from "axios";

const Documentation = (props) => {
  const auth = useSelector((state) => state.auth);
  const tokenRecognized = useSelector((state) => state.auth.token);
  const [userID, setUserID] = useState();
  const [keyFound, setKeyFound] = useState(false);
  const [apiKey, setApiKey] = useState();
  const dispatch = useDispatch();

  const createNewKey = () => {
    props.genkey(userID);
    console.log("create new key function finished");
    // setApiKey(auth.user.apikey.access_token);
    window.location.reload(true);
  };

  useEffect(() => {
    dispatch(loadUser(tokenRecognized));
  }, [dispatch, tokenRecognized]);
  useEffect(() => {
    console.log(auth.isAuthenicated);
    if (auth.user) {
      setUserID(auth.user._id);
      console.log();
      if ((JSON.stringify(auth.user) + "").includes("apikey")) {
        console.log(auth.user.apikey.access_token);
        setApiKey(auth.user.apikey.access_token);
        setKeyFound(true);
      } else {
        console.log("null");
        setKeyFound(false);
      }
    }
  }, [auth.isAuthenicated, auth.length, auth.user]);

  const fetchExample = `fetch(https://floating-plains-35923.herokuapp.com/prediction/:id", {
    headers: {
      Authorization: "Bearer key",
    },
  })
    .then((res) => res.json())
    .then(function (data) {
      console.log(data); //expecting array
      res.status(200).send({ data });
    });`;
  return (
    <div className="documentation-page">
      {/* if auth.user has apikey, then show your api key, else, show the button */}
      <h2>API Documentation</h2>
      <p>
        Welcome to <strong>Virtual Chef API intergration guide!</strong>
      </p>
      <p>
        Virtual Chef provides helpful tools for developers. Explore our neural
        network that we use to make your food prediction.
      </p>

      {keyFound ? (
        //shows the key
        <>
          <h3>This is your API key: </h3>
          <div className="show-api-key">
            <p>{apiKey}</p>
          </div>
        </>
      ) : (
        //shows the button
        <div className="get-api-key">
          <button type="button" className="button" onClick={createNewKey}>
            Get API Key
          </button>
          <p>
            Virtual Chef uses API keys to authenticate requests, please request
            one if you don't have one.
          </p>
        </div>
      )}
      <br />
      <p>
        Your API keys carry many privileges, so be sure to keep them secure! Do
        not share your secret API keys in publicly accessible areas such as
        GitHub, client-side code, and so forth.
      </p>

      <p>
        Base URL for prediction:{" "}
        <span className="api-url">
          https://floating-plains-35923.herokuapp.com/prediction
        </span>
      </p>
      <div className="fetch-example">
        <pre>
          <code className="language-javascript">{fetchExample}</code>
        </pre>
      </div>

      <p>
        <span className="api-url">":id"</span> should be the food you are
        searching.
      </p>

      <p>
        Finally, the reponse will be ten foods or ingredients with the accuracy
        percentage from the neural network.
      </p>
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
