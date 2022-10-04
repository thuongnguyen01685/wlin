import axios from "axios";
export const URL = "https://api.wlin.com.vn";

export const getData = async (url, number) => {
  const res = await axios.get(`${URL}/${url}/${number}`);

  return res;
};
//https://api.wlin.com.vn/api/62e0b3885271e2560e8bb7d3/dmsukien?access_token=c53e1ec285d77e1aad2d5861856ab94a
//wlin_clup
export const getdataApiClub = async (url, token, page) => {
  const res = await axios.get(
    `${URL}/api/62e0b3885271e2560e8bb7d3/${url}?access_token=${token}&limit=5&page=${page}`
  );
  return res;
};
//dmnhomquyenloi
//https://api.wlin.com.vn/api/62e0b3885271e2560e8bb7d3/wlin_hoi_vien?access_token=a44f9c6d83ebd53def4fb1c7b99c148a
//news
//customer
export const getdataApi = async (url, token) => {
  const res = await axios.get(
    `${URL}/api/62e0b3885271e2560e8bb7d3/${url}?access_token=${token}&limit=100`
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
//https://api.wlin.com.vn/api/profile?access_token=a44f9c6d83ebd53def4fb1c7b99c148a
export const getProfile = async (url, token) => {
  const res = await axios.get(`${URL}/api/${url}?access_token=${token}`);
  return res;
};
//getpermission
//https://api.wlin.com.vn/api/62e0b3885271e2560e8bb7d3/participant?access_token=15cfe9bd6a838eedac569448e33c5c56&q={%22email%22:%220338634204%22}
export const getPermission = async (url, token, email) => {
  const res = await axios.get(
    `${URL}/api/62e0b3885271e2560e8bb7d3/${url}?access_token=${token}&q={"email": "${email}"}`
  );
  return res;
};
//detail
export const getDetailApi = async (url, _id, token) => {
  const res = await axios.get(
    `${URL}/api/62e0b3885271e2560e8bb7d3/${url}/${_id}?access_token=${token}`
  );
  return res;
};

//https://api.wlin.com.vn/api/notification?id_app=62e0b3885271e2560e8bb7d3&access_token=7bed8b0b1fbcf5621aba0e4a089b171a&limit=100
//nottification access_token: 7bed8b0b1fbcf5621aba0e4a089b171a
export const Notifications = async (token) => {
  const res = await axios.get(
    `${URL}/api/notification?id_app=62e0b3885271e2560e8bb7d3&access_token=${token}&limit=100`
  );
  return res;
};
export const deleteNotifications = async (url, _id, token) => {
  const res = await axios.delete(
    `${URL}/api/${url}/${_id}?access_token=${token}`
  );
  return res;
};
