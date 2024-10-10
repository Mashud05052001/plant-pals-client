"use server";
import { revalidateTag } from "next/cache";
import axiosInstance from "../lib/axiosInstance";
import { TCategory, TSuccess } from "../types";
import catchServiceAsync from "../utils/servicesCatchAsync";

export const createCategoryService = catchServiceAsync(
  async (payload: { name: string }) => {
    const res = await axiosInstance.post(`/category`, payload);
    revalidateTag("categories");
    const data = res.data as TSuccess<TCategory>;
    return data;
  }
);

export const updateCategoryService = catchServiceAsync(
  async (payload: { name: string }, categoryId: string) => {
    const res = await axiosInstance.patch(`/category/${categoryId}`, payload);
    revalidateTag("categories");
    const data = res.data as TSuccess<TCategory>;
    return data;
  }
);

export const deleteSingleCategoryService = catchServiceAsync(
  async (categoryId: string) => {
    const res = await axiosInstance.delete(`/category/${categoryId}`);
    revalidateTag("categories");
    const data = res.data as TSuccess<string>;
    return data;
  }
);

export const deleteAllCategoryService = catchServiceAsync(async () => {
  const res = await axiosInstance.delete(`/category`);
  revalidateTag("categories");
  const data = res.data as TSuccess<string>;
  return data;
});
