import { Admin, Member, Partner } from "../../utils/AccessPermission";
import callApis from "../../utils/callApis";

export const EVENTS = {
  GETEVENTS: "GETEVENTS",
  DETAILEVENTS: "DETAILEVENTS",
  NEWSEVENTS: "NEWSEVENTS",
};

export const getEventsAction =
  (auth, array, permission) => async (dispatch) => {
    try {
      //admin || partner
      if (permission === Admin || permission === Partner) {
        const res = await callApis(
          `dmsukien?access_token=${auth.token}&q={"club":{"$in":[${array}]}}`
        );
        dispatch({ type: EVENTS.GETEVENTS, payload: res.data });
      }
      //dmsukien?access_token=a32ace19895e836dc9c11ef730a86dac&limit=200&q={"ds_tham_gia":{"$elemMatch":{"ma_kh":"0338634204"}}}
      if (permission === Member) {
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
    const res = await callApis(`dmsukien/${_id}?access_token=${token}`);

    dispatch({ type: EVENTS.DETAILEVENTS, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};

export const checkEventAction =
  (eventParticipant, token, ma_kh) => async (dispatch) => {
    try {
      const item = eventParticipant.ds_tham_gia.filter(
        (item) => item.ma_kh === ma_kh
      );

      const eventPut = eventParticipant.ds_tham_gia.filter(
        (item) => item.ma_kh !== ma_kh
      );

      const ds_tham_gia = [{ ...item[0], trang_thai_checkin: 1 }, ...eventPut];

      delete eventParticipant.attends;

      const res = await callApis(
        `dmsukien/${eventParticipant._id}?access_token=${token}`,
        "PUT",
        { ...eventParticipant, ds_tham_gia }
      );

      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

export const checkPayFeeAction =
  (eventParticipant, token, ma_kh, PTPAY) => async (dispatch) => {
    try {
      const item = eventParticipant.ds_tham_gia.filter(
        (item) => item.ma_kh === ma_kh
      );

      const eventPut = eventParticipant.ds_tham_gia.filter(
        (item) => item.ma_kh !== ma_kh
      );

      delete eventParticipant.attends;

      if (PTPAY === "tienmat") {
        const ds_tham_gia = [{ ...item[0], trang_thai_tt: 1 }, ...eventPut];
        const res = await callApis(
          `dmsukien/${eventParticipant._id}?access_token=${token}`,
          "PUT",
          { ...eventParticipant, ds_tham_gia }
        );
        return res.data;
      } else {
        // const ds_tham_gia = [{ ...item[0], trang_thai_tt: 1 }, ...eventPut];
        // const res = await callApis(
        //   `dmsukien/${eventParticipant._id}?access_token=${token}`,
        //   "PUT",
        //   { ...eventParticipant, ds_tham_gia }
        // );
      }
    } catch (error) {
      console.log(error);
    }
  };

export const checkPayImage =
  (eventParticipant, token, ma_kh, temp) => async (dispatch) => {
    try {
      const item = eventParticipant.ds_tham_gia.filter(
        (item) => item.ma_kh === ma_kh
      );

      const eventPut = eventParticipant.ds_tham_gia.filter(
        (item) => item.ma_kh !== ma_kh
      );

      delete eventParticipant.attends;

      const ds_tham_gia = [
        { ...item[0], trang_thai_tt: 1, picture_tt: JSON.parse(temp).image },
        ...eventPut,
      ];
      const res = await callApis(
        `dmsukien/${eventParticipant._id}?access_token=${token}`,
        "PUT",
        { ...eventParticipant, ds_tham_gia }
      );
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };
