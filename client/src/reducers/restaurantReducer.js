import {
  GET_RESTAURANTS,
  ADD_RESTAURANT,
  DELETE_RESTAURANT,
  RESTAURANTS_LOADING,
} from "../actions/types";
const initialState = {
  restaurants: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_RESTAURANTS:
      return {
        ...state,
        restaurants: action.payload,
        loading: false,
      };
    case DELETE_RESTAURANT:
      return {
        ...state,
        restaurants: state.restaurants.filter(
          (restaurants) => restaurants._id !== action.payload
        ),
      };
    case ADD_RESTAURANT:
      return {
        ...state,
        restaurants: [action.payload, ...state.restaurants],
      };
    case RESTAURANTS_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
