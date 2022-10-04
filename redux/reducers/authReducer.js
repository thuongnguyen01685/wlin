import { AUTH } from "../actions/authAction";

const initialState = {
  token: null,
  err: "",
  profile: [],
  permission: [],
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
    default:
      return state;
  }
};
export default authReducer;
