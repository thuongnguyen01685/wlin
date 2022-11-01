import callApis from "../../utils/callApis";
import { GLOBAL } from "./GlobalAsign";

export const BENEFIT = {
  GETBENEFIT: "GETBENEFIT",
};

export const getBenefitAction = (token, email) => async (dispatch) => {
  try {
    dispatch({ type: GLOBAL.LOADING, payload: true });

    const res = await callApis(
      `fos_dsquyenloi?access_token=${token}&email=${email}`
    );

    dispatch({
      type: BENEFIT.GETBENEFIT,
      payload: res.data.filter(
        (item) => item.loai_xac_nhan !== 0 && item.loai_xac_nhan !== 1
      ),
    });
  } catch (error) {
    console.log(error);
  }
};
