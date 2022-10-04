import axios from "axios";

export default function callApi(endpoint, method = "GET", data, headers) {
  return axios({
    method: method,
    url: `https://api.wlin.com.vn/${endpoint}`,
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
