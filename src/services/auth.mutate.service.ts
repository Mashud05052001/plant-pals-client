"use server";

import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";
import axiosInstance from "../lib/axiosInstance";
import nexiosInstance from "../lib/nexiosInstance";
import {
  TJwtUser,
  TLoginRegisterUserSuccessData,
  TSuccess,
  TUser,
} from "../types";
import catchServiceAsync from "../utils/servicesCatchAsync";

export const registerUserService = catchServiceAsync(
  async (payload: FieldValues) => {
    const res = await axiosInstance.post("/auth/register", payload);
    const data = res.data as TSuccess<TLoginRegisterUserSuccessData>;
    if (data?.success) {
      cookies().set("accessToken", data.data.accessToken);
      cookies().set("refreshToken", data.data.refreshToken);
    }
    return data;
  }
);

export const loginUserService = catchServiceAsync(
  async (payload: FieldValues) => {
    const res = await axiosInstance.post("/auth/login", payload);
    const data = res.data as TSuccess<TLoginRegisterUserSuccessData>;
    if (data?.success) {
      cookies().set("accessToken", data.data.accessToken);
      cookies().set("refreshToken", data.data.refreshToken);
    }
    return data;
  }
);

export const logoutUser = () => {
  cookies().delete("accessToken");
  cookies().delete("refreshToken");
};

export const getCurrentUser = async () => {
  const accessToken = cookies().get("accessToken")?.value;
  let decodedData: null | TJwtUser = null;
  if (accessToken) decodedData = await jwtDecode(accessToken);
  return decodedData;
};

export const getCurrentUserFromDB = async () => {
  const response = await nexiosInstance.get("/users/me", {
    next: {
      tags: ["login-user-static-info"],
    },
  });
  const data = (await response?.data) as TSuccess<TUser>;
  return data;
};

export const getAccessToken = async () => {
  const accessToken = cookies().get("accessToken")?.value || null;
  return accessToken;
};

export const changePasswordService = catchServiceAsync(
  async (payload: FieldValues) => {
    const { data } = await axiosInstance.post("/auth/change-password", payload);
    return data;
  }
);

export const generateAccessTokenService = catchServiceAsync<any>(async () => {
  const { data } = await axiosInstance.post("/auth/refresh-token");
  return data;
});

export const forgetPasswordService = catchServiceAsync<any>(
  async (payload: FieldValues) => {
    const { data } = await axiosInstance.post("/auth/forget-password", payload);
    return data;
  }
);

export const checkResetCodeService = catchServiceAsync<any>(
  async (payload: FieldValues) => {
    const { data } = await axiosInstance.post(
      "/auth/check-reset-code",
      payload
    );
    return data;
  }
);

export const resetPasswordService = catchServiceAsync<any>(
  async (payload: FieldValues) => {
    const { data } = await axiosInstance.post("/auth/reset-password", payload);
    return data;
  }
);

export const sendContactEmail = catchServiceAsync<any>(
  async (payload: FieldValues) => {
    const { data } = await axiosInstance.post(
      "/auth/send-contact-email",
      payload
    );
    return data;
  }
);

/*
export const loginUserService = async (payload: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/auth/login", payload);
    return data;
  } catch (error) {
    const errorMessage = ((error as AxiosError)?.response?.data as TError)
      ?.message;
    throw new Error(errorMessage);
  }
};
export const changePasswordService = async (payload: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/auth/change-password", payload);
    return data;
  } catch (error) {
    const errorMessage = ((error as AxiosError)?.response?.data as TError)
      ?.message;
    throw new Error(errorMessage);
  }
};
export const generateAccessTokenService = async () => {
  try {
    const { data } = await axiosInstance.post("/auth/refresh-token");
    return data;
  } catch (error) {
    const errorMessage = ((error as AxiosError)?.response?.data as TError)
      ?.message;
    throw new Error(errorMessage);
  }
};
export const forgetPasswordService = async (payload: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/auth/forget-password", payload);
    return data;
  } catch (error) {
    const errorMessage = ((error as AxiosError)?.response?.data as TError)
      ?.message;
    throw new Error(errorMessage);
  }
};
export const checkResetCodeService = async (payload: FieldValues) => {
  try {
    const { data } = await axiosInstance.post(
      "/auth/check-reset-code",
      payload
    );
    return data;
  } catch (error) {
    const errorMessage = ((error as AxiosError)?.response?.data as TError)
      ?.message;
    throw new Error(errorMessage);
  }
};
export const resetPasswordService = async (payload: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/auth/reset-password", payload);
    return data;
  } catch (error) {
    const errorMessage = ((error as AxiosError)?.response?.data as TError)
      ?.message;
    throw new Error(errorMessage);
  }
};

*/
