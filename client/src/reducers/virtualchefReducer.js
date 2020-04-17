import { CREATEKEY } from "../actions/types";

const initialState = {
  keys: [],
  loading: false,
};
export default function (state = initialState, action) {
  switch (action.type) {
    case CREATEKEY:
      return {
        ...state,
        keys: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
