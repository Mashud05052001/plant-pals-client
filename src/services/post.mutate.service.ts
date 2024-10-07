"use server";

import { revalidateTag } from "next/cache";
import { FieldValues } from "react-hook-form";
import axiosInstance from "../lib/axiosInstance";
import { TPost, TSuccess } from "../types";
import catchServiceAsync from "../utils/servicesCatchAsync";

export const createPostService = catchServiceAsync(
  async (payload: FormData) => {
    const res = await axiosInstance.post(`/posts`, payload);
    revalidateTag("myprofile");
    const data = res.data as TSuccess<TPost>;
    return data;
  }
);

export const updatePostService = catchServiceAsync(
  async (payload: FieldValues, postId: string) => {
    const res = await axiosInstance.patch(`/posts/${postId}`, payload);
    revalidateTag("myprofile");
    const data = res.data as TSuccess<TPost>;
    return data;
  }
);

export const deletePostService = catchServiceAsync(async (postId: string) => {
  const res = await axiosInstance.delete(`/posts/${postId}`);
  revalidateTag("myprofile");
  const data = res.data as TSuccess<string>;
  return data;
});

export const voatingPostService = catchServiceAsync(
  async (payload: { postId: string; value: number }) => {
    const res = await axiosInstance.post(`/posts/vote`, payload);
    const data = res.data as TSuccess<TPost>;
    return data;
  }
);

export const manageFavouritePostService = catchServiceAsync(
  async (postId: string, payload) => {
    const res = await axiosInstance.post(`/posts/favourite/${postId}`, payload);
    revalidateTag("myprofile");
    const data = res.data as TSuccess<string>;
    return data;
  }
);
