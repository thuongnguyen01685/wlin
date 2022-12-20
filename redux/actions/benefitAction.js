import callApis from "../../utils/callApis";
import { GLOBAL } from "./GlobalAsign";

export const BENEFIT = {
  GETBENEFIT: "GETBENEFIT",
  BENEFITMANAGEMENT: "BENEFITMANAGEMENT",
  GETBENEFITOFMEMBER: "GETBENEFITOFMEMBER",
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

export const getBenefitManagemant =
  (token, arrMember, page, search) => async (dispatch) => {
    try {
      if (arrMember?.length > 0) {
        let condition = {
          $and: [
            { ma_kh: { $in: arrMember } },
            { trang_thai: { $nin: ["1", "2"] } },
            { ten_quyen_loi: { $regex: search, $options: "i" } },
          ],
        };

        condition = JSON.stringify(condition);

        const res = await callApis(
          `dsquyenloi?access_token=${token}&q=${condition}&limit=10&page=${page}`
        );

        dispatch({ type: BENEFIT.BENEFITMANAGEMENT, payload: res.data });
        return res.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

export const getBenefitMember = (token, ma_kh) => async (dispatch) => {
  try {
    const res = await callApis(
      `dsquyenloi?access_token=${token}&q={"ma_kh": "${ma_kh}"}&limit=500`
    );
    dispatch({ type: BENEFIT.GETBENEFITOFMEMBER, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};
