import { combineReducers } from "redux";
import itemReducer from "./itemReducer";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import restaurantReducer from "./restaurantReducer";
import virtualchef from "./virtualchefReducer";

export default combineReducers({
  item: itemReducer,
  error: errorReducer,
  auth: authReducer,
  restaurant: restaurantReducer,
  virtualchef: virtualchef,
});
