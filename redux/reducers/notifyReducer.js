import { NOTIFY } from "../actions/notifyAction";

const initialState = {
  getNotify: [],
};

const notifyReducer = (state = initialState, action) => {
  switch (action.type) {
    case NOTIFY.GETNOTIFY:
      return {
        getNotify: action.payload,
      };
    default:
      return state;
  }
};

export default notifyReducer;
