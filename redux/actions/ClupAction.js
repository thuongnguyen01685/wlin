import { getdataApi, getDetailApi } from "../../utils/fetchApi";

export const CLUB = {
  GETCLUB: "GETCLUB",
  DETAILCLUB: "DETAILCLUB",
  GETBENEFIT: "GETBENEFIT",
};

export const getCLub = () => async (dispatch) => {
  try {
    const res = await getdataApi(`wlin_club`);
    // console.log(res.data);
    dispatch({ type: CLUB.GETCLUB, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};
export const getDetailClub = (_id) => async (dispatch) => {
  try {
    const res = await getDetailApi(`wlin_club`, _id);

    dispatch({ type: CLUB.DETAILCLUB, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};

export const getListBenefit = () => async (dispatch) => {
  try {
    const res = await getdataApi(`dmnhomquyenloi`);
    dispatch({ type: CLUB.GETBENEFIT, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};
