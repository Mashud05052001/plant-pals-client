import UserDashboardPosts from "@/src/components/modules/userDashboard/UserDashboardMyPosts";
import { getMyPosts } from "@/src/services/user.fetch.service";
import Link from "next/link";

const Page = async () => {
  const userData = await getMyPosts();

  return (
    <div className="min-h-screen flex flex-col  px-4 ">
      {userData?.myPosts && userData?.myPosts.length === 0 ? (
        <div className="text-center space-y-6 pt-8">
          <h2 className="text-3xl font-bold text-gray-800">
            You haven’t created any posts yet.
          </h2>
          <p className="text-lg text-gray-600">
            Start sharing your ideas by creating a new post!
          </p>
          <Link
            href="/profile"
            className="inline-block py-2 px-4 rounded-lg shadow hover:-translate-y-0.5 transition duration-200 ease-in-out"
          >
            Go to Profile to Create New Post
          </Link>
        </div>
      ) : (
        <UserDashboardPosts userData={userData} />
      )}
    </div>
  );
};

export default Page;
