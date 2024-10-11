import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import axiosInstance from "../lib/axiosInstance";
import { TDashboardData, TSuccess } from "../types";
import moment from "moment";

export const useGetUserDashboard = (year: number = moment().year()) => {
  return useQuery({
    queryKey: ["USER_DASHBOARD"],

    queryFn: async () => {
      const response = await axiosInstance.get(`/users/dashboard?year=${year}`);
      const userData = response.data as TSuccess<TDashboardData[]>;
      return userData?.data;
    },
    onError: () => {
      toast.error(`Failed to retrived data`);
    },
    cacheTime: 1000 * 60 * 3,
  });
};
