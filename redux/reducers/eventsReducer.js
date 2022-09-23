import { EVENTS } from "../actions/eventsAction";

const initialState = {
  getEvents: [],
};

const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case EVENTS.GETEVENTS:
      return {
        ...state,
        getEvents: action.payload,
      };
    default:
      return state;
  }
};

export default eventReducer;
