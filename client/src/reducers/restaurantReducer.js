import {
  GET_ITEMS,
  ADD_ITEM,
  DELETE_ITEM,
  ITEMS_LOADING,
} from "../actions/types";
const initialState = {
  restaurants: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ITEMS:
      return {
        ...state,
        restaurants: action.payload,
        loading: false,
      };
    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter(
          (restaurants) => restaurants._id !== action.payload
        ),
      };
    case ADD_ITEM:
      return {
        ...state,
        items: [action.payload, ...state.restaurants],
      };
    case ITEMS_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
