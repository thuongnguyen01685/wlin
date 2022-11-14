import { EVENTS } from "../actions/eventsAction";

const initialState = {
  getEvents: [],
  detailEvent: [],
  socketCheckin: [],
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
    case EVENTS.SOCKETCHECKIN:
      return {
        ...state,
        socketCheckin: action.payload,
      };
    default:
      return state;
  }
};

export default eventReducer;
