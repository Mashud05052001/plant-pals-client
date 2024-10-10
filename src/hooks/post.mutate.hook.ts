import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createPostService,
  deletePostService,
  manageFavouritePostService,
  updatePostService,
  voatingPostService,
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
  });
};

export const useManageFavouritePost = () => {
  const queryClient = useQueryClient();
  return useMutation<
    any,
    Error,
    { postId: string; value: "add" | "remove" },
    unknown
  >({
    mutationFn: async ({ postId, value }) =>
      await manageFavouritePostService(postId, { value }),
    onSuccess: (data, payload) => {
      toast.success(data?.message);

      if (payload.value === "remove") {
        queryClient.setQueryData(
          ["MANAGE_FAVOURITE_POST"],
          (currentElement: any) => {
            if (!currentElement || !Array.isArray(currentElement.data.data))
              return currentElement;

            // Filter out the post with the matching _id
            const updatedData = currentElement.data.data.filter(
              (post: TPost) => post._id !== payload.postId
            );
            return {
              ...currentElement,
              data: {
                data: updatedData,
                meta: {
                  ...currentElement.data.meta,
                  totalData: updatedData.length,
                },
              },
            };
          }
        );
      }
      queryClient.invalidateQueries(["MANAGE_FAVOURITE_POST"]);
    },

    onError: (error: any) => {
      console.log(error, "Following time error found");
      toast.error(`Failed. ${error?.message}`);
    },
  });
};

export const useVoatingPost = () => {
  return useMutation<any, Error, { postId: string; value: 1 | -1 }, unknown>({
    mutationFn: async (payload) => await voatingPostService(payload),
    onSuccess: (data) => {
      toast.success(data?.message);
    },
    onError: (error: any) => {
      console.log(error, "Voating time error found");
      toast.error(`Failed. ${error?.message}`);
    },
  });
};
