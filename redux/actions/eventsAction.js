import { getdataApi } from "../../utils/fetchApi";

export const EVENTS = {
  GETEVENTS: "GETEVENTS",
};

export const getEventsAction = (token) => async (dispatch) => {
  try {
    const res = await getdataApi(`dmsukien`, token);

    dispatch({ type: EVENTS.GETEVENTS, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};
