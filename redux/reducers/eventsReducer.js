import { EVENTS } from "../actions/eventsAction";

const initialState = {
  getEvents: [],
  detailEvent: [],
  news: [],
};

const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case EVENTS.GETEVENTS:
      return {
        ...state,
        getEvents: action.payload,
      };
    case EVENTS.DETAILEVENTS:
      return {
        ...state,
        detailEvent: action.payload,
      };
    case EVENTS.NEWSEVENTS:
      return {
        ...state,
        news: action.payload,
      };
    default:
      return state;
  }
};

export default eventReducer;
