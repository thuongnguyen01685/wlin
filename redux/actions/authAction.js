import {
  getData,
  getPermission,
  getProfile,
  getToken,
  URL,
} from "../../utils/fetchApi";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AUTH = {
  OTP: "OTP",
  TOKEN: "TOKEN",
  PROFILE: "PROFILE",
  PERSSION: "PERSSION",
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
      return res.data;
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

export const getPermissionAction = (token, email) => async (dispatch) => {
  try {
    const res = await getPermission(`participant`, token, email);

    dispatch({ type: AUTH.PERSSION, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};

export const getImageUserAction = (image, token) => {
  const add = async () => {
    try {
      let filename = image.split("/").pop();
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;

      let file = {
        uri: image,
        name: filename,
        type,
      };
      let p = new Promise((resolve, reject) => {
        let body = new FormData();
        body.append("file", file);

        let request = new XMLHttpRequest();
        request.onreadystatechange = (e) => {
          if (request.readyState !== 4) {
            return;
          }
          if (request.status === 200) {
            resolve(request.responseText);
          } else {
            console.log("error", request.responseText);
            let error = request.responseText;
            if (!error || error.indexOf("flexbiz") >= 0)
              error = "Can't connect to server";
            reject(error);
          }
        };

        request.open(
          "POST",
          `${URL}/api/uploadfile?json=1&access_token=${token}&folder=avatars`
        );
        request.setRequestHeader("Content-Type", "multipart/form-data");
        request.send(body);
      });
      return p;
    } catch (err) {
      // console.log(err);
    }
  };
  return add;
};
