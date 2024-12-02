"use server";

import nexiosInstance from "../lib/nexiosInstance";
import { TPost, TSuccess, TSuccessWithMeta } from "../types";

export const getNewsFeed = async (
  page: number = 1,
  limit: number = 5,
  searchTerm: string = "",
  category: string = "",
  isPremium?: boolean // make it optional
) => {
  const queryParams = new URLSearchParams({
    limit: limit.toString(),
    page: page.toString(),
  });

  // Conditionally add isPremium only if it's not undefined
  if (typeof isPremium === "boolean") {
    queryParams.append("isPremium", isPremium.toString());
  }

  // Conditionally add searchTerm and category if they are provided
  if (searchTerm) queryParams.append("searchTerm", searchTerm);
  if (category) queryParams.append("category", category);

  // Add sort based on searchTerm or category presence
  if (searchTerm || category) {
    queryParams.append("sort", "-upvote");
  } else {
    queryParams.append("sort", "-createdAt");
  }

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
