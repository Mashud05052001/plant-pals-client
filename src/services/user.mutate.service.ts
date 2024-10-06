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
    revalidateTag("myprofile");
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
    revalidateTag("myprofile");
    const data = res.data as TSuccess<TUser>;
    return data;
  }
);

export const followUserService = catchServiceAsync(
  async (secondPersonId: string) => {
    const res = await axiosInstance.post(`/users/follow/${secondPersonId}`);
    const data = res.data as TSuccess<TFollowSuccessData>;
    revalidateTag("myprofile");
    return data;
  }
);

export const deleteUserService = catchServiceAsync(async (userId: string) => {
  const res = await axiosInstance.delete(`/users/${userId}`);
  const data = res.data as TSuccess<any>;
  return data;
});
