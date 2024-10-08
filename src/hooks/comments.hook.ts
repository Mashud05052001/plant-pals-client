import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../lib/axiosInstance";
import { TComment, TSuccess } from "../types";
import {
  createCommentService,
  deleteCommentService,
  updateCommentService,
} from "../services/comment.mutate.service";
import { toast } from "sonner";

export const useGetCommentsOfAPost = (
  postId: string,
  isModalOpen: boolean = false
) => {
  return useQuery({
    queryKey: ["COMMENTS", postId],
    queryFn: async () =>
      (await axiosInstance.get(`/comments/${postId}`)).data as TSuccess<
        TComment[]
      >,
    enabled: isModalOpen,
  });
};

export const useCreateComments = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, { post: string; message: string }, unknown>({
    mutationKey: ["COMMENTS"],
    mutationFn: async (payload) => await createCommentService(payload),
    onSuccess: (data, payload) => {
      toast.success("Comments created successfull");
      queryClient.invalidateQueries(["COMMENTS", payload.post]);
    },
    onError: (error) => {
      toast.error(`Failed. ${error?.message}`);
    },
  });
};

export const useUpdateComment = () => {
  return useMutation<
    any,
    Error,
    { commentId: string; payload: { message: string } },
    unknown
  >({
    mutationKey: ["COMMENTS"],
    mutationFn: async (payload) =>
      await updateCommentService(payload?.payload, payload?.commentId),
    onSuccess: () => {
      toast.success("Comments updated successfull");
    },
    onError: (error) => {
      toast.error(`Failed. ${error?.message}`);
    },
  });
};

export const useDeleteComment = () => {
  return useMutation<any, Error, string, unknown>({
    mutationKey: ["COMMENTS"],
    mutationFn: async (commentId) => await deleteCommentService(commentId),
    onSuccess: () => {
      toast.success("Comments deleted successfull");
    },
    onError: (error) => {
      toast.error(`Failed. ${error?.message}`);
    },
  });
};
