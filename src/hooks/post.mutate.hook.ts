import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createPostService,
  deletePostService,
  manageFavouritePostService,
} from "../services/post.mutate.service";
import { toast } from "sonner";

export const useCreatePost = () => {
  return useMutation<any, Error, FormData, unknown>({
    mutationKey: ["NEW_POST"],
    mutationFn: async (payload: FormData) => await createPostService(payload),
    onSuccess: () => {
      toast.success("Post created successfully");
    },
    onError: (error) => {
      console.log(error);
      toast.error(`Failed. ${error?.message}`);
    },
  });
};

export const useDeletePost = () => {
  return useMutation<any, Error, string, unknown>({
    mutationKey: ["DELETE_POST"],
    mutationFn: async (postId: string) => await deletePostService(postId),
    onSuccess: () => {
      toast.success("Post deleted successfully");
    },
    onError: (error) => {
      toast.error(`Failed. ${error?.message}`);
    },
  });
};

export const useManageFavouritePost = () => {
  return useMutation<
    any,
    Error,
    { postId: string; value: "add" | "remove" },
    unknown
  >({
    mutationKey: ["MANAGE_FAVOURITE_POST"],
    mutationFn: async ({ postId, value }) =>
      await manageFavouritePostService(postId, { value }),
    onSuccess: (data) => {
      toast.success(data?.message);
    },
    onError: (error: any) => {
      console.log(error, "Following time error found");
      toast.error(`Failed. ${error?.message}`);
    },
  });
};
