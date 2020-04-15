import axios from "axios";
import { CREATEKEY, PREDICT } from "./types";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";
import { create } from "d3";

export const genkey = (id) => (dispatch, getState) => {
  axios
    .post(`/api/virtualchef/create-key/${id}`, id, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: CREATEKEY,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};
