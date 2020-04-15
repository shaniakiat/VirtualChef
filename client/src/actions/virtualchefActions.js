import axios from "axios";
import { CREATEKEY, PREDICT } from "./types";
import { returnErrors } from "./errorActions";

export const genkey = (id) => (dispatch) => {
  //https://redux.js.org/advanced/async-actions
  axios
    .post(`/api/virtualchef/create-key/${id}`)
    .then((res) => {
      dispatch({
        type: CREATEKEY,
        id,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};
