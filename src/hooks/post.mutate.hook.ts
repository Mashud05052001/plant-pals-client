import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createPostService,
  deletePostService,
  manageFavouritePostService,
  updatePostService,
} from "../services/post.mutate.service";
import { TPost } from "../types";

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

export const useUpdatePost = () => {
  return useMutation<
    any,
    Error,
    { payload: Partial<TPost>; postId: string },
    unknown
  >({
    mutationKey: ["UPDATE_POST"],
    mutationFn: async ({ payload, postId }) =>
      await updatePostService(payload, postId),
    onSuccess: () => {
      toast.success("Post updated successfully");
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
