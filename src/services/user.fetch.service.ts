import nexiosInstance from "../lib/nexiosInstance";
import { TPlaneUser, TSuccess, TUser } from "../types";

export const getMyInfos = async () => {
  const response = await nexiosInstance.get("/users/me", {
    next: {
      tags: ["myInfo"],
    },
  });
  const userData = response.data as TSuccess<TPlaneUser>;
  if (userData.success) {
    return userData.data;
  }
  return null;
};

export const getMyProfile = async () => {
  const response = await nexiosInstance.get(
    "/users/me?populate=myPosts,following,followers",
    {
      next: {
        tags: ["myprofile"],
        revalidate: 30,
      },
    }
  );
  const userData = (response?.data as TSuccess<TUser>).data;
  return userData;
};
