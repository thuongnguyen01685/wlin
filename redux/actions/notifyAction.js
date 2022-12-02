import callApi from "../../utils/callApi";
import Notifications from "../../utils/NotifyApi";

export const NOTIFY = {
  GETNOTIFY: "GETNOTIFY",
};

export const getNotify = (token) => async (dispatch) => {
  try {
    const res = await Notifications(`&access_token=${token}&limit=100`);

    dispatch({ type: NOTIFY.GETNOTIFY, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};

export const changeIsReadAction = (token, _id) => async (dispatch) => {
  try {
    await callApi(`api/notification/${_id}?access_token=${token}`, "PUT", {
      read: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteNotify = (token, _id) => async (dispatch) => {
  try {
    await callApi(`api/notification/${_id}?access_token=${token}`, "DELETE");
  } catch (error) {
    console.log(error);
  }
};
