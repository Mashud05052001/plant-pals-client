"use server";
import DashboardLink from "@/src/components/shared/DashboardLink";
import { getMyPosts } from "@/src/services/user.fetch.service";
import { TPost } from "@/src/types";
import { Suspense } from "react";
import {
  FaClipboardList,
  FaUsers,
  FaUserFriends,
  FaThumbsUp,
} from "react-icons/fa";

const Page = async () => {
  const userData = await getMyPosts();

  const totalUpvotes =
    userData?.myPosts?.reduce(
      (acc, post) => acc + ((post as TPost)?.upvote || 0),
      0
    ) || 0;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-10 text-center">
        Performance Snapshot
      </h1>
      <Suspense fallback={<DashboardLoadingSkeleton />}>
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
      </Suspense>
    </div>
  );
};

export default Page;

const DashboardLoadingSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {[...Array(4)].map((_, index) => (
        <div
          key={index}
          className="bg-gray-300 animate-pulse shadow-md rounded-lg p-6 flex flex-col items-center"
        >
          <div className="bg-gray-400 w-16 h-16 rounded-full mb-4" />
          <div className="bg-gray-400 w-3/4 h-6 rounded mb-2" />
          <div className="bg-gray-400 w-1/2 h-8 rounded" />
        </div>
      ))}
    </div>
  );
};
