import { getData, getProfile, getToken } from "../../utils/fetchApi";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AUTH = {
  OTP: "OTP",
  TOKEN: "TOKEN",
  PROFILE: "PROFILE",
  ERROR: "ERROR",
};

export const getOTP = (number) => async (dispatch) => {
  try {
    const res = await getData(`send-otp`, number);

    dispatch({ type: AUTH.OTP, payload: res.data });
    return res.data;
  } catch (error) {
    // dispatch({ type: AUTH.ERROR, payload: error.response.data.error });
    // console.log(error.response.data.error);
    //console.log(error);
    return;
  }
};

export const getTokenAction = (id_otp, code_opt) => async (dispatch) => {
  try {
    const res = await getToken(id_otp, code_opt);

    if (res.data) {
      const jsonToken = res.data.token;
      await AsyncStorage.setItem("@token_key", jsonToken);
      dispatch({ type: AUTH.TOKEN, payload: jsonToken });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getProfileAction = (token) => async (dispatch) => {
  try {
    const res = await getProfile(`profile`, token);

    dispatch({ type: AUTH.PROFILE, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};
