import callApis from "../../utils/callApis";
import { getdataApi, getDetailApi, newsEvent } from "../../utils/fetchApi";

export const EVENTS = {
  GETEVENTS: "GETEVENTS",
  DETAILEVENTS: "DETAILEVENTS",
  NEWSEVENTS: "NEWSEVENTS",
};

export const getEventsAction =
  (auth, array, permission) => async (dispatch) => {
    try {
      //admin || partner
      if (
        permission === "631c254a7a3a837ce2c22995" ||
        permission === "631c254a7a3a837ce2c229a7"
      ) {
        const res = await callApis(
          `dmsukien?access_token=${auth.token}&q={"club":{"$in":[${array}]}}`
        );
        dispatch({ type: EVENTS.GETEVENTS, payload: res.data });
      }
      //dmsukien?access_token=a32ace19895e836dc9c11ef730a86dac&limit=200&q={"ds_tham_gia":{"$elemMatch":{"ma_kh":"0338634204"}}}
      if (permission === "631c254a7a3a837ce2c229ac") {
        const res = await callApis(
          `dmsukien?access_token=${auth.token}&limit=200&q={"ds_tham_gia":{"$elemMatch":{"ma_kh":"${auth.profile.email}"}}}`
        );
        dispatch({ type: EVENTS.GETEVENTS, payload: res.data });
      }
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
