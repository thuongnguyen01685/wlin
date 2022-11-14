import { Admin, Member, Partner } from "../../utils/AccessPermission";
import callApis from "../../utils/callApis";

export const EVENTS = {
  GETEVENTS: "GETEVENTS",
  DETAILEVENTS: "DETAILEVENTS",
  NEWSEVENTS: "NEWSEVENTS",
  SOCKETCHECKIN: "SOCKETCHECKIN",
};

export const getEventsAction =
  (auth, array, permission) => async (dispatch) => {
    try {
      //admin || partner
      if (permission === Admin || permission === Partner) {
        const res = await callApis(
          `dmsukien?access_token=flex.public.token&q={"club":{"$in":[${array}]}}`
        );
        dispatch({ type: EVENTS.GETEVENTS, payload: res.data });
      }
      //dmsukien?access_token=a32ace19895e836dc9c11ef730a86dac&limit=200&q={"ds_tham_gia":{"$elemMatch":{"ma_kh":"0338634204"}}}
      if (permission === Member) {
        const res = await callApis(
          `dmsukien?access_token=flex.public.token&limit=200&q={"ds_tham_gia":{"$elemMatch":{"ma_kh":"${auth.profile.email}"}}}`
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
      const res = await callApis(
        `sukienappwlin?access_token=flex.public.token&ma_kh=${ma_kh}&ma_su_kien=${eventParticipant.ma_su_kien}&loai_su_kien=1`
      );
      // dispatch({ type: EVENTS.SOCKETCHECKIN, payload: res.data });
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

export const checkPayFeeAction =
  (eventParticipant, token, ma_kh, PTPAY) => async (dispatch) => {
    try {
      if (PTPAY === "tienmat") {
        const res = await callApis(
          `sukienappwlin?access_token=flex.public.token&ma_kh=${ma_kh}&ma_su_kien=${eventParticipant.ma_su_kien}&loai_su_kien=2&pt_thanh_toan=TM`
        );
        return res.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

export const checkPayImage =
  (eventParticipant, token, ma_kh, temp) => async (dispatch) => {
    try {
      const res = await callApis(
        `sukienappwlin?access_token=${token}`,
        "POST",
        {
          ma_kh,
          ma_su_kien: eventParticipant.ma_su_kien,
          loai_su_kien: 2,
          hinh_anh: JSON.parse(temp).image,
          pt_thanh_toan: "CK",
        }
      );
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };
