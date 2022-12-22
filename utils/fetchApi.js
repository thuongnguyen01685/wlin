import axios from "axios";
import { Admin, id_app, Member, Partner } from "./AccessPermission";
export const URL = "https://api.wlin.com.vn";

//wlin_clup
export const getdataApiClub = async (url, auth, page, permission) => {
  if (permission !== Admin && permission !== Partner && permission !== Member) {
    const res = [];
    return res;
  } else {
    //QTV
    if (permission === Admin) {
      const res = await axios.get(
        `${URL}/api/${id_app}/${url}?access_token=${auth.token}&limit=500&q={"thu_ky": "${auth.profile.email}"}`
      );

      return res;
    }

    //partner
    if (permission === Partner) {
      const res = await axios.get(
        `${URL}/api/${id_app}/${url}?access_token=${auth.token}&limit=500&q={"partner": "${auth.profile.email}"}`
      );
      return res;
    }

    //Hoi viens
    if (permission === Member) {
      const res = await axios.get(
        `${URL}/api/${id_app}/${url}?access_token=${auth.token}&limit=500&q={"ds_thanh_vien":{"$elemMatch":{"ma_kh":"${auth.profile.email}"}}}`
      );
      return res;
    }
  }
};

export const getClubPartnerParticipant = async (
  url,
  auth,
  page,
  permission
) => {
  //partner
  if (permission === Partner) {
    const res = await axios.get(
      `${URL}/api/${id_app}/${url}?access_token=${auth.token}&limit=500&q={"ds_thanh_vien":{"$elemMatch":{"ma_kh":"${auth.profile.email}"}}}`
    );
    return res;
  }
};
