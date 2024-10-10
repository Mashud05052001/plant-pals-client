"use server";

import nexiosInstance from "../lib/nexiosInstance";
import { TPost, TSuccess, TSuccessWithMeta } from "../types";

export const getNewsFeed = async (
  page: number = 1,
  limit: number = 3,
  searchTerm: string = "",
  category: string = ""
) => {
  const queryParams = new URLSearchParams({
    limit: limit.toString(),
    page: page.toString(),
  });
  if (searchTerm) queryParams.append("searchTerm", searchTerm);
  if (category) queryParams.append("category", category);

  if (searchTerm || category) queryParams.append("sort", "-upvote");
  else queryParams.append("sort", "-createdAt");

  const response = await nexiosInstance.get(
    `/posts?${queryParams.toString()}`,
    {
      next: {
        tags: ["newsFeed"],
        revalidate: 60,
      },
    }
  );
  const data = response.data as TSuccessWithMeta<TPost[]>;

  return data?.data || { data: [], meta: {} };
};

export const getSinglePost = async (postId: string) => {
  const response = await nexiosInstance.get(`/posts/${postId}`, {
    next: {
      tags: ["singlePost"],
    },
  });
  const data = response.data as TSuccess<TPost>;
  return data?.data;
};
