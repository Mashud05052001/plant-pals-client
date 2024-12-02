"use server";
import DashboardLink from "@/src/components/shared/DashboardLink";
import { getMyPosts } from "@/src/services/user.fetch.service";
import { TPost } from "@/src/types";
import {
  FaClipboardList,
  FaUsers,
  FaUserFriends,
  FaThumbsUp,
} from "react-icons/fa";

const Page = async () => {
  const userData = await getMyPosts();

  let totalUpvotes = 0;

  if (
    userData !== undefined &&
    Array.isArray(userData?.myPosts) &&
    userData?.myPosts?.length !== 0
  ) {
    userData?.myPosts?.forEach((post) => {
      totalUpvotes += (post as TPost)?.upvote || 0;
    });
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-10 text-center">
        Performance Snapshot
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardLink
          href="/user/dashboard/posts"
          className="bg-common-500 shadow-md rounded-lg p-6 flex flex-col items-center transition-transform transform hover:scale-105 hover:shadow-lg"
        >
          <FaClipboardList className="text-white text-4xl mb-3" />
          <h2 className="text-lg font-semibold text-white">Posts</h2>
          <p className="text-2xl text-white">
            {userData?.myPosts?.length || 0}
          </p>
        </DashboardLink>
        <DashboardLink
          href="/user/dashboard/followings"
          className="bg-blue-500 shadow-md rounded-lg p-6 flex flex-col items-center transition-transform transform hover:scale-105 hover:shadow-lg"
        >
          <FaUserFriends className="text-white text-4xl mb-3" />
          <h2 className="text-lg font-semibold text-white">Following</h2>
          <p className="text-2xl text-white">
            {userData?.following?.length || 0}
          </p>
        </DashboardLink>
        <DashboardLink
          href="/user/dashboard/followers"
          className="bg-yellow-500 shadow-md rounded-lg p-6 flex flex-col items-center transition-transform transform hover:scale-105 hover:shadow-lg"
        >
          <FaUsers className="text-white text-4xl mb-3" />
          <h2 className="text-lg font-semibold text-white">Followers</h2>
          <p className="text-2xl text-white">
            {userData?.followers?.length || 0}
          </p>
        </DashboardLink>
        <div className="bg-red-500 shadow-md rounded-lg p-6 flex flex-col items-center transition-transform transform hover:scale-105 hover:shadow-lg">
          <FaThumbsUp className="text-white text-4xl mb-2" />
          <h2 className="text-lg font-semibold text-white">Total Upvotes</h2>
          <p className="text-2xl text-white">{totalUpvotes}</p>
        </div>
      </div>
    </div>
  );
};

export default Page;
