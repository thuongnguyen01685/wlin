import { getdataApi, getdataApiClub, getDetailApi } from "../../utils/fetchApi";

export const CLUB = {
  GETCLUB: "GETCLUB",
  DETAILCLUB: "DETAILCLUB",
  GETBENEFIT: "GETBENEFIT",
  GETMEMBER: "GETMEMBER",
  DETAILMEMBER: "DETAILMEMBER",
  DETAILBENEFIT: "DETAILBENEFIT",
};

export const getCLub = (auth, page, permission) => async (dispatch) => {
  try {
    const res = await getdataApiClub(`wlin_club`, auth, page, permission);
    dispatch({ type: CLUB.GETCLUB, payload: res.data });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const getDetailClub = (_id, token) => async (dispatch) => {
  try {
    const res = await getDetailApi(`wlin_club`, _id, token);

    dispatch({ type: CLUB.DETAILCLUB, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};

export const getListBenefit = (token) => async (dispatch) => {
  try {
    const res = await getdataApi(`dmnhomquyenloi`, token);
    dispatch({ type: CLUB.GETBENEFIT, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};

export const getDetailBenefit = (_id, token) => async (dispatch) => {
  try {
    const res = await getDetailApi(`dmnhomquyenloi`, _id, token);

    dispatch({ type: CLUB.DETAILBENEFIT, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};

export const getMemberAction = (token) => async (dispatch) => {
  try {
    const res = await getdataApi(`wlin_hoi_vien`, token);
    dispatch({ type: CLUB.GETMEMBER, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};

export const getDetailMember = (id, token) => async (dispatch) => {
  try {
    const res = await getDetailApi(`wlin_hoi_vien`, id, token);

    dispatch({ type: CLUB.DETAILMEMBER, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};
