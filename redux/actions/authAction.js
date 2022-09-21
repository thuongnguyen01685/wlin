import { getData } from "../../utils/fetchApi";

export const AUTH = {
  OTP: "OTP",
  SHOWPROFILE: "SHOWPROFILE",
};

export const getOTP = (number) => async (dispatch) => {
  try {
    const res = await getData(`send-otp`, number);

    dispatch({ type: AUTH.OTP, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};
