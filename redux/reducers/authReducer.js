import { AUTH } from "../actions/authAction";

const initialState = {
  token: null,
  err: "Error",
  profile: [],
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
    default:
      return state;
  }
};
export default authReducer;
