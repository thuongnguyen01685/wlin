import { EVENTS } from "../actions/eventsAction";

const initialState = {
  getEvents: [],
  detailEvent: [],
  socketCheckin: [],
  eventChart: [],
  eventRecommend: [],
  eventPartner: [],
};

const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case EVENTS.GETEVENTS:
      return {
        ...state,
        getEvents: action.payload,
      };
    case EVENTS.PARTNER_EVENT:
      return {
        ...state,
        eventPartner: action.payload,
      };
    case EVENTS.RECOMMEND_EVENT:
      return {
        ...state,
        eventRecommend: action.payload,
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
    case EVENTS.EVENTCHART:
      return {
        ...state,
        eventChart: action.payload,
      };
    default:
      return state;
  }
};

export default eventReducer;
