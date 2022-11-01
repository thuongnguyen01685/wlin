import { BENEFIT } from "../actions/benefitAction";
import { GLOBAL } from "../actions/GlobalAsign";

const initialState = {
  getPayBenefit: [],
  loading: false,
};

const benefitReducer = (state = initialState, action) => {
  switch (action.type) {
    case GLOBAL.LOADING: {
      return {
        ...state,
        loading: action.payload,
      };
    }
    case BENEFIT.GETBENEFIT: {
      return {
        ...state,
        getPayBenefit: action.payload,
        loading: false,
      };
    }

    default:
      return state;
  }
};

export default benefitReducer;
