import nexiosInstance from "../lib/nexiosInstance";
import {
  TAllUser,
  TPayment,
  TPlaneUser,
  TSuccess,
  TSuccessWithMeta,
  TUser,
} from "../types";

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
        tags: ["myProfile"],
        revalidate: 30,
      },
    }
  );
  const userData = (response?.data as TSuccess<TUser>).data;
  return userData;
};

export const getSingleUser = async (userId: string) => {
  const response = await nexiosInstance.get(`/users/${userId}`, {
    next: {
      tags: ["singleUser"],
      revalidate: 30,
    },
  });
  const userData = (response?.data as TSuccess<TUser>).data;
  return userData;
};

export const getMyPosts = async () => {
  const response = await nexiosInstance.get("/users/me?populate=myPosts", {
    next: {
      tags: ["myPosts"],
      revalidate: 30,
    },
  });
  const userData = (response?.data as TSuccess<TUser>).data;
  return userData;
};

export const getMyFollowingFollowers = async () => {
  const response = await nexiosInstance.get(
    "/users/me?populate=following,followers",
    {
      next: {
        tags: ["myFollow"],
        revalidate: 30,
      },
    }
  );
  const userData = (response?.data as TSuccess<TUser>).data;
  return userData;
};

export const getAllUsersInfo = async () => {
  const response = await nexiosInstance.get("/users/all", {
    cache: "no-store",
    next: {
      revalidate: 2,
    },
    // next: {
    //   tags: ["allUsers"],
    //   revalidate: 300,
    // },
  });
  const userData = response.data as TSuccessWithMeta<TAllUser[]>;
  return userData?.data;
};

export const getAllPaymentsInfo = async () => {
  const response = await nexiosInstance.get("/payment", {
    next: {
      revalidate: 30,
    },
  });
  const userData = response.data as TSuccess<TPayment[]>;
  return userData?.data;
};
