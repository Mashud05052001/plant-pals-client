import axios from "axios";
import { getAccessToken } from "../services/auth.mutate.service";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api/v1",
});

axiosInstance.interceptors.request.use(
  async function (config) {
    const accessToken = await getAccessToken();
    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
// TODO : If access token failed using refresh token again generate the access token

export default axiosInstance;
