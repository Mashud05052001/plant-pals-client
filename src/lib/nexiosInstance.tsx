import { Nexios } from "nexios-http";
import { NexiosOptions } from "nexios-http/types/interfaces";
import envConfig from "../config/envConfig";
import { cookies } from "next/headers";

const defaultConfig: NexiosOptions = {
  baseURL: envConfig.baseAPI,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  credentials: "include",
  timeout: 10000,
};

const nexiosInstance = new Nexios(defaultConfig);

nexiosInstance.interceptors.request.use((config) => {
  const accessToken = cookies()?.get("accessToken")?.value;
  if (accessToken) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${accessToken}`,
    };
  }
  return config;
});

// TODO : If access token failed using refresh token again generate the access token
nexiosInstance.interceptors.response.use((response) => {
  return response;
});

export default nexiosInstance;
