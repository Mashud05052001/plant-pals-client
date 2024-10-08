"use server";

import nexiosInstance from "../lib/nexiosInstance";
import { TCategory, TSuccess } from "../types";

export const useGetCategoriesServerSide = async () => {
  const response = await nexiosInstance.get("/category", {
    next: {
      tags: ["categories"],
      revalidate: 300,
    },
  });
  const categoryData = response.data as TSuccess<TCategory[]>;
  if (categoryData.success) return categoryData.data;
  return [];
};
