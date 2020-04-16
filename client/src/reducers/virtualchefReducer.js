import { CREATEKEY, PREDICT } from "../actions/types";

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
    case PREDICT:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
}
