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
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
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
