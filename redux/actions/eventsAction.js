import { getdataApi } from "../../utils/fetchApi";

export const EVENTS = {
  GETEVENTS: "GETEVENTS",
};

export const getEventsAction = () => async (dispatch) => {
  try {
    const res = await getdataApi(`dmsukien`);

    dispatch({ type: EVENTS.GETEVENTS, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};
