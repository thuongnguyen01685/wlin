import { BENEFIT } from "../actions/benefitAction";
import { GLOBAL } from "../actions/GlobalAsign";

const initialState = {
  getPayBenefit: [],
  loading: false,
  benefitMana: [],
  benefitMember: [],
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
    case BENEFIT.BENEFITMANAGEMENT: {
      return {
        ...state,
        benefitMana: action.payload,
        loading: false,
      };
    }
    case BENEFIT.GETBENEFITOFMEMBER: {
      return {
        ...state,
        benefitMember: action.payload,
        loading: false,
      };
    }

    default:
      return state;
  }
};

export default benefitReducer;
