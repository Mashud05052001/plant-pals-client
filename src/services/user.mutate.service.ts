"use server";

import { FieldValues } from "react-hook-form";
import axiosInstance from "../lib/axiosInstance";
import { TFollowSuccessData, TSuccess, TUser } from "../types";
import catchServiceAsync from "../utils/servicesCatchAsync";
import { revalidateTag } from "next/cache";

export const changeUserRoleService = catchServiceAsync(
  async (userID: string) => {
    const res = await axiosInstance.patch(`/users/change-role/${userID}`);
    const data = res.data as TSuccess<TUser>;
    return data;
  }
);

export const updateMeService = catchServiceAsync(
  async (payload: FieldValues) => {
    const res = await axiosInstance.patch(`/users/update-me`, payload);
    revalidateTag("myProfile");
    revalidateTag("myInfo");
    revalidateTag("myPosts");
    const data = res.data as TSuccess<TUser>;
    return data;
  }
);

export const updateProfilePicture = catchServiceAsync(
  async (payload: FormData) => {
    const res = await axiosInstance.patch(
      `/users/update-profile-picture`,
      payload
    );
    revalidateTag("login-user-static-info");
    revalidateTag("myProfile");
    revalidateTag("myPosts");
    revalidateTag("myInfo");
    const data = res.data as TSuccess<TUser>;
    return data;
  }
);

export const followUserService = catchServiceAsync(
  async (secondPersonId: string) => {
    const res = await axiosInstance.post(`/users/follow/${secondPersonId}`);
    const data = res.data as TSuccess<TFollowSuccessData>;
    revalidateTag("myInfo");
    revalidateTag("myProfile");
    revalidateTag("myFollow");
    revalidateTag("singleUser");
    return data;
  }
);

export const deleteUserService = catchServiceAsync(async (userId: string) => {
  const res = await axiosInstance.delete(`/users/${userId}`);
  const data = res.data as TSuccess<any>;
  return data;
});

export const createPayment = catchServiceAsync(
  async (payload: {
    customerPhone: string;
    cancleUrl: string;
    totalAmount: number;
  }) => {
    const res = await axiosInstance.post(`/payment`, payload);
    revalidateTag("login-user-static-info");
    const data = res.data as TSuccess<any>;
    return data;
  }
);
