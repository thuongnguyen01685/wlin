import { getdataApi, getDetailApi, newsEvent } from "../../utils/fetchApi";

export const EVENTS = {
  GETEVENTS: "GETEVENTS",
  DETAILEVENTS: "DETAILEVENTS",
  NEWSEVENTS: "NEWSEVENTS",
};

export const getEventsAction = (token) => async (dispatch) => {
  try {
    const res = await getdataApi(`dmsukien`, token);

    dispatch({ type: EVENTS.GETEVENTS, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};

export const getDetailEventsAction = (_id, token) => async (dispatch) => {
  try {
    const res = await getDetailApi(`dmsukien`, _id, token);

    dispatch({ type: EVENTS.DETAILEVENTS, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};

export const newsEventsAction = () => async (dispatch) => {
  try {
    const res = await newsEvent(`news`);

    dispatch({ type: EVENTS.NEWSEVENTS, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};
