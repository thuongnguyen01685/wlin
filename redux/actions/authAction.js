import { URL } from "../../utils/fetchApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import callApis from "../../utils/callApis";
import callApi from "../../utils/callApi";
import { id_app, Member } from "../../utils/AccessPermission";

export const AUTH = {
  OTP: "OTP",
  TOKEN: "TOKEN",
  PROFILE: "PROFILE",
  PERSSION: "PERSSION",
  CUSTOMER_WLIN: "CUSTOMER_WLIN",
  RANK: "RANK",
  ERROR: "ERROR",
  GOI: "GOI",
  MA_KHQR: "MA_KHQR",
};

export const getOTP = (number) => async (dispatch) => {
  try {
    if (!number.startsWith("0")) number = "0" + number;
    const res = await callApi(`send-otp/${number}`);

    dispatch({ type: AUTH.OTP, payload: res.data });
    return res.data;
  } catch (error) {
    // dispatch({ type: AUTH.ERROR, payload: error.response.data.error });
    // console.log(error.response.data.error);
    console.log(error);
    return;
  }
};

export const getTokenAction = (id_otp, code_opt) => async (dispatch) => {
  try {
    const res = await callApi(
      `verify-otp/${id_otp}/${code_opt}?group_id=${Member}&id_app=${id_app}`
    );

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
    const res = await callApi(`api/profile?access_token=${token}`);

    //getRankAction(token, res.data.email);
    dispatch({ type: AUTH.PROFILE, payload: res.data });
    return res.data.email;
  } catch (error) {
    console.log(error);
  }
};

export const getPermissionAction = (token, email) => async (dispatch) => {
  try {
    const res = await callApis(`wlin_participant?access_token=${token}`);

    dispatch({ type: AUTH.PERSSION, payload: res?.data });

    return res?.data?.group_id;
  } catch (error) {
    console.log(error);
  }
};

export const getCustomerWlinAction = (token, phone) => async (dispatch) => {
  try {
    const q = {
      $and: [{ of_user: phone }],
    };

    const res = await callApis(
      `customer_wlin?access_token=${token}&limit=500&q=${JSON.stringify(q)}`
    );

    dispatch({
      type: AUTH.CUSTOMER_WLIN,
      payload: res.data,
    });
    return res.data[0];
  } catch (error) {
    console.log(error);
  }
};

export const getRankAction = (token, email) => async (dispatch) => {
  try {
    const res = await callApis(
      `customer?access_token=${token}&q={"of_user":"${email}"}`
    );
    // console.log(res, "datares");

    let dataFilter = [];
    if (res?.data && res?.data.length > 0) {
      dataFilter = await callApis(
        `dmgoithanhvien?access_token=${token}&q=${JSON.stringify({
          ma_goi: res?.data[0].goi_thanh_vien,
        })}`
      );

      dispatch({
        type: AUTH.RANK,
        payload: { ...dataFilter?.data, ...res?.data[0] },
      });
    }

    return res.data[0]?.goi_thanh_vien;
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
          `${URL}/api/uploadfile?json=1&folder=files&access_token=${token}`
        );
        request.setRequestHeader("Content-Type", "multipart/form-data");
        request.send(body);
      });
      return p;
    } catch (err) {
      console.log(err);
    }
  };
  return add;
};
