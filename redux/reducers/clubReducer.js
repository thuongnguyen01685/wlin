import { CLUB } from "../actions/ClupAction";

const initialState = {
  getClubs: [],
  detailClub: {},
  getBenefit: [],
};

const clubReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLUB.GETCLUB:
      return {
        ...state,
        getClubs: action.payload,
      };
    case CLUB.DETAILCLUB:
      return {
        ...state,
        detailClub: action.payload,
      };
    case CLUB.GETBENEFIT:
      return {
        ...state,
        getBenefit: action.payload,
      };
    default:
      return state;
  }
};

export default clubReducer;
