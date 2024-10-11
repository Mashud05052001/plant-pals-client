import axios from "axios";
import { getAccessToken } from "../services/auth.mutate.service";
import envConfig from "../config/envConfig";

const axiosInstance = axios.create({
  baseURL: envConfig.baseAPI,
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
