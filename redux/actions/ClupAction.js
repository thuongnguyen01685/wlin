import callApis from "../../utils/callApis";
import { getdataApiClub } from "../../utils/fetchApi";

export const CLUB = {
  GETCLUB: "GETCLUB",
  DETAILCLUB: "DETAILCLUB",
  GETBENEFIT: "GETBENEFIT",
  GETMEMBER: "GETMEMBER",
  DETAILMEMBER: "DETAILMEMBER",
  DETAILBENEFIT: "DETAILBENEFIT",
  DMCHUCVU: "DMCHUCVU",
};

export const getCLub = (auth, page, permission) => async (dispatch) => {
  try {
    const res = await getdataApiClub(`wlin_club`, auth, page, permission);

    if (res.data) {
      dispatch({ type: CLUB.GETCLUB, payload: res.data });
      return res.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getDetailClub = (_id, token) => async (dispatch) => {
  try {
    const res = await callApis(`wlin_club/${_id}?access_token=${token}`);

    dispatch({ type: CLUB.DETAILCLUB, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};

export const getListBenefit = (token) => async (dispatch) => {
  try {
    const res = await callApis(
      `dmnhomquyenloi?access_token=${token}&limit=500`
    );
    dispatch({ type: CLUB.GETBENEFIT, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};

export const getDetailBenefit = (_id, token) => async (dispatch) => {
  try {
    const res = await callApis(`dmnhomquyenloi/${_id}?access_token=${token}`);

    dispatch({ type: CLUB.DETAILBENEFIT, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};

export const getMemberAction =
  (token, array, page, search) => async (dispatch) => {
    try {
      let condition = {
        $and: [
          { ma_kh: { $in: array } },
          { ten_kh: { $regex: search, $options: "i" } },
        ],
      };
      if (array.length > 0) {
        const res = await callApis(
          `customer_wlin?access_token=${token}&q=${condition}&limit=10&page=${page}`
        );

        dispatch({ type: CLUB.GETMEMBER, payload: res.data });
        return res.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

export const getDetailMember = (ma_kh, token) => async (dispatch) => {
  try {
    const res = await callApis(
      `customer_wlin?access_token=${token}&q={"ma_kh":"${ma_kh}"}`
    );
    // console.log(res.data);
    dispatch({ type: CLUB.DETAILMEMBER, payload: res.data[0] });
  } catch (error) {
    console.log(error);
  }
};

export const deleteBQTAction = (token, arr, id_club) => async (dispatch) => {
  try {
    const res = await callApis(
      `wlin_club/${id_club}?access_token=${token}`,
      "PUT",
      {
        quan_tri: arr,
      }
    );
  } catch (error) {
    console.log(error);
  }
};
export const getDmchucvu = (token) => async (dispatch) => {
  try {
    const res = await callApis(`dmchucvu?access_token=${token}`);
    dispatch({ type: CLUB.DMCHUCVU, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};
