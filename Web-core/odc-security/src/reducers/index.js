import { combineReducers } from "redux";
import user from "./User";
import profile from "./Profile";
import menu from "./Menu";

export default combineReducers({
  user,
  profile,
  menu
});
