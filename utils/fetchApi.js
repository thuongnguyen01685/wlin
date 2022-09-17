import axios from "axios";
const URL = "https://api.wlin.com.vn/";

export const getData = async (url, number) => {
  const res = await axios.get(`${URL}/${url}/${number}`);

  return res;
};
