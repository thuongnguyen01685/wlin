import { combineReducers } from "redux";
import auth from "./authReducer";
import event from "./eventsReducer";
import club from "./clubReducer";
import notify from "./notifyReducer";
export default combineReducers({
  auth,
  event,
  club,
  notify,
});
