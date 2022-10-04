import { deleteNotifications, Notifications } from "../../utils/fetchApi";

export const NOTIFY = {
  GETNOTIFY: "GETNOTIFY",
};

export const getNotify = (token) => async (dispatch) => {
  try {
    const res = await Notifications(token);

    dispatch({ type: NOTIFY.GETNOTIFY, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteNotify = (id, token) => async (dispatch) => {
  try {
    await deleteNotifications(`notification`, id, token);
  } catch (error) {
    console.log(error);
  }
};
