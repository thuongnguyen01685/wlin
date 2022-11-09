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
