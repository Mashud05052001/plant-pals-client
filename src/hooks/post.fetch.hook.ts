import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../lib/axiosInstance";
import { TPost, TSuccessWithMeta } from "../types";

export const useGetFavouritePosts = (postIds: string[]) => {
  const ids = postIds.join(",");
  return useQuery({
    queryKey: ["MANAGE_FAVOURITE_POST"],
    queryFn: async () =>
      (await axiosInstance.get(`/posts?_id=${ids}&sort=-createdAt`))
        .data as TSuccessWithMeta<TPost[]>,
    enabled: postIds.length > 0,
  });
};
