import axios from "axios";
export const URL = "https://api.wlin.com.vn";

export const getData = async (url, number) => {
  const res = await axios.get(`${URL}/${url}/${number}`);

  return res;
};
//https://api.wlin.com.vn/api/62e0b3885271e2560e8bb7d3/dmsukien?access_token=c53e1ec285d77e1aad2d5861856ab94a
//wlin_clup
//dmnhomquyenloi
//https://api.wlin.com.vn/api/62e0b3885271e2560e8bb7d3/wlin_hoi_vien?access_token=a44f9c6d83ebd53def4fb1c7b99c148a
//https://api.wlin.com.vn/api/62e0b3885271e2560e8bb7d3/news?access_token=a44f9c6d83ebd53def4fb1c7b99c148a
export const getdataApi = async (url) => {
  const res = await axios.get(
    `${URL}/api/62e0b3885271e2560e8bb7d3/${url}?access_token=c53e1ec285d77e1aad2d5861856ab94a&limit=50`
  );
  return res;
};
//get token
//https://api.wlin.com.vn/verify-otp/633253d268b1025d86dc2cbb/784191?group_id=631c254a7a3a837ce2c229b1&id_app=62e0b3885271e2560e8bb7d3
export const getToken = async (id_otp, code_opt) => {
  const res = await axios.get(
    `${URL}/verify-otp/${id_otp}/${code_opt}?group_id=631c254a7a3a837ce2c229b1&id_app=62e0b3885271e2560e8bb7d3`
  );
  return res;
};

//detail
export const getDetailApi = async (url, _id) => {
  const res = await axios.get(
    `${URL}/api/62e0b3885271e2560e8bb7d3/${url}/${_id}?access_token=c53e1ec285d77e1aad2d5861856ab94a`
  );
  return res;
};

//https://api.wlin.com.vn/api/profile?access_token=a44f9c6d83ebd53def4fb1c7b99c148a
export const getProfile = async (url, token) => {
  const res = await axios.get(`${URL}/api/${url}?access_token=${token}`);
  return res;
};
