import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../lib/axiosInstance";
import { TCategory, TSuccess } from "../types";

export const useGetAllCategories = () =>
  useQuery({
    queryKey: ["categories"],
    queryFn: async () =>
      (await axiosInstance.get("/category")).data as TSuccess<TCategory[]>,
  });
