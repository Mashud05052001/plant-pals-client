import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { FieldValues } from "react-hook-form";
import {
  changeUserRoleService,
  deleteUserService,
  followUserService,
  updateMeService,
  updateProfilePicture,
} from "../services/user.mutate.service";

export const useChangeUserRole = () => {
  return useMutation<any, Error, string, unknown>({
    mutationKey: ["CHANGE_USER_ROLE"],
    mutationFn: async (userID: string) => await changeUserRoleService(userID),
    onSuccess: () => {
      toast.success("User role changed successfully");
    },
    onError: (error) => {
      toast.error(`Failed to change user role. ${error?.message}`);
    },
  });
};

export const useUpdateMe = () => {
  return useMutation<any, Error, FieldValues, unknown>({
    mutationKey: ["UPDATE_ME"],
    mutationFn: async (payload: FieldValues) => await updateMeService(payload),
    onSuccess: () => {
      toast.success("User profile updated successfully");
    },
    onError: (error) => {
      toast.error(`Failed to update profile. ${error?.message}`);
    },
  });
};

export const useUpdateProfilePicture = () => {
  return useMutation<any, Error, FormData, unknown>({
    mutationKey: ["UPDATE_PROFILE_PICTURE"],
    mutationFn: async (payload: FormData) =>
      await updateProfilePicture(payload),
    onSuccess: () => {
      toast.success("Profile picture updated successfully");
    },
    onError: (error) => {
      toast.error(`Failed to update profile picture. ${error?.message}`);
    },
  });
};

export const useFollowUser = () => {
  return useMutation<any, Error, string, unknown>({
    mutationKey: ["FOLLOW_USER"],
    mutationFn: async (secondPersonId: string) => {
      return await followUserService(secondPersonId);
    },
    onSuccess: (data) => {
      toast.success(data?.data?.message || "Successfully complete");
    },
    onError: (error) => {
      toast.error(`Failed to follow user. ${error?.message}`);
    },
  });
};

export const useDeleteUser = () => {
  return useMutation<any, Error, string, unknown>({
    mutationKey: ["DELETE_USER"],
    mutationFn: async (userId: string) => await deleteUserService(userId),
    onSuccess: () => {
      toast.success("User deleted successfully");
    },
    onError: (error) => {
      toast.error(`Failed to delete user. ${error?.message}`);
    },
  });
};
