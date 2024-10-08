"use server";

import nexiosInstance from "../lib/nexiosInstance";
import { TPost, TSuccessWithMeta } from "../types";

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

  console.log(queryParams.toString());
  const response = await nexiosInstance.get(
    `/posts?${queryParams.toString()}`,
    {
      next: {
        tags: ["newsFeed"],
        revalidate: 30,
      },
    }
  );
  const data = response.data as TSuccessWithMeta<TPost[]>;

  return data?.data || { data: [], meta: {} };
};
