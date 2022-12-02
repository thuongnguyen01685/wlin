import callApis from "../../utils/callApis";
import { GLOBAL } from "./GlobalAsign";

export const BENEFIT = {
  GETBENEFIT: "GETBENEFIT",
  BENEFITMANAGEMENT: "BENEFITMANAGEMENT",
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

export const getBenefitManagemant = (token, arrMember) => async (dispatch) => {
  try {
    let condition = {
      $and: [
        { ma_kh: { $in: arrMember } },
        { trang_thai: { $nin: ["1", "2"] } },
      ],
    };
    condition = JSON.stringify(condition);
    const res = await callApis(
      `dsquyenloi?access_token=${token}&q=${condition}&limit=1000`
    );
    dispatch({ type: BENEFIT.BENEFITMANAGEMENT, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};
