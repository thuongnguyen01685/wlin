import { AUTH } from "../actions/authAction";

const initialState = {
  token: null,
  err: "",
  profile: [],
  permission: [],
  rank: [],
  alert: "",
  message: "",
  isModalRe: false,
  alertPass: "",
  banner: [],
  dmnv: [],
  otp: [],
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH.OTP:
      return {
        ...state,
        otp: action.payload,
      };
    case AUTH.ERROR:
      return {
        ...state,
        err: action.payload,
      };
    case AUTH.TOKEN:
      return { ...state, token: action.payload };
    case AUTH.PROFILE:
      return { ...state, profile: action.payload };
    case AUTH.PERSSION:
      return { ...state, permission: action.payload[0] };
    case AUTH.RANK:
      return { ...state, rank: action.payload };
    default:
      return state;
  }
};
export default authReducer;
