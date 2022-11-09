import axios from "axios";

export default function Notifications(endpoint, method = "GET", data, headers) {
  return axios({
    method: method,
    url: `https://api.wlin.com.vn/api/notification?id_app=6332c96668b1025d86e22a54${endpoint}`,
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
