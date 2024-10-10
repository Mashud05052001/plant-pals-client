import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createCategoryService,
  updateCategoryService,
  deleteSingleCategoryService,
  deleteAllCategoryService,
} from "../services/category.mutate.service";

export const useCreateCategory = () => {
  return useMutation<any, Error, { name: string }, unknown>({
    mutationKey: ["CREATE_CATEGORY"],
    mutationFn: async (payload) => await createCategoryService(payload),
    onSuccess: () => {
      toast.success("Category created successfully");
    },
    onError: (error: any) => {
      toast.error(`Create category failed. ${error?.message}`);
    },
  });
};

export const useUpdateCategory = () => {
  return useMutation<
    any,
    Error,
    { payload: { name: string }; categoryId: string },
    unknown
  >({
    mutationKey: ["UPDATE_CATEGORY"],
    mutationFn: async (payload) =>
      await updateCategoryService(payload.payload, payload.categoryId),
    onSuccess: () => {
      toast.success("Category updated successfully");
    },
    onError: (error: any) => {
      toast.error(`Update category failed. ${error?.message}`);
    },
  });
};

export const useDeleteSingleCategory = () => {
  return useMutation({
    mutationKey: ["DELETE_SINGLE_CATEGORY"],
    mutationFn: async (categoryId: string) =>
      await deleteSingleCategoryService(categoryId),
    onSuccess: () => {
      toast.success("Category deleted successfully");
    },
    onError: (error: any) => {
      toast.error(`Delete category failed. ${error?.message}`);
    },
  });
};

export const useDeleteAllCategories = () => {
  return useMutation({
    mutationKey: ["DELETE_ALL_CATEGORIES"],
    mutationFn: async () => await deleteAllCategoryService(),
    onSuccess: () => {
      toast.success("All categories deleted successfully");
    },
    onError: (error: any) => {
      toast.error(`Delete all categories failed. ${error?.message}`);
    },
  });
};
