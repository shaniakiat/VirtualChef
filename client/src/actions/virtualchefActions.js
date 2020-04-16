import axios from "axios";
import { CREATEKEY, PREDICT } from "./types";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";
import { create } from "d3";
import { JsonWebTokenError } from "jsonwebtoken";

export const genkey = (id) => (dispatch, getState) => {
  axios
    .get(`/api/virtualchef/create-key/${id}`, id, tokenConfig(getState))
    .then((res) => {
      res.json();
      dispatch({
        type: CREATEKEY,
        payload: res,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};
