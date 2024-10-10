"use server";

import { revalidateTag } from "next/cache";
import axiosInstance from "../lib/axiosInstance";
import { TComment, TSuccess } from "../types";
import catchServiceAsync from "../utils/servicesCatchAsync";

export const createCommentService = catchServiceAsync(
  async (payload: { post: string; message: string }) => {
    const res = await axiosInstance.post(`/comments`, payload);
    revalidateTag("newsFeed");
    revalidateTag("singlePost");
    revalidateTag("singleUser");
    const data = res.data as TSuccess<TComment>;
    return data;
  }
);

export const updateCommentService = catchServiceAsync(
  async (payload: { message: string }, commentId: string) => {
    const res = await axiosInstance.patch(`/comments/${commentId}`, payload);
    const data = res.data as TSuccess<TComment>;
    return data;
  }
);

export const deleteCommentService = catchServiceAsync(
  async (commentId: string) => {
    const res = await axiosInstance.delete(`/comments/${commentId}`);
    revalidateTag("newsFeed");
    revalidateTag("singlePost");
    const data = res.data as TSuccess<{ message: string }>;
    return data;
  }
);
