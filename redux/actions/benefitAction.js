import callApis from "../../utils/callApis";
import { GLOBAL } from "./GlobalAsign";

export const BENEFIT = {
  GETBENEFIT: "GETBENEFIT",
};

export const getBenefitAction = (token, email) => async (dispatch) => {
  try {
    dispatch({ type: GLOBAL.LOADING, payload: true });

    if (token) {
      const res = await callApis(
        `fos_dsquyenloi?access_token=${token}&email=${email}`
      );

      dispatch({
        type: BENEFIT.GETBENEFIT,
        payload: res.data.filter(
          (item) => item.loai_xac_nhan !== 0 && item.loai_xac_nhan !== 1
        ),
      });
    } else {
      const res = await callApis(
        `fos_dsquyenloi?access_token=eae2c667c36ff5581001d174a3cd7dd8&email=0338634204`
      );

      console.log(res.data, "1");

      dispatch({
        type: BENEFIT.GETBENEFIT,
        payload: res.data.filter(
          (item) => item.loai_xac_nhan !== 0 && item.loai_xac_nhan !== 1
        ),
      });
    }
  } catch (error) {
    console.log(error);
  }
};
