import { Admin, Member, Partner } from "../../utils/AccessPermission";
import callApis from "../../utils/callApis";
import Toast from "react-native-root-toast";

export const EVENTS = {
  GETEVENTS: "GETEVENTS",
  DETAILEVENTS: "DETAILEVENTS",
  NEWSEVENTS: "NEWSEVENTS",
  SOCKETCHECKIN: "SOCKETCHECKIN",
  EVENTCHART: "EVENTCHART",
};

export const getEventsAction =
  (auth, array, permission) => async (dispatch) => {
    try {
      //admin || partner
      let condition = {
        club: { $in: array },
      };
      condition = JSON.stringify(condition);
      if (permission === Admin || permission === Partner) {
        const res = await callApis(
          `dmsukien?access_token=${auth.token}&q=${condition}`
        );
        dispatch({ type: EVENTS.GETEVENTS, payload: res.data });
        return res.data;
      }
      //dmsukien?access_token=a32ace19895e836dc9c11ef730a86dac&limit=200&q={"ds_tham_gia":{"$elemMatch":{"ma_kh":"0338634204"}}}
      if (permission === Member) {
        const res = await callApis(
          `dmsukien?access_token=${auth.token}&limit=200&q={"ds_tham_gia":{"$elemMatch":{"ma_kh":"${auth.profile.email}"}}}`
        );
        dispatch({ type: EVENTS.GETEVENTS, payload: res.data });
        return res.data;
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
        `sukienappwlin?access_token=${token}&ma_kh=${ma_kh}&ma_su_kien=${eventParticipant.ma_su_kien}&loai_su_kien=1`
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
          `sukienappwlin?access_token=${token}&ma_kh=${ma_kh}&ma_su_kien=${eventParticipant.ma_su_kien}&loai_su_kien=2&pt_thanh_toan=TM`
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

export const ChangeStatusLoveAction =
  (_id, trang_thai, token, _idDelete) => async (dispatch) => {
    try {
      if (trang_thai) {
        const res = await callApis(
          `favourite/${_idDelete}?access_token=${token}`,
          "DELETE"
        );
        if (res.data) {
          Toast.show("Đã loại khỏi danh sách sự kiện yêu thích!", {
            duration: Toast.durations.LONG,
            position: Toast.positions.BOTTOM,
          });
        }
      } else {
        const res = await callApis(`favourite?access_token=${token}`, "POST", {
          id_favourite: _id,
          chung_tu: "dmsukien",
        });

        if (res.data) {
          Toast.show("Đã thêm vào danh sách sự kiện yêu thích! ", {
            duration: Toast.durations.LONG,
            position: Toast.positions.BOTTOM,
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

export const eventChartAction =
  (auth, fromTime, toTime) => async (dispatch) => {
    try {
      if (auth.permission.group_id === Admin) {
        const res = await callApis(
          `fos_chart?access_token=${auth.token}&email=${auth.profile.email}&tu_ngay=${fromTime}&den_ngay=${toTime}`
        );
        dispatch({ type: EVENTS.EVENTCHART, payload: res.data });
      }
      if (auth.permission.group_id === Partner) {
        const res = await callApis(
          `fos_chart?access_token=${auth.token}&partner=${auth.customer.ma_kh}&tu_ngay=${fromTime}&den_ngay=${toTime}`
        );

        dispatch({ type: EVENTS.EVENTCHART, payload: res.data });
      }
    } catch (error) {
      console.log(error);
    }
  };
