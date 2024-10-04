"use server";
import envConfig from "@/src/config/envConfig";
import axios from "axios";
import { cookies } from "next/headers";

const axiosInstance = axios.create({
  baseURL: envConfig.baseAPI,
});

axiosInstance.interceptors.request.use(
  function (config) {
    const accessToken = cookies().get("accessToken")?.value;
    if (accessToken) config.headers.Authorization = accessToken;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosInstance;
