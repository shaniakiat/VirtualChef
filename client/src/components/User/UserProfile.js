import React, { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../actions/authActions";
import axios from "axios";

const UserProfile = props => {
  const [state, setState] = useState("");
  const firstRender = useRef();
  const temp = useSelector(state => state.auth.isAuthenticated);
  const name = useSelector(state => state.auth.user.name);

  useEffect(() => {
    console.log(name);
  }, []);

  return (
    <main>
      <div>{name}</div>
    </main>
  );
};

export default UserProfile;
