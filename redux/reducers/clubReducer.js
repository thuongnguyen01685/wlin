import { CLUB } from "../actions/ClupAction";

const initialState = {
  getClubs: [],
  detailClub: {},
  getBenefit: [],
  getMember: [],
  detailMember: {},
};

const clubReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLUB.GETCLUB:
      return {
        ...state,
        getClubs: [...state.getClubs, ...action.payload],
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
    case CLUB.GETMEMBER:
      return {
        ...state,
        getMember: action.payload,
      };
    case CLUB.DETAILMEMBER:
      return {
        ...state,
        detailMember: action.payload,
      };
    default:
      return state;
  }
};

export default clubReducer;
