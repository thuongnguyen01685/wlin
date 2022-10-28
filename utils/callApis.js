import axios from "axios";

export default function callApis(endpoint, method = "GET", data, headers) {
  return axios({
    method: method,
    url: `https://api.wlin.com.vn/api/62e0b3885271e2560e8bb7d3/${endpoint}`,
    data: data,
    headers: headers,
  }).catch((error) => {
    if (error.response) {
      return error.response.data;
    } else if (error.request) {
      // console.log(error.request);
    } else {
      // console.log(error.message);
    }
    // console.log(error.config);
  });
}
