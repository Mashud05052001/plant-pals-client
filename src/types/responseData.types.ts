export type TLoginRegisterUserSuccessData = {
  accessToken: string;
  refreshToken: string;
};

export type TUserRoles = "USER" | "ADMIN";

export type TUser = {
  _id: string;
  name: string;
  email: string;
  password: string;
  bio: string;
  role: TUserRoles;
  profilePicture: string;
  myPosts: string[] | TPost[];
  favouritePosts: string[] | TPost[];
  following: string[] | TUser[];
  followers: string[] | TUser[];
  isVerified: boolean;
  verifiedValidity?: Date;
  changePasswordAt?: Date;
  resetPasswordCode?: string;
  resetPasswordAt?: Date;
  createdAt: Date;
  updatedAt: Date;
};
export type TAllUser = Pick<
  TUser,
  "_id" | "name" | "email" | "profilePicture" | "role" | "isVerified"
>;
export type TPlaneUser = Omit<
  TUser,
  "myPosts" | "favouritePosts" | "following" | "followers"
> & {
  myPosts: string[];
  favouritePosts: string[];
  following: string[];
  followers: string[];
};

export type TVoatingUsers = {
  user: string | TUser;
  value: 1 | -1;
};

export type TPost = {
  _id: string;
  user: string | TUser;
  title: string;
  description: string;
  category: string | TCategory;
  images: string[];
  upvote: number;
  downvote: number;
  voatingUsers: TVoatingUsers[];
  comments: string[] | TUser[];
  isPremium: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type TGallery = {
  _id: string;
  images: string[];
};

export type TCategory = {
  _id: string;
  name: string;
};

export type TComment = {
  _id: string;
  user: string | TUser;
  post: string | TPost;
  message: string;
  createdAt: Date;
  updatedAt: Date;
};

export type TFollowSuccessData = {
  followed: boolean;
  message: string;
};

export type TPayment = {
  _id: string;
  user: TUser;
  amount: number;
  userPhone: string;
  isPaid: boolean;
  transactionId: string;
  createdAt: string;
  updatedAt: string;
};
