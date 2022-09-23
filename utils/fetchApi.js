import axios from "axios";
export const URL = "https://api.wlin.com.vn/";

export const getData = async (url, number) => {
  const res = await axios.get(`${URL}/${url}/${number}`);

  return res;
};
//https://api.wlin.com.vn/api/62e0b3885271e2560e8bb7d3/dmsukien?access_token=c53e1ec285d77e1aad2d5861856ab94a
//wlin_clup
//dmnhomquyenloi
export const getdataApi = async (url) => {
  const res = await axios.get(
    `${URL}/api/62e0b3885271e2560e8bb7d3/${url}?access_token=c53e1ec285d77e1aad2d5861856ab94a&limit=50`
  );
  return res;
};

export const getDetailApi = async (url, _id) => {
  const res = await axios.get(
    `${URL}/api/62e0b3885271e2560e8bb7d3/${url}/${_id}?access_token=c53e1ec285d77e1aad2d5861856ab94a`
  );
  return res;
};
